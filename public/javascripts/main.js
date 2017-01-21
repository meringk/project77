(function ($) {

    $("#typed").typed({
        strings: ["WELCOME", "WWW.MERINGK.COM", "I'm a Web Developer", "Write a Guestbook","Thank You ♡"],
        //stringsElement: $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        loopCount: false,
    });

    

    $(".reset").click(function(){
        $("#typed").typed('reset');
    });




})(jQuery);