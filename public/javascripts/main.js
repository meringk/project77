(function ($) {


    skel.breakpoints({
        xxlarge: '(max-width: 1920px)',
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 1000px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
    });

    var $window = $(window),
        $body = $('body'),
        $banner = $('#banner');

    var g_idx = "";
    $.get('/guestList', function (data) {
        $('.guestResDiv').innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            var date = (data[i].g_date).split('T')[0]
                , time = (data[i].g_date).split('T')[1]
                , time_H = (time.split(':')[0]) * 1
                , calTime = calTimeFnc(time_H);
            g_idx = data[i].g_idx;

            $('.guestResDiv').append('<div> <span class="icon fa-child "/> ' + data[i].g_content + '  '
                + '<span style=\'font-size:12px\'>   -' + date
                + ' ' + calTime.moon + ' ' + calTime.time_H + '시</span></div>');
        }
    });



    $("#guestSubmit").submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $(this),
            ip = "";
        message = $form.find("input[name='guestContent']").val();
        var date = new Date();
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
        h = date.getHours();
        m += 1;

        if (m.toString().length == 1) m = "0" + m;
        if (d.toString().length == 1) d = "0" + d;
        var fullDay = y + "-" + m + "-" + d;
        calTime = calTimeFnc(h);

        if (message == "") {
            alert("한마디 적어주세여");
        } else {

            $.ajax({
                url: '/guestSubmit',
                type: 'post',
                dataType: 'json',
                data: { ip: '', message: message },
                success: function (data) {
                    $('.guestResDiv').prepend('<div>  <span class="icon fa-paw "/>   ' + message
                        + ' <span style=\'font-size:12px\'> -' + fullDay + ' '
                        + calTime.moon + ' ' + calTime.time_H + '시</span></div>');
                    $form.find("input[name='guestContent']").val("");
                }
            });
        };
    });


    guestMore = function () {

        $.get('/guestListMore?g_idx=' + g_idx, function (data) {
            for (var i = 0; i < data.length; i++) {
                var date = (data[i].g_date).split('T')[0]
                    , time = (data[i].g_date).split('T')[1]
                    , time_H = (time.split(':')[0]) * 1
                    , calTime = calTimeFnc(time_H);

                $('.guestResDiv').append('<div  class="new-link" style="display:none"> <span class="icon fa-child "/> ' + data[i].g_content + '  '
                    + '<span style=\'font-size:12px\'>   -' + date
                    + ' ' + calTime.moon + ' ' + calTime.time_H + '시</span></div>');
                $('.guestResDiv').find(".new-link:last").slideDown("fast");
                g_idx = data[i].g_idx;

                if (g_idx == 3) $('#guestMore')[0].style.display = "none"
            }
        });
    };


    //MAIN TYPE SECTION
    $("#typed").typed({
        strings: ["WELCOME", "WWW.MERINGK.COM", "I'm a Web Developer", "Write a Guestbook", "Thank You ♡"],
        //stringsElement: $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        loopCount: false,
    });

    $(".reset").click(function () {
        $("#typed").typed('reset');
    });

    //MAIN SCROLL EVENT
    $('a[href^="#"]').click(function () {
        var target = $(this.hash);
        target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 2000);
            return false;
        }
    });

    // Gallery.
    $window.on('load', function () {

        var $gallery = $('.gallery');

        $gallery.poptrox({
            baseZIndex: 10001,
            useBodyOverflow: false,
            usePopupEasyClose: false,
            overlayColor: '#1f2328',
            overlayOpacity: 0.65,
            usePopupDefaultStyling: false,
            usePopupCaption: true,
            popupLoaderText: '',
            windowMargin: 50,
            usePopupNav: true
        });

        // Hack: Adjust margins when 'small' activates.
        skel
            .on('-small', function () {
                $gallery.each(function () {
                    $(this)[0]._poptrox.windowMargin = 50;
                });
            })
            .on('+small', function () {
                $gallery.each(function () {
                    $(this)[0]._poptrox.windowMargin = 5;
                });
            });

    });

    var on = function () {

        // Galleries.
        $('.gallery')
            .scrollex({
                top: '30vh',
                bottom: '30vh',
                delay: 50,
                initialize: function () { $(this).addClass('inactive'); },
                terminate: function () { $(this).removeClass('inactive'); },
                enter: function () { $(this).removeClass('inactive'); },
                leave: function () { $(this).addClass('inactive'); }
            });

        // Guestbook.
        $('#three')
            .scrollex({
                delay: 50,
                initialize: function () {  $('.guestbook').addClass('inactive'); },
                terminate: function () {  $('.guestbook').removeClass('inactive'); },
                enter: function () { 

                     $('.guestbook').removeClass('inactive');
                    
                 },
                leave: function () {  $('.guestbook').addClass('inactive'); }
            });


    };

    var off = function () {

        // Galleries.
        $('.gallery')
            .unscrollex();

        $('#three')
            .unscrollex();
    };

    skel.on('change', function () {

        if (skel.breakpoint('small').active)
            (off)();
        else
				(on)();

    });


})(jQuery);