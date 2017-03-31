/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
    setTimeout(function(){
        var data=['70%','60%','50%','65%','30%'];
        $('.progress-bar-box').each(function(){
            var index=parseInt($(this).attr('data-index')),
                number=parseInt(data[index]),
                top=Math.ceil(parseInt(number/100*546)/24)*24,
                time=parseInt(number/100*2000);
            $(this).animate({'top':(579-top)+'px'},time);
            $(this).find('.progress-bar').animate({'top':(-546+top)+'px'},time)
        });
    },1000);
};