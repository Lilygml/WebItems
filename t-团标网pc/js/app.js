$(function(){
	$(".btnmenu").hover(function(){
		$(this).find(".sidemenu").show();
	},function(){
		$(this).find(".sidemenu").hide();
	})
	$(".sidemenu > ul > li").hover(function(){
		$(this).addClass("on");
		$(this).find(".subCate").show();
	},function(){
		$(this).removeClass("on");
		$(this).find(".subCate").hide();
	});
	
	//星级评分start
    $('.function-demo').each(function(i){
	    $(this).raty({
	    	number: 5,//多少个星星设置     
      		targetType: 'number',//类型选择，number是数字值，hint，是设置的数组值
			score: 3,//默认显示多少个星
			path      : 'img',
			cancelOff : 'ico11off.png',
			cancelOn  : 'ico10.png',
			size      :  12,
			starHalf  : 'ico11.png',
			starOff   : 'ico11off.png',
			starOn    : 'ico10.png',
			cancel    : false,
			targetKeep: false,
			scoreName: 'entity[score]',
			hints     : ['', '', '', '', '']
	    });
    });
    //星级评分end
})