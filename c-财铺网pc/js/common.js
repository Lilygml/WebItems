//右侧浮动
$(function() {
	//返回顶部
	var $aTop=$('#top');
	var $rightNav = $('.rightfloating').eq(0);
	var footerHeight = $('.footer').eq(0).outerHeight() + 30;
	var bottomPot = $('body').height() - footerHeight - $rightNav.height() - $(window).height() / 2;
	
	$aTop.hide();
	$aTop.click(function(){
		$('body,html').animate({scrollTop:0},1000);
		return false;
	});
	$(window).scroll(function(){	
		var wH=$(this).scrollTop();
		if(wH>=200){
			$aTop.show();
		}else{
			$aTop.hide();	
		}

		if( wH >= bottomPot) {
			$rightNav.css({'top':'auto', 'bottom':footerHeight});
		}
		else{
			$rightNav.css({'top':'', 'bottom':''});
		}
	});
    
    //右则浮动转店评估展开效果
    $("#J_serviceSelectBox .ssb-item").each(function(index, element) {
        $(this).hover(function(){
            $(this).addClass("active").siblings().removeClass("active");
            
            if(index == 3){
               $(this).siblings(".arrow-right-box").eq(0).addClass("arrow-hover"); 
            }
            else{
                $(this).siblings(".arrow-right-box").eq(0).removeClass("arrow-hover");
            }
        });
    });
});

