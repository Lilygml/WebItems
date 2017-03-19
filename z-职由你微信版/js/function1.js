// JavaScript Document
$(document).ready(function(){
	$(".kn-oselect").click(function(){
		if($(this).next("ul").css("display")!="none"){
			$(this).next("ul").css("display","none");
		}else{
			$(this).next("ul").css("display","block");
		}
		$(this).next("ul").children("li").click(function(){
		  $(this).siblings().removeClass("Default");
		  $(this).addClass("Default");
		  $(this).parent().prev('input').val($(this).text());
		  $(this).parent().hide();
		 })
	})
});