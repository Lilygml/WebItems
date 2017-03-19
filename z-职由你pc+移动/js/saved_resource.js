$(function() {
	
/****************/	
    var e = 0;
    var d = 0;
    var a = 0;
    $(".b").attr({"left": "210px","top": "0"});
    var b = 0;
    var c = $(".nav_bg").height() + 117;
    if ($(".top_banner").length > 0 || ($(".wine_navbx").length == 0 && $("#mainbody").length > 0)) {
        c = 157 + 90;
    }
    window.onresize = function() {
        d = $(window).height() + e - c;
    };
    $("#nav li").mouseenter(function(i) {
        e = $(window).scrollTop();
        d = $(window).height() + e - c;
        var g = i.currentTarget;
        var f = parseInt($(g).position().top);
        $(this).addClass("nav_menu_on");
        a = $("#nav li").index($(g));
        //$(".menu_eject").hide();
        //$(".menu_eject").eq(a).show();
        var h = $(".menu_eject").eq(a).find(".sub_menu_left").height() + 20;
        $(".menu_eject").eq(a).find(".sub_menu_right").css("height", h);
        b = parseInt($(".menu_eject").eq(a).css("height")) + 2;
        if (d < b + f) {
            f = d - b;
            if (f < 0) {
                f = 0;
            }
        }
        $(".menu_eject").stop().animate({"top": f + "px"});
    });
    $(".menu_eject").mouseenter(function() {
        $("#nav li").eq(a).addClass("nav_menu_on");
        //$(".menu_eject").eq(a).show();
    });
    $("#nav li").mouseleave(function(f) {
        $(".menu_eject").hide();
        $(this).removeClass("nav_menu_on");
    });
    $(".menu_eject").mouseleave(function() {
        $("#nav li").removeClass("nav_menu_on");
        $(this).hide();
    });
/****************/	
	
	
	
/****************/	
$(window).bind("scroll",function(){  

			var scrolltop = $(window).scrollTop();
			if($(window).width()>480 && $(document).width()>480){
				if(parseInt(scrolltop) >= 180 ){
					$("#nav").addClass("fu")
				}else{
					$("#nav").removeClass("fu")
				}
			}
		});
/****************/				
	
	
/****************/	
/*$(window).bind("scroll",function(){  
			var scrolltop = $(window).scrollTop();
			if(parseInt(scrolltop) >= 40 ){
				$(".home_mare").addClass("fu2")
			}else{
				$(".home_mare").removeClass("fu2")
			}
		});*/
/****************/				



	
	
	
	
	
	
/****************/	
function h(a) {
        a >= 0 && (g = a),
        $(".banner_control em").animate({
            top: 63 * g + "px"
        },
        200),
        $(".thumbs li").removeClass("current"),
        $(".thumbs li").eq(g).addClass("current"),
        $(".banner_bg").animate({
            "margin-top": "-" + $(".bans").height() * g + "px"
        },
        200),
        g++,
        g >= f && (g = 0)
    }
f = $(".banner_bg li").length,
g = 1,		
$(".banner_bg").css("height", $(".bans").height() * f + "px"),	
i = setInterval(h, 5e3)
$(".thumbs li").hover(function() {
        if (!$(this).hasClass("current")) {
            $(".banner_bg").stop(!1, !0, !0),
            $(".thumbs li").stop(!1, !0, !0),
            $(".banner_control em").stop(!1, !0, !0),
            clearInterval(i);
            var a = $(this).index();
            h(a),
            i = setInterval(h, 5e3)
        }
    })
	
    $(".banner_bg li").hover(function() {
        $(".banner_bg li").stop(!0, !0),
        $(".thumbs li").stop(!0, !0),
        clearInterval(i)
    },
    function() {
        i = setInterval(h, 5e3)
    })
/****************/	










/************************/
$(".home_list h2 span").bind("mousemove",function(){
	if($(this).index()==0){
		$(".home_list_1").css("display","block")
		$(".home_list_2").css("display","none")
		if($(".home_list h2 span").next("em").css("left")=="126px")
			$(".home_list h2 span").next("em").stop().animate({left:'-=126px'}, 300);
	}else if($(this).index()==1){
		$(".home_list_1").css("display","none")
		$(".home_list_2").css("display","block")
		if($(".home_list h2 span").next("em").css("left")=="0px" || $(".home_list h2 span em").css("left")=="")
			$(".home_list h2 span").next("em").stop().animate({left:'+=126px'}, 300);
		}










	})
/************************/

});
