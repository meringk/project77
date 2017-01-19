(function ($) {

	var $body = $('body'),
		$toggle = $('.toggle'),
		$sidebarSection = $('#sidebarSection');

	// sidebar 숨김초기화
	//$sidebarSection.addClass('load');
	$sidebarSection.css("margin-left", "-245px");


	var flg = true;
	// sidebar 나타내는 toggle 버튼 flag
	$toggle[0].onclick = function () {
		if(flg){
			$sidebarSection.css("margin-left", "0px");
			$('#sidebarSection')[0].style.marginLeft=""
		}
		$sidebarSection.toggleClass("inactive");
		flg = false;
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

})(jQuery);