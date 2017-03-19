// JavaScript Document
$(document).ready(function(){
	$("#menu-icon").click(function(){
  		$(this).next().toggle(500);
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