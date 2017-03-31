/**
 * Created by admin on 2016/12/27.
 **/
$(document).ready(function(){
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
            this.ctx=this.obj.getContext('2d');
        },
        draw:function(json){
            var _this=this;
            this.data=json.data;
            this.color=json.color;
            this.max=Math.max.apply(null,this.addArr(this.data));
            this.background();
            for(var i=0;i<this.data.length;i++){
                this.dataLine(this.data[i].data,i);
            }
        },
        addArr:function(arr){
            var a=[];
            for(var i=0;i<arr.length;i++){
                a=a.concat(arr[i].data);
            }
            return a;
        },
        animation:function(){
        },
        background:function(){
            var grd=this.ctx.createLinearGradient(10,60,66,60),
                text=['08:00~10:00','10:00~12:00','12:00~14:00','14:00~16:00','16:00~18:00','18:00~20:00','20:00~22:00','22:00~24:00'];
            grd.addColorStop(0,'rgba(255,255,255,0.1)');
            grd.addColorStop(0.5,"#00fffe");
            this.line({
                x:10,
                y:60,
                tx:1466,
                ty:60,
                lColor:grd
            });
            this.line({
                x:10,
                y:670,
                tx:1466,
                ty:670,
                lColor:grd
            });
            for(var i=0;i<8;i++){
                this.circle({
                    x:66+i*200,
                    y:60,
                    r:6,
                    color:'#00fffe'
                });
                this.circle({
                    x:66+i*200,
                    y:670,
                    r:6,
                    color:'#00fffe'
                });
                this.text({
                    text:text[i],
                    x:66+i*200,
                    y:45,
                    color:'#00fffe',
                    base:'bottom',
                    align:'center'
                });
                this.text({
                    text:text[i],
                    x:66+i*200,
                    y:685,
                    color:'#00fffe',
                    base:'top',
                    align:'center'
                });
            }
            for(i=0;i<this.data.length;i++){
                this.ctx.lineJoin="round";
                this.rect({
                    x:1520,
                    y:80+i*100,
                    tx:130,
                    ty:40,
                    lColor:this.color[i]
                });
                this.circle({
                    x:1534,
                    y:80+i*100+20,
                    r:6,
                    color:this.color[i]
                });
                this.text({
                    text:this.data[i].name,
                    x:1546,
                    y:80+i*100+20,
                    color:this.color[i],
                    font:'bold 24px Microsoft YaHei',
                    base:'middle',
                    align:'left'
                });
            }
        },
        dataLine:function(data,number){
            var max=Math.max.apply(null,data),
                index=data.indexOf(max);
            for(var i=0;i<data.length-1;i++){
                this.line({
                    x:66+i*200,
                    y:660-parseInt(data[i]/this.max*550),
                    tx:66+(i+1)*200,
                    ty:660-parseInt(data[i+1]/this.max*550),
                    lColor:this.color[number]
                });
            }
            this.circle({
                x:66+index*200,
                y:660-parseInt(max/this.max*550),
                r:6,
                color:this.color[number]
            });
            this.text({
                text:max,
                x:66+index*200,
                y:660-parseInt(max/this.max*555),
                font:'bold 30px Microsoft YaHei',
                color:this.color[number],
                base:'bottom',
                align:'center'
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
                fill=json.fill||true,
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
    var obj=new Canvas();
    obj.init(document.getElementById('canvas'));
    obj.draw({
        data:[
            {
                name:'旋转木马',
                data:[600,200,300,400,50,623,0,1100]
            },
            {
                name:'滑索',
                data:[500,400,800,700,200,603,100,500]
            },
            {
                name:'摩天轮',
                data:[320,500,300,800,100,403,1000,900]
            },
            {
                name:'旋转飞机',
                data:[920,500,600,400,700,203,500,540]
            },
            {
                name:'吊索',
                data:[520,320,645,777,1500,600,990,620]
            }
        ],
        color:['#d64f4b','#eda63a','#e28452','#87ac69','#a6a638']
    });
});