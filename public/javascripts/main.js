(function($) {

	var	$body = $('body'),
		toggle = $('.toggle');
		sidebarSection = $('#sidebarSection');

	toggle[0].onclick=function(){
			$body.toggleClass("side-on");
		}


	$body.click(function(e){
		if(e.target.className!="toggle") {
			console.log(sidebarSection.has(e.target).length);
			if(sidebarSection.has(e.target).length==0){
				$body.addClass("side-off");
			}
		}

	})

})(jQuery);