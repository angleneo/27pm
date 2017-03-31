/**
 * Created by admin on 2016/12/19.
 */
/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
    setTimeout(function(){
        var data=[
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518},
            {'number':51231,'hot':315518}
        ],numtotal= 0,hototal= 0;
        data.map(function(json){
            numtotal+=json.number;
            hototal+=json.hot;
        });
        $('.part-box').each(function(){
            var index=parseInt($(this).attr('data-index')),
                number=data[index].number,
                hot=data[index].hot,
                numtop=Math.ceil((number/numtotal)*185),
                hotop=Math.ceil((hot/hototal)*245);
            $(this).find('.progress-left-box').animate({'height':numtop+'px'},numtop/185*3000);
            $(this).find('.progress-right-box').animate({'height':hotop+'px'},hotop/185*3000);
        });
    },1000);
};