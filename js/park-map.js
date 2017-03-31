/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
    var data=[
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':16546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':10546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':9546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546},
        {'number':18546,'money':18546,'average':18546}
    ],numtotal= 0,montotal= 0,avetotal= 0,newData=[];
    data.map(function(json){
        numtotal+=json.number;
        montotal+=json.money;
        avetotal+=json.average;
    });
    $('.part-box').each(function(){
        var index=parseInt($(this).attr('data-index')),
            number=data[index].number,
            money=data[index].money,
            average=data[index].average,
            num=Math.ceil(number/numtotal*100),
            mon=Math.ceil(money/montotal*100),
            ave=Math.ceil(average/avetotal*100);
        newData.push({
                'left':num,
                'middle':mon,
                'right':ave
            }
        );
    });
    window.requestAnimFrame = ( function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ) {
                window.setTimeout( callback, 1000 / 60 );
            };
    })();
    function Canvas(){}
    Canvas.prototype={
        init:function(obj){
            this.obj=obj;
            this.ctx=obj.getContext('2d');
        },
        draw:function(json){
            this.animate=json.animate||true;
            this.initNumber=1;
            this.left=Math.ceil(json.left/100*18);
            this.middle=Math.ceil(json.middle/100*18);
            this.right=Math.ceil(json.right/100*18);
            this.max=Math.max.apply(null,[this.left,this.middle,this.right]);
            this.background();
            var _this=this;
            if(this.animate){
                setTimeout(function(){
                    _this.animation();
                },1500);
            }
        },
        animation:function(){
            var _this=this;
            if(this.initNumber>this.max){
                return false;
            }
            var left=this.initNumber>this.left ? this.left : this.initNumber,
                middle=this.initNumber>this.middle ? this.middle : this.initNumber,
                right=this.initNumber>this.right ? this.right : this.initNumber;
            this.ctx.clearRect(0,0,85,195);
            this.background();
            this.bar({
                'left':left,
                'middle':middle,
                'right':right
            });
            this.initNumber++;
            requestAnimationFrame(function(){
                _this.animation();
            });
        },
        background:function(){
            this.ctx.fillStyle='rgba(0,255,244,0.2)';
            for(var i=0;i<18;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(0,195-i*10);
                this.ctx.lineTo(0,190-i*10);
                this.ctx.lineTo(24,178-i*10);
                this.ctx.lineTo(24,183-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(234,202,139,0.2)';
            for(i=0;i<18;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(26,182-i*10);
                this.ctx.lineTo(26,177-i*10);
                this.ctx.lineTo(42,169-i*10);
                this.ctx.lineTo(58,177-i*10);
                this.ctx.lineTo(58,182-i*10);
                this.ctx.lineTo(42,174-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(97,235,110,0.2)';
            for(i=0;i<18;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(84,195-i*10);
                this.ctx.lineTo(84,190-i*10);
                this.ctx.lineTo(60,178-i*10);
                this.ctx.lineTo(60,183-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
        },
        bar:function(json){
            this.ctx.fillStyle='rgba(0,255,244,0.6)';
            for(var i=0;i<json.left;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(0,195-i*10);
                this.ctx.lineTo(0,190-i*10);
                this.ctx.lineTo(24,178-i*10);
                this.ctx.lineTo(24,183-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(234,202,139,0.6)';
            for(i=0;i<json.middle;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(26,182-i*10);
                this.ctx.lineTo(26,177-i*10);
                this.ctx.lineTo(42,169-i*10);
                this.ctx.lineTo(58,177-i*10);
                this.ctx.lineTo(58,182-i*10);
                this.ctx.lineTo(42,174-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(97,235,110,0.6)';
            for(i=0;i<json.right;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(84,195-i*10);
                this.ctx.lineTo(84,190-i*10);
                this.ctx.lineTo(60,178-i*10);
                this.ctx.lineTo(60,183-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    };
    var obj=document.getElementsByClassName('canvas');
    for(var i=0;i<obj.length;i++){
        var mycanvas=new Canvas();
        mycanvas.init(obj[i]);
        mycanvas.draw(newData[i]);
    }
};