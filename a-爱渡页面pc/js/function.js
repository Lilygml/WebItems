// JavaScript Document
$(document).ready(function(){
	$("ul div.kn-cmore").live("click",function(){
		var obj=$(this).find("b").html();
		if(obj == "更多"){
		   $(this).find("b").html("收起");
		   $(this).parent("ul.kn-custlive").css('height','auto');
		}else{
		   $(this).find("b").html("更多");
		   $(this).parent("ul.kn-custlive").css('height','54px');
		}
 	});
	$("ul.kn-custlive").each(function(index, element) {
	   $(element).find("li").click(function(){
		 $(element).find("li").removeClass("kn-Default")
		 $(this).addClass("kn-Default")
		 $(element).find("input[type=hidden]").val($(this).attr("value"));
  	   });
    });
	$(".kn-oselect").click(function(){
		if($(this).next("ul").css("display")!="none"){
			$(this).removeClass("kn-Default");
			$(this).find("div").removeClass("kn-droptop");
			$(this).next("ul").css("display","none");
		}else{
			$(this).addClass("kn-Default");
			$(this).find("div").addClass("kn-droptop");
			$(this).next("ul").css("display","block");
		}
		$(this).next("ul").children("li").click(function(){
		  $(this).siblings().removeClass("Default");
		  $(this).addClass("Default");
		  $(this).parent().prev().find("span").text($(this).text());
		  $(this).parent().prev().find("div").removeClass("kn-droptop");
		  $(this).parent().prev().removeClass("kn-Default");
		  $(this).parent().hide();
		 })
	})

   	/*订单信息*/
		
		$("ul.kn-ulPeter").click(function(){	
			var display=true;
			if($(this).next("div").css("display")!="none"){
				display=false;
				$(this).removeClass("kn-default");
				$(this).bind("mouseover",onmouseover);
				$(this).bind("mouseout",onmouseout);
			}else{
				$(this).siblings().bind("mouseover",onmouseover);
				$(this).siblings().bind("mouseout",onmouseout);
				$(this).siblings().removeClass("kn-default");
				$(this).addClass ("kn-default");
				$(this).unbind("mouseover mouseout");
			}
			$("ul.kn-ulPeter input").css("display","none");
			$(this).siblings("div").css("display","none");
			
			if(display){
				$(this).next("div").css("display","block");
				$(this).find("input[type='button']").css("display","block");
			}
			else{
				$(this).next("div").css("display","none");
				$(this).find("input[type='button']").css("display","none");
			}										
		})
		$("ul.kn-ulPeter").bind("mouseover",onmouseover);
		$("ul.kn-ulPeter").bind("mouseout",onmouseout);
		function onmouseover(){
			$(this).addClass("kn-default");
		}
		function onmouseout(){
			$(this).removeClass("kn-default");
		}

/***********************************************************************************/

		$(".metal_table ul li").click(function(){
			$(this).siblings().removeClass("kn-default");
			$(this).addClass ("kn-default");
			$(this).parent().parent().prev().find("i").html($(this).find("img").attr("alt"))
			$(this).parent().parent().prev().find("img").attr("src",$(this).find("img").attr("src"))
			$(this).parents().find(".bigimage img").attr("src",$(this).find("img").attr("data-src"))
			
			$(".kn-Drawing ul li img").each(function(){
				var obj=$(".metal_table ul li.kn-default img").attr("data-src");
				$(this).attr("data-src",obj);
				var name=$(this).parent().attr("cameraname")
			    var src =$(this).attr("data-src");
			    var srt=src.split(".")[0].split("_");
				$(this).attr("data-src",src.replace(srt[srt.length-1],name));
            })
			
		 })
		$(".metal_table ul li").mouseover(function(){
			var $_index = $(".metal_table ul li").index(this);
			$(".ruby1").hide(),
			$(".ruby1").eq($_index).show(); 
		})
		
/***********************************************************************************/

		$("ul.lettering_select1 li").click(function(){
			var input=$(this).parent().prev().find("input[type=text]")
			var type=$(this).children().attr("class")
			if((/^\S{0,11}$/).test(input.val()))
         	{
			   if(type=="heart")
			   {
				  input.val(input.val()+"♥")
			   }else if(type=="and"){
				  input.val(input.val()+"&")
			   }
			}
			if(type == "font_btn"){
			   $(this).parent().parent().prev().removeClass("kn-default");
			   $(this).parent().parent().css("display","none");
			}
			$(this).parent().parent().prev().find("i").html(input.val())
		})
		$(".lettering_select input").keyup(function(){
			$(this).val($(this).val().substring(0,12))	
			$(this).parent().parent().prev().find("i").html($(this).val())
	  	});
		$(".lettering_select select").change(function(){
			$(this).prev().css("fontFamily",$(this).val());
			$(this).parent().parent().prev().find("i").css("fontFamily",$(this).val());
		})
		
/***********************************************************************************/	

		$(".kn-Drawing ul li").click(function(){
			$(this).siblings().removeClass("camselected");
			$(this).addClass ("camselected");
			$(this).parents().find(".bigimage img").attr("src",$(this).find("img").attr("data-src"))
			$(".metal_table ul li img").each(function(){
			   var name=$("li.camselected").attr("cameraname")
			   var src = $(this).attr("data-src");
			   var srt=src.split(".")[0].split("_");
			   $(this).attr("data-src",src.replace(srt[srt.length-1],name));
            })
		})

/***********************************************************************************/	
		
	$(".leftLoop").each(function(e){
	 $(this).slide({
	  mainCell:".bd ul",
	  effect:"leftLoop",
	  vis:"visible",
	  scroll:6,
	  autoPlay:false
 	 });
	})
   $("#form1").validationEngine();
});