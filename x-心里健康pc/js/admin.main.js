//菜单隐藏显示
$(function () {
	$('.li_menu .menu_p i').addClass("arrow");
	$('ul.ul_menu li a').click(function () {
        var last = $('ul.ul_menu li.open');
        last.removeClass("open");
        $('.arrow', last).removeClass("opens"); 
        $('.ul_menu_p', last).slideUp(300);
        
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
           	$('.arrow', $(this)).removeClass("opens");
            $(this).parent().removeClass("open");
            sub.slideUp(300);
        } else {
            $('.arrow', $(this)).addClass("opens");
            $(this).parent().addClass("open");
            sub.slideDown(300);
        } 
    });
	
	 function getCookie(cname)
	{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
	}
    $("ul.ul_menu>li>a").click(function(){
    	document.cookie = "cVCookie=";
    	document.cookie="cVCookie="+$(this).attr("coption-value");
    });
	var cVCookie=getCookie("cVCookie");
	var locationHref = window.location.href; 
	
    $("ul.ul_menu>li>a").each(function () {
        if (locationHref.indexOf($(this).attr("href")) > 0 || cVCookie == $(this).attr("coption-value")) {
        	$(this).parent().addClass("open");
			$(this).addClass("cur");
            return false;
        }
        else {
            var parent = $(this);
            $(this).next("ul").each(function () {
                $("a", $(this)).each(function () {
                    if (locationHref.indexOf($(this).attr("href")) > 0 || cVCookie == $(this).attr("coption-value")) {
						$(".arrow", parent).addClass("opens");
                    	parent.parent().addClass("open");
                        $(this).addClass("pass_cur");
                        return false;
                        
                    }
                });
            });
        }
    }); 
});


