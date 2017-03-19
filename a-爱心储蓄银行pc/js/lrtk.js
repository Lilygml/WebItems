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

});
