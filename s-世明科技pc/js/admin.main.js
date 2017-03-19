//菜单隐藏显示
$(function () {
	$('ul.ul_menu li a').click(function () {
        var last = $('ul.ul_menu li.open');
        last.removeClass("open");
        //$('.arrow', last).removeClass("open"); 
        $('.ul_menu_p', last).slideUp(300);
        
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
           	//$('.arrow', $(this)).removeClass("open");
            $(this).parent().removeClass("open");
            sub.slideUp(300);
        } else {
            //$('.arrow', $(this)).addClass("open");
            $(this).parent().addClass("open");
            sub.slideDown(300);
        } 
    });
});
//新菜单根据Url决定逻辑
//(.html?action=)   有跳转子页面参数必须要加参数action，没有跳转子页面参数不需要写
$.extend({
    getUrlVars: function (e) {
        var vars = [], hash;
        var hashes = e.slice(e.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (e,name) {
        return $.getUrlVars(e)[name];
    }
});
$(function () {
	var LocationHref = window.location.href;
	var ActionHref = $.getUrlVar(LocationHref,'action');
    $("ul.ul_menu li a").each(function () {
    	if (LocationHref.indexOf($(this).attr("href")) > 0) {
            $(this).parent().addClass("actives");
            return false;
        }else{
            var parent = $(this);
            $(this).next("ul").each(function () {
                $("a", $(this)).each(function () {
                    if (LocationHref.indexOf($(this).attr("href")) > 0) {
                        $(this).parent().addClass("actives");
                        parent.parent().addClass("actives");
                        //$(".arrow", parent).addClass("open");
                        return false;
                    }
                });
            });
        }
        if (ActionHref.indexOf($.getUrlVar($(this).attr("href"),'action')) >= 0) {
            $(this).parent().addClass("actives");
            return false;
        }else{
            var parent = $(this);
            $(this).next("ul").each(function () {
                $("a", $(this)).each(function () {
                    if (ActionHref.indexOf($.getUrlVar($(this).attr("href"),'action')) >= 0) {
                        $(this).parent().addClass("actives");
                        parent.parent().addClass("actives");
                        //$(".arrow", parent).addClass("open");
                        return false;
                    }
                });
            });
        }
        
    });
});