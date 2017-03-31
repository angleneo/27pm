/**
 * Created by admin on 2016/12/9.
 */
window.onload=function(){
    setTimeout(function(){
        var data=[
                {'hotelNumber':12000,'hotelMoney':46000,'ticketNumber':183654,'ticketMoney':62504},
                {'hotelNumber':16000,'hotelMoney':65108,'ticketNumber':163654,'ticketMoney':57054},
                {'hotelNumber':13000,'hotelMoney':55180,'ticketNumber':153654,'ticketMoney':72054},
                {'hotelNumber':11000,'hotelMoney':52180,'ticketNumber':173654,'ticketMoney':66054},
                {'hotelNumber':10000,'hotelMoney':60018,'ticketNumber':168654,'ticketMoney':68054}
        ],
            hotelNumber=0,
            hotelMoney= 0,
            ticketNumber= 0,
            ticketMoney= 0;
        data.map(function(json){
            hotelNumber+=json.hotelNumber;
            hotelMoney+=json.hotelMoney;
            ticketNumber+=json.ticketNumber;
            ticketMoney+=json.ticketMoney;
        });
        $('.part-box').each(function(){
            var index=parseInt($(this).attr('data-index')),
                speed= 0,
                hn=data[index].hotelNumber,
                hm=data[index].hotelMoney,
                tn=data[index].ticketNumber,
                tm=data[index].ticketMoney,
                _this=$(this),
                max=Math.max.apply(null,[hn,hm,tn,tm]),
                timer=null;
            timer=setInterval(function(){
                speed+=1000;
                if(speed>hn){
                    _this.find('.hotel-progress .hotel-second').css('height',parseInt(hn/hotelNumber*435)+'px');
                    _this.find('.hotel-number').text(hn);
                }else {
                    _this.find('.hotel-progress .hotel-second').css('height',parseInt(speed/hotelNumber*435)+'px');
                    _this.find('.hotel-number').text(speed);
                }
                if(speed>hm){
                    _this.find('.hotel-progress .hotel-first').css('height',parseInt(hm/hotelMoney*435)+'px');
                    _this.find('.hotel-money').text(hm);
                }else {
                    _this.find('.hotel-progress .hotel-first').css('height',parseInt(speed/hotelMoney*435)+'px');
                    _this.find('.hotel-money').text(speed);
                }
                if(speed>tn){
                    _this.find('.entrance-ticket .hotel-second').css('height',parseInt(tn/ticketNumber*435)+'px');
                    _this.find('.ticket-number').text(tn);
                }else {
                    _this.find('.entrance-ticket .hotel-second').css('height',parseInt(speed/ticketNumber*435)+'px');
                    _this.find('.ticket-number').text(speed);
                }
                if(speed>tm){
                    _this.find('.entrance-ticket .hotel-first').css('height',parseInt(tm/ticketMoney*435)+'px');
                    _this.find('.ticket-money').text(tm);
                }else {
                    _this.find('.entrance-ticket .hotel-first').css('height',parseInt(speed/ticketMoney*435)+'px');
                    _this.find('.ticket-money').text(speed);
                }
                if(speed>=max){
                    clearInterval(timer);
                }
            },10);

        });
    },1000);
};