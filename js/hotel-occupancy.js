/**
 * Created by admin on 2016/12/19.
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
            this.ctx=this.obj.getContext('2d');
        },
        draw:function(json){
            var _this=this;
            this.animate=json.animate||true;
            this.initPercent=0;
            this.circlePercent=json.circle.angle;
            this.circleAngle=this.angle(json.circle.angle,true);
            this.circleName=json.circle.name;
            this.circleColor=json.circle.color;
            this.circleFontColor=json.circle.fontColor;
            this.name=[];
            this.percent=[];
            this.halfCircleAngle=[];
            this.halfR=[130,185,240,295,375];
            this.color=json.color;
            this.fontColor=json.fontColor;
            this.circleLine=json.line||true;
            this.lineColor=json.lineColor;
            this.money=[];
            json.data.map(function(data){
                _this.halfCircleAngle.push(_this.angle(data.angle));
                _this.name.push(data.name);
                _this.percent.push(data.angle);
                _this.money.push(data.money);
            });
            this.circleBg();
            if(this.animate){
                this.animation();
            }else {
                this.circle(this.circleAngle);
                for(var i=0;i<5;i++){
                    this.halfCircle({
                        r:this.halfR[i],
                        angle:this.halfCircleAngle[i],
                        color:this.color[i],
                        lineColor:this.lineColor[i]
                    });
                }
                this.text();
            }
        },
        animation:function(){
            var arr=this.percent;
            arr.push(this.circlePercent);
            var _this=this,
                max=Math.max.apply(null,arr),
                angle='';
            this.ctx.clearRect(0,0,660,840);
            this.circleBg();
            this.halfCircle(this.halfCircleAngle[0],this.color[0],this.lineColor[0]);
            if(this.initPercent<=this.circlePercent){
                angle=this.angle(this.initPercent,true);
                this.circle(angle);
            }else {
                this.circle(this.circleAngle);
            }
            angle=this.angle(this.initPercent);
            for(var i=0;i<5;i++){
                if(this.initPercent<=this.percent[i]){
                    this.halfCircle({
                        r:this.halfR[i],
                        angle:angle,
                        color:this.color[i],
                        lineColor:this.lineColor[i]
                    });
                }else {
                    this.halfCircle({
                        r:this.halfR[i],
                        angle:this.halfCircleAngle[i],
                        color:this.color[i],
                        lineColor:this.lineColor[i]
                    });
                }
            }
            this.initPercent+=5;
            if(this.initPercent>max){
                this.text();
                return false;
            }
            console.log(max,this.circlePercent);
            requestAnimationFrame(function(){
                _this.animation();
            });
        },
        circleBg:function(){
            this.ctx.beginPath();
            this.ctx.arc(220,420,75,0,2*Math.PI,true);
            this.ctx.globalAlpha=0.5;
            this.ctx.lineWidth=30;
            this.ctx.strokeStyle=this.circleColor;
            this.ctx.stroke();
            this.ctx.globalAlpha=1;
            this.ctx.font="20px Arial";
            this.ctx.fillStyle=this.circleFontColor;
            this.ctx.fillText(this.circleName,(200-this.circleName.length*20),503);
            for(var i=0;i<5;i++){
                if(i<4){
                    this.ctx.globalAlpha=0.5;
                    this.ctx.beginPath();
                    this.ctx.arc(220,420,this.halfR[i],0.5*Math.PI,-0.5*Math.PI,true);
                    this.ctx.strokeStyle=this.color[i];
                    this.ctx.stroke();
                }
                this.ctx.globalAlpha=1;
                this.ctx.font="20px Arial";
                this.ctx.fillStyle=this.fontColor[i];
                this.ctx.fillText(this.name[i],(200-this.name[i].length*20),(428+this.halfR[i]));
            }
            this.ctx.beginPath();
            this.ctx.globalAlpha=0.4;
            this.ctx.arc(220,420,42,0,2*Math.PI,true);
            this.ctx.lineWidth=2;
            this.ctx.strokeStyle='#00b9b8';
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.globalAlpha=0.2;
            this.ctx.arc(220,420,37,0.5/9*Math.PI,-1/3*Math.PI,true);
            this.ctx.lineWidth=2;
            this.ctx.strokeStyle='#00b9b8';
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(220,420,37,17/18*Math.PI,1.05*Math.PI,false);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(220,420,31,0,2*Math.PI,false);
            this.ctx.lineWidth=6;
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.globalAlpha=1;
            this.ctx.globalCompositeOperation="source-over";
            for(i=0;i<36;i++){
                this.ctx.moveTo(220+28*Math.cos(this.angle(i*4,true)),420+28*Math.sin(this.angle(i*4,true)));
                this.ctx.lineTo(220+34*Math.cos(this.angle(i*4,true)),420+34*Math.sin(this.angle(i*4,true)));
                this.ctx.lineWidth=2;
                this.ctx.strokeStyle='#011019';
                this.ctx.stroke();
            }
            this.ctx.beginPath();
            this.ctx.moveTo(204,404);
            this.ctx.lineTo(204,436);
            this.ctx.lineWidth=6;
            this.ctx.lineCap="round";
            this.ctx.strokeStyle='#01b8b2';
            this.ctx.stroke();
            this.ctx.moveTo(236,412);
            this.ctx.lineTo(236,436);
            this.ctx.stroke();
            this.ctx.lineCap="butt";
            this.ctx.beginPath();
            this.ctx.globalCompositeOperation="source-over";
            this.ctx.moveTo(204,424);
            this.ctx.lineTo(236,424);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(213,415,4,0,2*Math.PI,false);
            this.ctx.fillStyle="#01b8b2";
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.moveTo(219,419);
            this.ctx.lineTo(219,411);
            this.ctx.lineTo(232,419);
            this.ctx.closePath();
            this.ctx.fill();
        },
        circle:function(angle){
            this.ctx.globalAlpha=1;
            this.ctx.beginPath();
            this.ctx.globalCompositeOperation="source-over";
            this.ctx.arc(220,420,75,0.5*Math.PI,angle,true);
            this.ctx.lineWidth=30;
            this.ctx.strokeStyle=this.circleColor;
            this.ctx.stroke();
            if(this.circleLine){
                this.ctx.beginPath();
                this.ctx.arc(220,420,59,0.5*Math.PI,angle,true);
                this.ctx.moveTo(220,479);
                this.ctx.lineTo(220,511);
                this.ctx.lineWidth=2;
                this.ctx.strokeStyle='rgba(0,255,245,0.5)';
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.arc(220,420,91,0.5*Math.PI,angle,true);
                this.ctx.moveTo((220+59*Math.cos(angle)),(420+59*Math.sin(angle)));
                this.ctx.lineTo((220+91*Math.cos(angle)),(420+91*Math.sin(angle)));
                this.ctx.stroke();
            }
        },
        halfCircle:function(data){
            this.ctx.beginPath();
            this.ctx.globalCompositeOperation="source-over";
            this.ctx.arc(220,420,data.r,0.5*Math.PI,data.angle,true);
            this.ctx.lineWidth=30;
            this.ctx.strokeStyle=data.color;
            this.ctx.stroke();
            if(this.circleLine){
                this.ctx.beginPath();
                this.ctx.arc(220,420,(data.r-16),0.5*Math.PI,data.angle,true);
                this.ctx.moveTo(220,(404+data.r));
                this.ctx.lineTo(220,(436+data.r));
                this.ctx.lineWidth=2;
                this.ctx.strokeStyle=data.lineColor;
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.arc(220,420,(data.r+16),0.5*Math.PI,data.angle,true);
                this.ctx.moveTo((220+(data.r-16)*Math.cos(data.angle)),(420+(data.r-16)*Math.sin(data.angle)));
                this.ctx.lineTo((220+(data.r+16)*Math.cos(data.angle)),(420+(data.r+16)*Math.sin(data.angle)));
                this.ctx.stroke();
            }
        },
        text:function(){
            this.ctx.beginPath();
            this.ctx.moveTo((220+59*Math.cos(this.circleAngle)),(420+59*Math.sin(this.circleAngle)));
            this.ctx.lineTo((220+91*Math.cos(this.circleAngle)),(420+91*Math.sin(this.circleAngle)));
            this.ctx.textAlign="start";
            this.ctx.textAlign="center";
            this.ctx.font="20px Arial";
            this.ctx.fillStyle=this.circleFontColor;
            if(this.circlePercent>85){
                this.ctx.fillText(this.circlePercent+'%',(220+75*Math.cos(this.angle(85,true)-1/18*Math.PI)),(420+75*Math.sin(this.angle(85,true)-1/18*Math.PI)));
            }else {
                this.ctx.fillText(this.circlePercent+'%',(220+75*Math.cos(this.circleAngle-1/(20-this.circlePercent/10)*Math.PI)),(420+75*Math.sin(this.circleAngle-1/(20-this.circlePercent/10)*Math.PI)));
            }
            for(var i=0;i<5;i++){
                var text= i<4 ? this.percent[i]+'%': this.money[i]+'元';
                this.ctx.moveTo((220+(this.halfR[i]-16)*Math.cos(this.halfCircleAngle[i])),(420+(this.halfR[i]-16)*Math.sin(this.halfCircleAngle[i])));
                this.ctx.lineTo((220+(this.halfR[i]+16)*Math.cos(this.halfCircleAngle[i])),(420+(this.halfR[i]+16)*Math.sin(this.halfCircleAngle[i])));
                this.ctx.textAlign="start";
                this.ctx.textAlign="center";
                this.ctx.font="20px Arial";
                this.ctx.fillStyle=this.fontColor[i];
                if(this.percent[i]>85){
                    this.ctx.fillText(text,(220+this.halfR[i]*Math.cos(this.angle(85)-1/30*Math.PI)),(420+this.halfR[i]*Math.sin(this.angle(85)-1/50*Math.PI)));
                }else {
                    this.ctx.fillText(text,(220+this.halfR[i]*Math.cos(this.halfCircleAngle[i]-1/30*Math.PI)),(420+this.halfR[i]*Math.sin(this.halfCircleAngle[i]-1/50*Math.PI)));
                }
                if(i<4){
                    this.ctx.moveTo(220,420-this.halfR[i]+32);
                    this.ctx.lineTo(220,420-this.halfR[i]);
                    this.ctx.textAlign="start";
                    this.ctx.textAlign="right";
                    this.ctx.font="20px Arial";
                    this.ctx.fillStyle=this.fontColor[i];
                    this.ctx.fillText('交易额(元):'+this.money[i],200,420-this.halfR[i]+6);
                }
            }
        },
        angle:function(){
            var angle=0;
            if(arguments[1]){
                angle=0.5-arguments[0]/100*2;
            }else {
                angle=0.5-arguments[0]/100;
            }
            return angle*Math.PI;
        }
};
    var data={
        circle:{'name':'酒店入住率','angle':80,'color':'rgba(0,255,245,0.2)','lineColor':'rgba(0,255,245,0.5)',fontColor:'rgba(0,255,244,1)'},
        data:[
            {'name':'三人间','angle':50,'money':'2,211,584'},
            {'name':'双人间','angle':40,'money':'32,513'},
            {'name':'家庭套餐','angle':75,'money':'11,584'},
            {'name':'豪华间','angle':50,'money':'123,584'},
            {'name':'交易总额','angle':50,'money':'2,516,584'}
        ],
        color:['rgba(221,89,145,0.2)','rgba(89,211,193,0.2)','rgba(255,191,71,0.2)','rgba(207,80,36,0.2)','rgba(33,219,147,0.2)'],
        fontColor:['rgba(221,89,145,1)','rgba(89,211,193,1)','rgba(255,191,71,1)','rgba(207,80,36,1)','rgba(33,219,147,1)'],
        lineColor:['rgba(221,89,145,0.5)','rgba(89,211,193,0.5)','rgba(255,191,71,0.5)','rgba(207,80,36,0.5)','rgba(33,219,147,0.5)']
    };
    var mycanvas=new Canvas();
    mycanvas.init(document.getElementById('canvas'));
    mycanvas.draw(data);
    var mycanvas02=new Canvas();
    mycanvas02.init(document.getElementById('canvas-second'));
    mycanvas02.draw(data);
};