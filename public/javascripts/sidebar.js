var $menu = $('#menu'),
	$menu_openers = $menu.children('ul').find('.opener');

// Openers.
$menu_openers.each(function () {

	var $this = $(this);

	console.log($this);

	$this.on('click', function (event) {

		// Prevent default.
		event.preventDefault();

		// Toggle.
		$menu_openers.not($this).removeClass('active');
		$this.toggleClass('active');

	});

});
