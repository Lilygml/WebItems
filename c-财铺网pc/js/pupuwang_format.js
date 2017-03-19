/**
业态选择控件
基于jQuery
*/
var format_main = format_main || false;
//业态选择
$(function(){
	//激活选择框
	$(document).on("click", '.onformat', function(){
		var name = $(this).find("input[type='hidden']").attr("name");
		$("#formatbox").data('name',name);
		var pop=$('.format-pop');
		$.pop({container:pop,closeButton:$('.big-close,.j-cancle',pop)}); 
	});
	//数据选择
	$(document).on("click", '#formatbox li.list a', function(){
		var value = $(this).attr('value');
		var title = $(this).text();
		var name  = $("#formatbox").data('name');
		$("input[name='"+name+"']").val(value);
		$("input[name='"+name+"']").prev().text(title);
		$("#formatbox .big-close").trigger("click");
	});
	//数据清除
	$(document).on("click", '#formatbox a.clearFormat', function(){
		var name  = $("#formatbox").data('name');
		$("input[name='"+name+"']").val('');
		$("input[name='"+name+"']").prev().text('选择业态');
		$("#formatbox .big-close").trigger("click");
	});	
	//数据初始化
	if($(".onformat").length>0){
		$.ajax({
			type: "GET",
			url: FORMAT_DNS+'database/format',
			dataType: "jsonp",
			async: false,
			jsonp: 'jsonpcallback',
			success: function(data){
				if(data.status==1){
					var lhtml = '';
					$.each(data.data,function(k,v){
						lhtml += '<li class="list"><span class="title">';
						if(format_main){
							lhtml += '<a value="'+k+'">'+v.name+'</a>';
						}else{
							lhtml += v.name;
						}
						lhtml += '</span>';
						
						$.each(v.list,function(k1,v1){
							lhtml += '<a value="'+k1+'">'+v1+'</a>';
						});
						lhtml += '</li>';
					});
					var bhtml = '<div class="modal format-pop hide" id="formatbox" style="width:700px;height:600px;overflow:auto"><div class="header"><b class=" ico big-close"></b>';
					bhtml += '<h4 class="title">所有行业&nbsp;&nbsp;[<a href="javascript:;" class="clearFormat">清空</a>]</h4></div><div class="body bodyadd"><ul>'+lhtml+'</ul></div></div>';
					$("body").append(bhtml);
					
					//默认值
					$.each($(".onformat"),function(i,v){
						var value = $(this).find("input[type='hidden']").val();
						if(value){
							var valArr = value.split(',');
							var thtml  = '';
							$.each(valArr,function(i1,v1){
								var text = $("#formatbox .body a[value='"+v1+"']").text();
								thtml = text+','+thtml;
							});						
							thtml = thtml.substr(0,(thtml.length-1));
							$(this).find("i").text(thtml);
						}
					});
				}
			}
		});
	}
});

//可考虑区域选择
$(function(){
	//激活区域选择弹出层
	$(document).on("click", '.ondistricts', function(){
		var name = $(this).find("input[type='hidden']").attr("name");
		var value = $(this).find("input[type='hidden']").val();
		var vData = value.split(',');
		$("#districtsbox .sup-title a").remove();
		$.each(vData,function(i,v){
			$("#districtsbox .list a[value='"+v+"']").trigger("click");
		});
		$("#districtsbox").data("name",name);
		var pop=$('.format-pop-area');
		$.pop({container:pop,closeButton:$('.big-close,.j-cancle',pop)});
	});
	//点击选中
	$(document).on("click", '#districtsbox .list a', function(){
		var value = $(this).attr("value");
		var title = $(this).text();
		var checkData = $("#districtsbox .sup-title a");
		if(checkData.length>=3){
			alert("最多只能选择3个区域！");
			return false;
		}
		var vs = true;
		$.each(checkData,function(i,v){
			if($(v).attr("value")==value){
				vs = false;
			}
		});
		if(vs){
			$("#districtsbox .gray").after('<a class="inline-block" value="'+value+'">'+title+'<b class="close"></b></a>');
		}
	});
	//删除选中
	$(document).on("click", '#districtsbox .sup-title a', function(){
		$(this).remove();
	});
	//确定选中
	$(document).on("click", '#districtsbox .footer a', function(){
		var name = $("#districtsbox").data("name");
		var checkData = $("#districtsbox .sup-title a");
		var value = '',title='';

		if(checkData.length>0){
			$.each(checkData,function(i,v){
				value = $(v).attr("value")+','+value;
				title = $(v).text()+','+title;
			});
		}else{
			title = '点击选择,';
		}
		
		value = value.substr(0,(value.length-1));
		title = title.substr(0,(title.length-1));
		$("input[name='"+name+"']").val(value);
		$("input[name='"+name+"']").prev().html(title);
		$("#districtsbox .big-close").trigger("click");
	});
	//区域数据初始化
	if($(".ondistricts").length>0){
		var code = $(".ondistricts").attr("value");
		$.ajax({
			type: "GET",
			url: FORMAT_DNS+'database/districts?code='+code,
			dataType: "jsonp",
			async: false,
			jsonp: 'jsonpcallback',
			success: function(data){
				if(data.status==1){
					var lhtml = '';
					$.each(data.data,function(k,v){
						lhtml += '<a value="'+k+'">'+v+'</a>';
					});
					var bhtml = '<div class="modal format-pop-area hide" id="districtsbox"><div class="header"><b class=" ico big-close"></b><h4 class="title">区域选择:</h4></div>';
					bhtml += '<div class="body clearfix"><h4 class="sup-title"><span class="gray">已选中区域：</span></h4>';
					bhtml += '<ul><li class="list"><span style="width:auto;" class="title">区域:</span>';
					bhtml += lhtml;
					bhtml += '</li></ul></div><div class="footer">';
					bhtml += '<a class="button orage" href="javascript:void(0);">选择好了</a></div></div>';
					$("body").append(bhtml);
					
					//默认值
					$.each($(".ondistricts"),function(i,v){
						var value = $(this).find("input[type='hidden']").val();
						if(value){
							var valArr = value.split(',');
							var thtml  = '';
							$.each(valArr,function(i1,v1){
								var text = $("#districtsbox .body .list a[value='"+v1+"']").text();
								thtml = text+','+thtml;
							});						
							thtml = thtml.substr(0,(thtml.length-1));
							$(this).find("i").text(thtml);
						}
					});
				}
			}
		});																										
	}
});