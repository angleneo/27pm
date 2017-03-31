/**
 * Created by admin on 2016/12/23.
 */
(function(){
    var nowDate=null;
    initDate();
    nowDate=setInterval(function(){
        initDate();
    },1000);
    function initDate(){
        var date=new Date(),
            year=date.getFullYear(),
            month=date.getMonth()+ 1,
            day=date.getDate(),
            hour=date.getHours(),
            minute=date.getMinutes(),
            second=date.getSeconds();
        $('.time-box').attr({'data-year':year,'data-month':month});
        year="'"+year+"'";
        var year1=parseInt(year.charAt(1)),
            year2=parseInt(year.charAt(2)),
            year3=parseInt(year.charAt(3)),
            year4=parseInt(year.charAt(4));
        time(year1,$('.time-year01'));
        time(year2,$('.time-year02'));
        time(year3,$('.time-year03'));
        time(year4,$('.time-year04'));
        var month1=parseInt(month/10),
            month2=month%10;
        time(month1,$('.time-month01'));
        time(month2,$('.time-month02'));
        var day1=parseInt(day/10),
            day2=day%10;
        time(day1,$('.time-day01'));
        time(day2,$('.time-day02'));
        var hour1=parseInt(hour/10),
            hour2=hour%10;
        time(hour1,$('.time-hour01'));
        time(hour2,$('.time-hour02'));
        var minute1=parseInt(minute/10),
            minute2=minute%10;
        time(minute1,$('.time-minute01'));
        time(minute2,$('.time-minute02'));
        var second1=parseInt(second/10),
            second2=second%10;
        time(second1,$('.time-second01'));
        timeAnimate(second2,$('.time-second02'));
        function timeAnimate(number,obj){
            if(number==0){
                obj.animate({'background-position-y':-460+'px'},500,function(){
                    $(this).css({'background-position-y':0});
                });
            }else {
                obj.animate({'background-position-y':-number*46+'px'},500);
            }
        }
        function time(number,obj){
            obj.animate({'background-position-y':-number*46+'px'},500);
        }
    }
})();