// JavaScript Document
$(document).ready(function(){
	$("#form1").validationEngine();
  	$(".nav-class dd.xjt").live("click",function(){
		$(this).toggleClass("sjt");
		$(this).prev().find("ul").toggleClass("nchover");
 	});
	
	$("#menu_moblie_icon").click(function(){
  		$(this).next().toggle(500);
		$(this).parent().parent().next(".nav-class").toggleClass("nav-borss");
  	});

  var glide=$(".slider").glide({
	  afterTransition:function(){
		  var a=this.currentSlide;console.log(a)
	  }
  }).data("api_glide");
  $(window).on("keyup",function(a){
	  if(a.keyCode===13){
		  glide.jump(3,console.log("Wooo!"))
	  }
  });
	
});