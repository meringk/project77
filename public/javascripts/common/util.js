(function ($) {

    var $window = $(window),
        $body = $('body');

    calTimeFnc = function (time_H) {

        var moon = ""
            , time = {}
            , moonArr = ['오전', '오후']
            , timeArr = ['한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열', '열한', '열두'];

        moon = moonArr[0];
        if (time_H.toString().length == 2) moon = moonArr[1];
        if (time_H == 10 || time_H == 11) moon = moonArr[0];

        if (time_H > 24) time_H = time_H - 24;
        if (time_H > 12) time_H = time_H - 12;

        time_H == 0 ? time_H = timeArr[11] : time_H = timeArr[time_H - 1];

        time.time_H = time_H;
        time.moon = moon;
        return time;
    }
    
    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function () {
        window.setTimeout(function () {

            $body.removeClass('is-loading');
            //코드를 다 부른 뒤(window.on.load)에 처리해야한다. (element들이 전부 load되고)
            var $toggle = $('.toggle'),
                $sidebarSection = $('#sidebarSection');

            // sidebar 나타내는 toggle 버튼 flag
            $toggle[0].onclick = function () {
                $sidebarSection.toggleClass("inactive");
                $body.toggleClass("side-on");
            }

            // click 이벤트 외의 별도의 브라우저 행동을 막는다. (bubble UP막기)
            $sidebarSection.on('click touchend touchstart touchmove', function (event) {
                event.stopPropagation();
            });
            $toggle.on('click touchend touchstart touchmove', function (event) {
                event.stopPropagation();
            });

            // 바디 터치시 사이드바 숨김
            $body.on('click touchend', function (event) {
                $sidebarSection.addClass('inactive');
            });

        }, 100);
    });
})(jQuery);