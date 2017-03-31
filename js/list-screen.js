/**
 * Created by admin on 2016/12/28.
 */
$(document).ready(function(){
    function Canvas(){}
    Canvas.prototype={
        init:function(obj){
            this.obj=obj;
            this.ctx=this.obj.getContext('2d');
        },
        draw:function(json){
            var _this=this;
            this.color='#00fff4';
            this.background();
        },
        background:function(){
            this.circle({
                x:175,
                y:175,
                r:170,
                line:true,
                lineW:6,
                lColor:this.color,
                start:0.2*Math.PI,
                end:0.5*Math.PI
            });
            this.circle({
                x:175,
                y:175,
                r:170,
                line:true,
                lineW:6,
                lColor:this.color,
                start:0.7*Math.PI,
                end:0.9*Math.PI
            });
            this.circle({
                x:175,
                y:175,
                r:170,
                line:true,
                lineW:6,
                lColor:this.color,
                start:21/20*Math.PI,
                end:13/11*Math.PI
            });
            this.circle({
                x:175,
                y:175,
                r:170,
                line:true,
                lineW:6,
                lColor:this.color,
                start:1.3*Math.PI,
                end:1.8*Math.PI
            });
            this.circle({
                x:175,
                y:175,
                r:170,
                line:true,
                lineW:6,
                lColor:this.color,
                start:1.9*Math.PI,
                end:2*Math.PI
            });
        },
        rect:function(json){
            var fill=json.fill||false,
                line=json.line||true,
                lineW=json.lineW|| 2,
                fColor=json.color||'#000',
                lColor=json.lColor||'#000';
            this.ctx.beginPath();
            this.ctx.rect(json.x,json.y,json.tx,json.ty);
            if(fill){
                this.ctx.fillStyle=fColor;
                this.ctx.fill();
            }
            if(line){
                this.ctx.lineWidth=lineW;
                this.ctx.strokeStyle=lColor;
                this.ctx.stroke();
            }
        },
        circle:function(json){
            var sAngle=json.start|| 0,
                eAngle=json.end||2*Math.PI,
                direction=json.direction||false,
                fill=json.fill,
                fColor=json.color||'#000',
                line=json.line||false,
                lineW=json.lineW|| 2,
                lColor=json.lColor||'#000';
            this.ctx.beginPath();
            this.ctx.arc(json.x,json.y,json.r,sAngle,eAngle,direction);
            if(fill){
                this.ctx.fillStyle=fColor;
                this.ctx.fill();
            }
            if(line){
                this.ctx.lineWidth=lineW;
                this.ctx.strokeStyle=lColor;
                this.ctx.stroke();
            }
        },
        line:function(json){
            var lineW=json.lineW|| 2,
                color=json.lColor||'#000';
            this.ctx.beginPath();
            this.ctx.moveTo(json.x,json.y);
            this.ctx.lineTo(json.tx,json.ty);
            this.ctx.lineWidth=lineW;
            this.ctx.strokeStyle=color;
            this.ctx.stroke();
        },
        text:function(json){
            var font=json.font||'20px Microsoft YaHei',
                color=json.color||'#000',
                base=json.base||'alphabetic',
                align=json.align||'start';
            this.ctx.textBaseline=base;
            this.ctx.textAlign=align;
            this.ctx.font=font;
            this.ctx.fillStyle=color;
            this.ctx.fillText(json.text,json.x,json.y);
        }
    };
    var obj=document.getElementById('canvas'),
        my=new Canvas();
    my.init(obj);
    my.draw();
    $('.select').click(function(){
        if($(this).hasClass('selected')){
            return false;
        }else {
            var src=$(this).attr('data-src'),
                href=$(this).attr('data-href');
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            $('.main-icon').css({'background':'url('+src+') no-repeat'}).attr('href',href);
        }
        if($(this).attr('data-bool')){
            $('.main-box').show();
        }else {
            $('.main-box').hide();
        }
    });
});