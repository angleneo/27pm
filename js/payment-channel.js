/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
    setTimeout(function(){
        var data=[
                {'number':1235180,'money':6518},
                {'number':935180,'money':13518},
                {'number':1035180,'money':5518},
                {'number':735180,'money':7518},
                {'number':835180,'money':3518}
            ],
            nall= 0,
            mall=0;
        data.map(function(json){
            nall+=json.number;
            mall+=json.money;
        });
        $('.progress-bar-part').each(function(){
            var index=parseInt($(this).data('index')),
                number=data[index].number,
                money=data[index].money,
                text= 0,
                _this=$(this),
                timer=null;
            timer=setInterval(function(){
                var numberObj=_this.find('.bar-number'),
                    moneyObj=_this.find('.bar-money');
                text+=1000;
                if(text>=number){
                    numberObj.css('width',parseInt(number/nall*205)+'px');
                    _this.find('.number-text').text(number);
                }else {
                    numberObj.css('width',parseInt(text/nall*205)+'px');
                    _this.find('.number-text').text(text);
                }
                if(text>=money){
                    moneyObj.css('width',parseInt(money/mall*205)+'px');
                    _this.find('.money-text').text(money);
                }else {
                    moneyObj.css('width',parseInt(text/mall*205)+'px');
                    _this.find('.money-text').text(text);
                }
                money>=number ? (text>=money ? clearInterval(timer) : '') : (text>=number ? clearInterval(timer) : '') ;
            },10);
        });
        $('.number-all').text(number_str(nall)+'（次）');
        $('.money-all').text(number_str(mall)+'（万元）');
        $('.echart-text').fadeIn('slow');
    },1000);
    function number_str(number){
        var str=number.toString(),
            arr=str.split(''),
            len=parseInt(arr.length/3),
            yu=arr.length% 3,
            i= 0,
            newstr='';
        if(len>0&&yu>0){
            for(i=1;i<=len;i++){
                arr.splice(-i*4+1,0,',');
            }
        }else {
            for(i=1;i<len;i++){
                arr.splice(-i*3+(i-1),0,',');
            }
        }
        for(i=0;i<arr.length;i++){
            newstr+=arr[i];
        }
        return newstr;
    }
    initChart();
    function initChart() {
        var data=[
            {value:30},
            {value:5},
            {value:20},
            {value:5},
            {value:40}
        ];
        var obj=document.getElementsByClassName('echart');
        var option={
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : ['28%','90%' ],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    itemStyle:{
                        normal:{
                            borderColor:'#00fff4',
                            borderWidth:3,
                            borderType:'solid'
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data:data
                }
            ],
            color:['rgba(230,175,31,0.5)','rgba(87,103,220,0.5)','rgba(123,64,181,0.5)','rgba(13,173,251,0.5)','rgba(2,210,13,0.5)']
        };
        for(var i=0;i<obj.length;i++){
            var mychart=echarts.init(obj[i]);
            mychart.setOption(option);
        }
    }
};