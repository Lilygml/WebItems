$(function(){
	/*表单验证strat*/
	$('#formID,#formID2,#formID3,#formID4').each(function(){
		$(this).validationEngine({
			showOneMessage: true,
	        maxErrorsPerField: 1,
	        addPromptClass:"formError-noArrow"
	    });
    });
    /*发送短信strat*/
	var wait=60;
	function time(o) {
		if (wait == 0) {
			o.removeAttribute("disabled");
			o.value="重新发送";
			wait=60;
		} else if(wait > 0) {
			o.setAttribute("disabled", true);
			o.value="(" + wait + ")重新获取";
			wait--;
			setTimeout(function() {
				time(o)
			},1000);
		}
	}
	//手机短信验证
	$("#phonecodesub").click(function(){
		var This = $(this);
		var CheckMyreg= /^(((1[0-9]{2})|159|(1[0-9]{2}))+\d{8})$/;
		var Uphone=$("#uphone");
	 	if(!CheckMyreg.test(Uphone.val())){
			Uphone.focus();
	    	return false;
	    }
	    time(this);
		$.post("#",{},function(result2){
		   $.post("?app=sms",{mobile:Uphone.val(),content:result2},function(result){
		   	if (result==1)
				{
					This.val("已发送");
				}
				else
				{
					This.val("发送失败");
				}
		   });
		});
	});
	//邮箱邮件验证
	$("#phonecodesub2").click(function(){
		var This = $(this);
		var CheckMyreg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		var Uemail=$("#uemail");
	 	if(!CheckMyreg.test(Uemail.val())){
			Uemail.focus();
	    	return false;
	    }
	    time(this);
		$.post("#",{},function(result2){
		   $.post("?app=email",{mobile:Uemail.val(),content:result2},function(result){
		   	if (result==1)
				{
					This.val("已发送");
				}
				else
				{
					This.val("发送失败");
				}
		   });
		});
	});
	/*发送短信strat*/
	/*表单验证end*/
	
	//在线咨询strat
	$('#close_im').bind('click',function(){
		$('#main-im').css("height","0");
		$('#im_main').hide();
		$('#open_im').show();
	});
	$('#open_im').bind('click',function(e){
		$('#main-im').css("height","272");
		$('#im_main').show();
		$(this).hide();
	});
	//返回顶部
	$('.go-top').bind('click',function(){
		$(window).scrollTop(0);
	});
	//隐藏显示微信
	$(".weixing-container").bind('mouseenter',function(){
		$('.weixing-show').show();
	})
	$(".weixing-container").bind('mouseleave',function(){        
		$('.weixing-show').hide();
	});
	//在线咨询end
	
    /*全选功能start*/
    $("#select_down").on('change', function(ev){
        var is_checked = $(this).is(':checked');
        $("input[class='ckb']").prop('checked', is_checked).trigger('change');
    });
	/*全选功能end*/
	
	//会员中心左侧下拉菜单start
    jQuery('.aside-nav > ul > li > a').click(function () {
        var last = jQuery('.has-sub.open', $('.aside-nav'));
        last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);
        
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(200);
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200);
        }
    });
	//js会员中心左侧下拉菜单end
	
   	//新菜单根据Url决定逻辑start
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
    $("a[coption-value]").click(function(){
    	document.cookie = "cVCookie=";
    	document.cookie="cVCookie="+$(this).attr("coption-value");
    });
	var cVCookie=getCookie("cVCookie");
	var locationHref = window.location.href; 

    $(".aside-nav > ul > li > a").each(function () {
        if (locationHref.indexOf($(this).attr("href")) > 0 || cVCookie == $(this).attr("coption-value")) {
        	$(this).parent().addClass("active");
            return false;
        }
        else {
            var parent = $(this);
            $(this).next("ul").each(function () {
                $("a", $(this)).each(function () {
                    if (locationHref.indexOf($(this).attr("href")) > 0 || cVCookie == $(this).attr("coption-value")) {
                    	parent.parent().addClass("active");
                    	$(this).parent().addClass("active");
                        $(".arrow", parent).addClass("open");
                        return false;
                    }
                });
            });
        }
    }); 
    //新菜单根据Url决定逻辑end
    
    //首页焦点图start
    var width=$('#box').width()
    var iNow = 0
    var timer=null

    //只负责切换和更新iNow
    function change(pre,next){
        $('#box ol li').eq(pre).removeClass('active')
        $('#box ol li').eq(next).addClass('active')
        $('#box ul').animate({
            left:-(next)*width
        })
        iNow=next
    }

    //自动切换 判断是否为最后一个
    function autoChange(){
        var next=iNow+1
        if(iNow==$('#box ul li').length-1){
            next=0
        }
        change(iNow,next)
    }

    timer=setInterval(autoChange,4000)

    $('#box').on('mouseover',function(){
        clearInterval(timer)
    })
    $('#box').on('mouseout',function(){
        timer=setInterval(autoChange,4000)
    })


    $('#box ol li').on('mouseover', function () {
        change(iNow,$(this).index())
    })
    //首页焦点图end
    
    //首页搜索start
	$(".search_nav span").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var url="";
		switch ($(this).html()) {
		  	case '新房': url="搜索列表.html?url=新房";
		    	break;
		  	case '办公楼': url="搜索列表.html?url=办公楼";
		    	break;
		  	case '商业楼': url="搜索列表.html?url=商业楼";
		    	break;
		    case '工业厂房': url="搜索列表.html?url=工业厂房";
		    	break;
		    case '二手房': url="搜索列表.html?url=二手房";
		    	break;
		 	case '律师在线': url="搜索列表.html?url=律师在线";
		    	break;
		  	default: url="搜索列表.html";
		}
		$(".search_input form").attr("action",url);
	});
	$(".search_nav span").eq(0).trigger('click');
    //首页搜素end
    
    //会员登陆注册找回密码窗口垂直居中start
    var popup = $(".login");
	popup.animate({top:($(window).height()/2-popup.outerHeight(true)/2)+'px',left:($(window).width()/2-popup.outerWidth(true)/2)+'px'},0)
    //会员登陆注册找回密码窗口垂直居中start
    
    //工业厂房分类切换start
	$('.industrual a').click(function(){
		SwitchCard(".industrual a", ".industrual_select ul ", "cxhover", $(this));
	});
	$('.industrual a').eq(0).trigger("click");
	//工业厂房分类切换end

    //房源详情切换start
    $('.detail_depict ul li a').click(function(){
		SwitchCard(".detail_depict ul li a", ".depict_all .depict_01", "cxhover", $(this));
	});
	$('.detail_depict ul li a').eq(0).trigger("click");
	//房源详情切换end
	
	//发布房源start
    $('dd.fylx a').click(function(){
		SwitchCard("dd.fylx a", ".tbRentType", "currentA", $(this));
		$("input[class=input-fylx]").val($(this).attr("radio-value"));
	});
	$('dd.fylx a').eq($("input[class=input-fylx]").val()).trigger("click");
	//发布房源end
	
	//公用切换卡start
	function SwitchCard(tab,con,addClass,obj){
		var $_self = obj;
		var $_nav = $(tab);
		$_nav.removeClass(addClass),
		$_self.addClass(addClass);
		var $_index = $_nav.index($_self);
		var $_con = $(con);
		$_con.hide(),
		$_con.eq($_index).show();
    }
    //公用切换卡end
    
    //房源详情大图切换start
	var last,
	bigPic = $('#bigPic'),
	bigPiclist = $('#bigPiclist');
	var changeImg = function(el){
		var url = $(el).attr('data-src');
		if(last){
			$(last).removeClass('cur');
		};
		$(el).addClass('cur');
		bigPic.css('backgroundImage','url(' + url + ')');
		last = el;
	};
	bigPiclist.bind('click',function(event){
		var e = event || window.event,
		tar = e.target || e.srcElement;
		if($(tar).attr('data-src')){
			changeImg(tar);
		};
	});
	changeImg(bigPiclist.find('li')[0]);
    //房源详情大图切换end
    
    //房源详情弹出模态框start
    $('a[data-action="edit"]').on('click', function(ev){
		ev.preventDefault();
		$("#gallery-image-modal").modal('show');
	});
	//房源详情弹出模态框end
    
    //房源详情星级评分start
    $('.function-demo').each(function(i){
		var Game = [
			{
				range : ['房源根本不存在或与介绍完全不符','房源存在，但实际价格与介绍有一定差距','房源介绍与实际情况略有出入','房源介绍与实际情况基本一致','房源介绍与实际情况完全一致']
			},
			{
				range : ['态度非常恶劣','服务态度有待改进，不够积极','态度积极，整体服务基本满意','服务到位，态度友好','积极热情，服务周到且及时']
			},
			{
				range : ['不够专业，不熟悉交易贷款流程','业务不熟悉，无法解决问题','还可以，基本能够解决我的问题','比较专业，业务熟悉，对我有帮助','积极热情，非常优秀，能提供专业建设及购房及计划']
			}
		]
	    $(this).raty({
	    	number: 5,//多少个星星设置     
      		targetType: 'hint',//类型选择，number是数字值，hint，是设置的数组值
			score: 3,//默认显示多少个星
			path      : 'img',
			cancelOff : 'ico11off.png',
			cancelOn  : 'ico10.png',
			size      : 12,
			starHalf  : 'ico11.png',
			starOff   : 'ico11off.png',
			starOn    : 'ico10.png',
			cancel    : false,
			targetKeep: true,
			scoreName: 'entity[score]',
			hints     : ['1分 不合格', '2分 还差点', '3分 合格', '4分 优秀', '5分 非常优秀'],
			htmls  	  : Game[i].range
	    });
	    
    });
    //房源详情星级评分end
    
    //房源详情评价start
    $('.evaluate_b span').on('click', function(ev){
    	$(this).addClass("hover").siblings().removeClass("hover");
		$(this).nextAll("input[type=hidden]").val($(this).attr("radio-value"))
	});
	 $('.evaluate_b span').eq(1).trigger("click");
    //房源详情评价end
    
    //发布房源出租方式start
    $('dd.czfs a').on('click', function(ev){
    	$(this).addClass("currentA").siblings().removeClass("currentA");
    	var obj = $(this).attr("radio-value");
    	$("input[class=input-czfs]").val(obj);
    	$("dl.zhuzai-input[option-value]").each(function(){
			if($(this).attr("option-value")==obj){
				$(this).show();
			}else{
				$(this).hide();
			}
		})
    	
	});
	 $('dd.czfs a').eq($("input[class=input-czfs]").val()).trigger("click");
    //发布房源出租方式end    
});
