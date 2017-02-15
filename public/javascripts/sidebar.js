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


login = function () {
    var loginId = $('.cont_forms').find("input[name='loginId']").val();
    var loginPasswd = $('.cont_forms').find("input[name='loginPasswd']").val();

    $.ajax({
        url: '/login',
        type: 'post',
        dataType: 'json',
        data: { id: loginId, passwd: loginPasswd },
        success: function (data) {
            $('#login_li > a').css("display", "none");
            $('#login_li').text(data.m_username + "님 하이");
            $('#titleBar > .title').append("<span>" + data.m_username + "님 하이</span>");
            // $('#login_li').append(data.m_username + "님 하이");
            //$('#titleBar').append(data.m_username + "님 하이");
            $('#navPanel > nav')[0].lastElementChild.remove();
            $('#navPanel > nav').append("<a href=javascript:logout();>로그아웃</a>");
            console.log(data);
            USER_ID = data.m_userid;
            USER_NAME = data.m_username;
            $('.cont_login .close').click();
        }
    });
}

sign_up_section = function(){
    $('#sidebar').addClass("active");
};

back = function(){
    $('#sidebar').removeClass("active");
}

sign_up = function () {
    var id = $('.cont_form_sign_up').find("input[name='id']").val();
    var userName = $('.cont_form_sign_up').find("input[name='userName']").val();
    var passwd = $('.cont_form_sign_up').find("input[name='passwd']").val();
    var passwd_confirm = $('.cont_form_sign_up').find("input[name='passwd_confirm']").val();
    var param = {};
    var validation = false;

    param = {
        id: id,
        userName: userName,
        passwd: passwd,
        passwd_confirm: passwd_confirm
    }

    joinNoneCss(param);
    validation = Joinvalidation(param);

    if (validation) {
        if (passwd_confirm != passwd) {
            $('.cont_form_sign_up').find("input[name='passwd_confirm']").val("");
            emptyJoinCss($('#passwd_confirm'), "비밀번호가 일치하지않습니다.");
        } else {
            $.ajax({
                url: '/join',
                type: 'post',
                dataType: 'json',
                data: { id: id, name: name, passwd: passwd },
                success: function (data) {

                    alert("가입성공");
                    ocultar_login_sign_up();
                }
            });
        }
    }
}



signIn_naver = function () {
    var naver_id_login = new naver_id_login("E9pMRy_OGTUOp3FORXZ3", "http://www.meringk.com/naver_login_success");
  	var state = naver_id_login.getUniqState();
  	naver_id_login.setButton("white", 2,40);
  	naver_id_login.setDomain("http://www.meringk.com");
  	naver_id_login.setState(state);
  	naver_id_login.setPopup();
  	naver_id_login.init_naver_id_login();
}

// function Joinvalidation(param) {
//     var chk = true;
//     if (param.id == "") {
//         emptyJoinCss($('#id'), "ID입력바랍니다.");
//         chk = false;
//     } else if (param.userName == "") {
//         emptyJoinCss($('#userName'), "이름입력바랍니다.");
//         chk = false;
//     } else if (param.passwd == "") {
//         emptyJoinCss($('#passwd'), "비밀번호입력바랍니다.");
//         chk = false;
//     } else if (param.passwd_confirm == "") {
//         emptyJoinCss($('#passwd_confirm'), "비밀번호입력바랍니다.");
//         chk = false;
//     } else {
//         return chk;
//     }
// }
// function joinNoneCss(param) {
//     if (param.id != "") {
//         joinCss($('#id'));
//     }
//     if (param.userName != "") {
//         joinCss($('#userName'));
//     }
//     if (param.passwd != "") {
//         joinCss($('#passwd'));
//     }
//     if (param.passwd_confirm != "") {
//         joinCss($('#passwd_confirm'));
//     }
// };

// function emptyJoinCss(param, msg) {
//     param.css('border', '1px dotted #ec6161');
//     param[0].placeholder = msg;
//     param.focus();
// }

// function joinCss(param) {
//     param.css('border', 'none');
// }

// function cambiar_login() {
//     document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
//     $('.cont_form_login').css("display", "block");
//     $('.cont_form_sign_up').css("opacity", 0);
//     setTimeout(function () { $('.cont_form_login').css("opacity", 1); }, 400);
//     setTimeout(function () { $('.cont_form_sign_up').css("display", "none"); }, 200);
// }

// function cambiar_sign_up(at) {
//     document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
//     $('.cont_form_sign_up').css("opacity", 1);
//     $('.cont_form_sign_up').css("display", "block");
//     $('.cont_form_login').css("opacity", 0);
//     setTimeout(function () { $('.cont_form_sign_up').css("opacity", 1); }, 100);
//     setTimeout(function () { $('.cont_form_login').css("display", "none"); }, 400);

// }

// function ocultar_login_sign_up() {

//     document.querySelector('.cont_forms').className = "cont_forms";

//     $('.cont_form_sign_up').css("opacity", 0);
//     $('.cont_form_login').css("opacity", 0);
//     setTimeout(function () {
//         $('.cont_form_sign_up').css("display", "none");
//         $('.cont_form_login').css("display", "none");
//     }, 500);
// }


// var s = location.href;
// if (s.indexOf('blog') > -1 || s.indexOf('study') > -1) {
//     $('#location')[0].innerHTML = "<a href='/html/blog/blog.html'>BLOG</a>  ||  <a href='/html/study/study.html'>STUDY</a>";
// }

signup = function () {
    $('.cont_login').css("display", "block");
    $('.cont_login').css("position", "fixed");
	//$('.cont_login').css("top", ($(window).height()-$(".col_md_login").height())/2);
    //$('.cont_login').css("left", ($(window).width()-$(".col_md_login").width())/2);
    $('.cont_login').css("top", "0px");
    $('.cont_login').css("left", ($(window).width()-$(".col_md_login").width()));
    $('.cont_login').addClass("active");
};

$('.cont_login .close').click(function () {
    $('.cont_login').removeClass("active");
	$('.cont_login').css("display", "none");

    // $('.cont_forms').removeClass("cont_forms_active_sign_up");
    // $('.cont_forms').removeClass("cont_forms_active_login");
    // $('.cont_form_login').css("opacity", 0);
    // $('.cont_form_login').css("display", "none");
    // $('.cont_form_sign_up').css("opacity", 0);
    // $('.cont_form_sign_up').css("display", "none");
    // $('#id').css('border', 'none');
    // $('#userName').css('border', 'none');
    // $('#passwd').css('border', 'none');
    // $('#passwd_confirm').css('border', 'none');
    // $('.cont_form_sign_up').find("input[name='id']").val("");
    // $('.cont_form_sign_up').find("input[name='userName']").val("");
    // $('.cont_form_sign_up').find("input[name='passwd']").val("");
    // $('.cont_form_sign_up').find("input[name='passwd_confirm']").val("");
    // $('.cont_forms').find("input[name='loginId']").val("");
    // $('.cont_forms').find("input[name='loginPasswd']").val("");
});