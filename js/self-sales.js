/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
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
            this.left=Math.ceil(json.left/100*49);
            this.middle=Math.ceil(json.middle/100*49);
            this.right=Math.ceil(json.right/100*49);
            this.max=Math.max.apply(null,[this.left,this.middle,this.right]);
            this.background();
            var _this=this;
            if(this.animate){
                setTimeout(function(){
                    _this.animation();
                },1000);
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
            this.ctx.clearRect(0,0,116,516);
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
            for(var i=0;i<49;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(0,516-i*10);
                this.ctx.lineTo(0,510-i*10);
                this.ctx.lineTo(36,492-i*10);
                this.ctx.lineTo(36,498-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(234,202,139,0.2)';
            for(i=0;i<49;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(38,497-i*10);
                this.ctx.lineTo(38,491-i*10);
                this.ctx.lineTo(58,481-i*10);
                this.ctx.lineTo(78,491-i*10);
                this.ctx.lineTo(78,497-i*10);
                this.ctx.lineTo(58,487-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(97,235,110,0.2)';
            for(i=0;i<49;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(116,516-i*10);
                this.ctx.lineTo(116,510-i*10);
                this.ctx.lineTo(80,492-i*10);
                this.ctx.lineTo(80,498-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
        },
        bar:function(json){
            this.ctx.fillStyle='rgba(0,255,244,0.6)';
            for(var i=0;i<json.left;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(0,516-i*10);
                this.ctx.lineTo(0,510-i*10);
                this.ctx.lineTo(36,492-i*10);
                this.ctx.lineTo(36,498-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(234,202,139,0.6)';
            for(i=0;i<json.middle;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(38,497-i*10);
                this.ctx.lineTo(38,491-i*10);
                this.ctx.lineTo(58,481-i*10);
                this.ctx.lineTo(78,491-i*10);
                this.ctx.lineTo(78,497-i*10);
                this.ctx.lineTo(58,487-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.fillStyle='rgba(97,235,110,0.6)';
            for(i=0;i<json.right;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(116,516-i*10);
                this.ctx.lineTo(116,510-i*10);
                this.ctx.lineTo(80,492-i*10);
                this.ctx.lineTo(80,498-i*10);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    };
    var obj=document.getElementsByClassName('canvas');
    for(var i=0;i<obj.length;i++){
        var mycanvas=new Canvas();
        mycanvas.init(obj[i]);
        mycanvas.draw({'left':50,'middle':15,'right':30});
    }
};