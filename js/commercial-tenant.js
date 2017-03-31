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
        $('.main-part').each(function(){
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
                    numberObj.css('left',parseInt(number/nall*148)-148+'px');
                    numberObj.find('.progress-bar').css('left',148-parseInt(number/nall*148));
                    _this.find('.number-text').text(number);
                }else {
                    numberObj.css('left',parseInt(text/nall*148)-148+'px');
                    numberObj.find('.progress-bar').css('left',148-parseInt(text/nall*148));
                    _this.find('.number-text').text(text);
                }
                if(text>=money){
                    moneyObj.css('left',parseInt(money/mall*148)-148+'px');
                    moneyObj.find('.progress-bar').css('left',148-parseInt(money/mall*148));
                    _this.find('.money-text').text(money);
                }else {
                    moneyObj.css('left',parseInt(text/mall*148)-148+'px');
                    moneyObj.find('.progress-bar').css('left',148-parseInt(text/mall*148));
                    _this.find('.money-text').text(text);
                }
                money>=number ? (text>=money ? clearInterval(timer) : '') : (text>=number ? clearInterval(timer) : '') ;
            },10);
        });
        var json={
            'online':[
                {'number':13519,'total':32000},
                {'money':23518,'total':60000}
            ],
            'goods':[
                {'name':'门票','percent':'30%'},
                {'name':'酒店','percent':'20%'},
                {'name':'餐饮','percent':'40%'}
            ]
        };
        $('.online-number').animate({'width':json.online[0].number/json.online[0].total*536+'px'},500);
        $('.online-number-text').show(function(){
            $(this).text('点击次数：'+json.online[0].number);
        });
        $('.online-money').animate({'width':json.online[1].money/json.online[1].total*536+'px'},500);
        $('.online-money-text').show(function(){
            $(this).text('营业额(万元)：'+json.online[1].money);
        });
        $('.goods-progress').show(function(){
            $('.goods-ticket').animate({'width':parseInt(json.goods[0].percent)/100*538+'px'},500);
            $('.goods-hotel').animate({'width':parseInt(json.goods[1].percent)/100*538+'px'},500);
            $('.goods-food').animate({'width':parseInt(json.goods[2].percent)/100*538+'px'},500,function(){
                $('.goods-ticket .goods-text').show().text(json.goods[0].name+'：'+json.goods[0].percent);
                $('.goods-hotel .goods-text').show().text(json.goods[1].name+'：'+json.goods[1].percent);
                $('.goods-food .goods-text').show().text(json.goods[2].name+'：'+json.goods[2].percent);
            });
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
    function Canvas(){}
    Canvas.prototype={
        init:function(obj){
            this.obj=obj;
            this.ctx=obj.getContext('2d');
        },
        draw:function(json){
            this.shop=json.shop;
            this.online=json.online;
            this.angle=json.online/100;
            this.background();
            this.target(this.angle);
        },
        background:function(){
            this.ctx.beginPath();
            this.ctx.arc(250,200,190,0,Math.PI,true);
            this.ctx.fillStyle='rgba(255,255,255,0.1)';
            this.ctx.fill();
        },
        target:function(angle){
            this.ctx.globalCompositeOperation='source-over';
            this.ctx.beginPath();
            this.ctx.arc(250,200,170,0,(2-angle)*Math.PI,true);
            this.ctx.strokeStyle='rgba(187,83,246,0.7)';
            this.ctx.lineWidth=40;
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(250,200,170,(2-angle)*Math.PI,Math.PI,true);
            this.ctx.strokeStyle='rgba(0,255,244,0.7)';
            this.ctx.stroke();
            this.ctx.strokeStyle='#000';
            this.ctx.lineWidth=2;
            for(var i=0.02;i<1;){
                this.ctx.beginPath();
                this.ctx.moveTo(250+(150*Math.cos((2-i)*Math.PI)),200+(150*Math.sin((2-i)*Math.PI)));
                this.ctx.lineTo(250+(190*Math.cos((2-i)*Math.PI)),200+(190*Math.sin((2-i)*Math.PI)));
                this.ctx.stroke();
                i+=0.02;
            }
            this.ctx.beginPath();
            this.ctx.moveTo(250+(100*Math.cos((2-angle)*Math.PI)),190+(100*Math.sin((2-angle)*Math.PI)));
            this.ctx.lineTo(250+(8*Math.cos((0.5-angle)*Math.PI)),190+(8*Math.sin((0.5-angle)*Math.PI)));
            this.ctx.lineTo(250+(8*Math.cos((1-angle)*Math.PI)),190+(8*Math.sin((1-angle)*Math.PI)));
            this.ctx.lineTo(250+(8*Math.cos((1.5-angle)*Math.PI)),190+(8*Math.sin((1.5-angle)*Math.PI)));
            this.ctx.closePath();
            this.ctx.fillStyle='rgba(246,224,179,0.7)';
            this.ctx.fill();
            this.ctx.textAlign="start";
            this.ctx.textAlign="center";
            this.ctx.font="20px Arial";
            this.ctx.fillStyle='#00eeff';
            this.ctx.fillText('商店：'+this.shop+'%',80,230);
            this.ctx.fillStyle='#dbb976';
            this.ctx.fillText('总体营业额占比',250,230);
            this.ctx.fillStyle='#bb53f6';
            this.ctx.fillText('电商'+this.online+'%',420,230);
        }
    };
    var mychart=new Canvas();
    mychart.init(document.getElementById('canvas'));
    mychart.draw({
        'shop':50,
        'online':50
    });
};