$(function(){

	
	/**导航**/
$(document).ready(function(){
    $(".sort-list>ul>li").hover(function(){
        $(this).addClass("hover")
    },function(){
        $(this).removeClass("hover")
    });
    
});


   /**tab**/
  $(document).ready(function(){
	var $tab_li = $('#tab ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var index = $tab_li.index(this);
		$('div.tab_box > div').eq(index).show().siblings().hide();
	});	
  });
  
  $(document).ready(function(){
	var $tab_li = $('#tab1 ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected1').siblings().removeClass('selected1');
		var index = $tab_li.index(this);
		$('div.tab_box1 > div').eq(index).show().siblings().hide();
	});	
  });
  
  $(document).ready(function(){
	var $tab_li = $('#tab2 ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected2').siblings().removeClass('selected2');
		var index = $tab_li.index(this);
		$('div.tab_box2 > div').eq(index).show().siblings().hide();
	});	
  });
  
  $(document).ready(function(){
	var $tab_li = $('#tab3 ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected3').siblings().removeClass('selected3');
		var index = $tab_li.index(this);
		$('div.tab_box3 > div').eq(index).show().siblings().hide();
	});	
  });
  
  $(document).ready(function(){
	var $tab_li = $('#tab4 ul li');
	$tab_li.hover(function(){
		$(this).addClass('selected4').siblings().removeClass('selected4');
		var index = $tab_li.index(this);
		$('div.tab_box4 > div').eq(index).show().siblings().hide();
	});	
  });
  
//$(document).ready(function(){
//		var $tab_li = $('#tab5 ul li');
//		$tab_li.hover(function(){
//			$(this).addClass('selected5').siblings().removeClass('selected5');
//			var index = $tab_li.index(this);
//			$('div.tab_box5 > div').eq(index).show().siblings().hide();
//		});	
//	});
//	
//	$(document).ready(function(){
//		var $tab_li = $('#tab6 ul li');
//		$tab_li.hover(function(){
//			$(this).addClass('selected6').siblings().removeClass('selected6');
//			var index = $tab_li.index(this);
//			$('div.tab_box6 > div').eq(index).show().siblings().hide();
//		});	
//	});
//	
//	$(document).ready(function(){
//		var $tab_li = $('#tab7 ul li');
//		$tab_li.hover(function(){
//			$(this).addClass('selected7').siblings().removeClass('selected7');
//			var index = $tab_li.index(this);
//			$('div.tab_box7 > div').eq(index).show().siblings().hide();
//		});	
//	});

});

//伪类选择器兼容ie
$(function(){
	$(".tab_menuBox_l li:nth-child(1)").css({'float': 'left'});
	$(".tab_menuBox_l li:nth-child(2)").css({'float': 'left','padding-left': '10px'});
	$(".tab_menuBox_l li:nth-child(3)").css({'width': '240px','float': 'right'});
	
	$(".zdry h3").click(function(){
		$(this).addClass('zt');
		$(this).toggleClass('ztt');
		$(this).next().toggle();
	});
});




