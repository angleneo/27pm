/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
    setTimeout(function(){
        var data=[
          {'number':123518,'money':6518},
          {'number':93518,'money':13518},
          {'number':103518,'money':5518},
          {'number':73518,'money':7518},
          {'number':83518,'money':3518}
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
        initChart();
    },2000);
    function initChart() {
        var obj01=document.getElementsByClassName('echart01'),
            obj02=document.getElementsByClassName('echart02'),
            data=[
                    [
                        {value:8, name:'纪念品'},
                        {value:11, name:'饮料'},
                        {value:9, name:'其他'},
                        {value:12, name:'零食'}
                    ],
                    [
                        {value:10, name:'纪念品'},
                        {value:8, name:'饮料'},
                        {value:10, name:'其他'},
                        {value:12, name:'零食'}
                    ],
                    [
                        {value:5, name:'纪念品'},
                        {value:15, name:'饮料'},
                        {value:8, name:'其他'},
                        {value:12, name:'零食'}
                    ],
                    [
                        {value:10, name:'纪念品'},
                        {value:15, name:'饮料'},
                        {value:10, name:'其他'},
                        {value:5, name:'零食'}
                    ],
                    [
                        {value:9, name:'纪念品'},
                        {value:12, name:'饮料'},
                        {value:13, name:'其他'},
                        {value:7, name:'零食'}
                    ]
                ];
        // 基于准备好的dom，初始化echarts图表
        function option(data){
            return {
                series : [
                    {
                        name:'半径模式',
                        type:'pie',
                        radius : ['20%','75%' ],
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
                color:['rgba(230,175,31,0.5)','rgba(123,64,181,0.5)','rgba(13,173,251,0.5)','rgba(2,210,13,0.5)']
            };
        }
        // 为echarts对象加载数据
        for(var i=0;i<obj01.length;i++){
            var mychart=echarts.init(obj01[i]),
                mychart02=echarts.init(obj02[i]);
            mychart.setOption(option(data[i]));
            mychart02.setOption(option(data[i]));
        }
        $('.text-box').fadeIn('slow');
    }
};