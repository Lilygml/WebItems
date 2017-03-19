function popWin(a){function n(){var a=k?k:document.body,b=a.scrollHeight>a.clientHeight?a.scrollHeight:a.clientHeight,c=a.scrollWidth>a.clientWidth?a.scrollWidth:a.clientWidth;$("#maskLayer").css({height:b,width:c})}var d,e,b=9000,c=!1,f=$("."+a),g=f.width(),h=f.height(),i=f.find(".tit"),j=f.find(".close"),k=document.documentElement,l=($(document).width()-f.width())/2,m=(k.clientHeight-f.height())/2;f.css({left:l,top:m,display:"block","z-index":b- -1}),i.mousedown(function(a){c=!0,d=a.pageX-parseInt(f.css("left")),e=a.pageY-parseInt(f.css("top")),f.css({"z-index":b- -1}).fadeTo(50,1)}),i.mouseup(function(){c=!1,f.fadeTo("fast",1)}),$(document).mousemove(function(a){if(c){var b=a.pageX-d;0>=b&&(b=0),b=Math.min(k.clientWidth-g,b)-1;var i=a.pageY-e;0>=i&&(i=0),i=Math.min(k.clientHeight-h,i)-1,f.css({top:i,left:b})}}),n(),$(window).bind("resize",function(){n()}),$(document).keydown(function(a){27==a.keyCode&&($("#maskLayer").remove(),f.hide())})};

$(function(){
	//affect:1
	$(".banner").slide({
		affect:4,
		time:3000,
		speed:400,
		dot_text:false,
	});
	$(".newslist li").hover(function(){
		$(this).addClass("curr");
	},function(){
		$(this).removeClass("curr");
	});
	$(".close").click(function(){
		$(this).parent().fadeOut();
	});
	$(".dept_select").chosen();
	
	var softH = $('.soft_ct').height();
	$('.sf_sidemenu').height(softH);

	var str = '<div class=\'newsbj_tc\' id=\'newsbj_tc\'><div class=\'newsbj_tit tit\'><h1>编辑分类</h1><a href=\"javascript:;\" class=\"close closeall\"></a></div><div class=\"ct\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"t_d\">分类名称：</td><td><input type=\"text\" class=\"flmc\" value=\"重要新闻\" /></td></tr><tr><td class=\"t_d\">&nbsp;</td><td><input type=\"button\" class=\"btn gx\" value=\"更 新\" /><input type=\"button\" class=\"btn qx close\" value=\"取 消\" /></td></tr></table></div></div>'
	$(".newsbj").click(function(){
		$("body").append(str);
		popWin("newsbj_tc");
		$(".newsbj_tc").css({
			left:($("body").width()-$(".newsbj_tc").width())/2-20+"px",
			top:($(window).height()-$(".newsbj_tc").height())/2+$(window).scrollTop()+"px",
			display:"block"
		});
		$(".close").click(function(){
			$(".newsbj_tc ").remove();
		});
	});
	
	var tabli = $(".statis_table ul.tit li"),
		tabct = $(".sta_biaoge");
	tabli.click(function(){ 
		tabli.removeClass("cur");   
		$(this).addClass("cur");
		tabct.hide();
		tabct.eq(tabli.index(this)).fadeIn('fast',function(){
			$('.chzn-container').css("width",145);
		});
	});
	
	$(".checkAll").each(function(index,Element){
		$(Element).click(function(){
			if(this.checked){
				$(this).parents(".sj_table_wrap").find("input[name='subBox']").prop("checked", true);
				$(this).parents(".sj_table_wrap").find("input[name='subBox']").parent("td").css({background:"#f5f5f5"});  
			}else{
				$(this).parents(".sj_table_wrap").find("input[name='subBox']").prop("checked", false); 
				$(this).parents(".sj_table_wrap").find("input[name='subBox']").parent("td").css({background:"#fff"});
			}
		});

     });
	$("input[name='subBox']").click(function(){    
		if(this.checked){    
			$(this).prop("checked", true);
			$(this).parent().css({background:"#f5f5f5"});  
		}else{    
			$(this).prop("checked", false); 
			$(this).parent().css({background:"#fff"});
		}    
	}); 
	
	$(".tj-box input[name='checkbox']").click(function(){    
		if(this.checked){    
			$(this).prop("checked", true);
			$(this).next().next("input[type='text']").attr("disabled", true);
			$(this).parent().css({background:"#f7fef3"});  
		}else{    
			$("input[type='text']").arrt("disabled", false);
			$(this).parent().css({background:""});
		}    
	}); 
	
	$(".yw-list-hover li").hover(function(){
		$(this).children(".dropcot").show();
	},function(){
		$(this).children(".dropcot").hide();
	});
	
	
	
})