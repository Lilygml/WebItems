// JavaScript Document
	function imgshow(imgstr){
		var imgstrg=imgstr.split(", ");
		var imgcount2=imgstrg.length-1;//返回选中图片数量
		
		var sint=0;//开始位置
		var oint=0;//结束位置
		var	imgcount=0;//图片数量
		var outtext="";//待输出文本
		var oEditor = CKEDITOR.instances.sprofile;
		var text1= html = oEditor.getData();
		var text2=text1.split("<img");
		imgcount=text2.length-1;//返回图片数目
				//$("#err1").html(imgcount+"张图片");//返回图片数目
		for(i=0;i<imgcount;i++)
		{
			sint=text1.indexOf('src="',sint)+5;
			oint=text1.indexOf('"',sint);
			outtext=outtext+"<option value='"+text1.substring(sint,oint)+"'";
			for(j=0;j<=imgcount2;j++)
			{
				if(text1.substring(sint,oint)==imgstrg[j]){
					outtext=outtext+" selected='selected'";
					}
					//document.write (imgstrg[j]+"<br />");
					//document.write (text1.substring(sint,oint)+"<br />");
				}
			outtext=outtext+">"+text1.substring(sint,oint)+"</option>";
		}
				
		if(outtext!=""){
			outtext="<select name='imgselect' id='imgselect' multiple>"+outtext;
			outtext=outtext+"</select>";
			outtext=outtext+"小提示：按住CTRL键，进行多选。<br />这里选中的图片将做为封面显示。"
			$("#selectimg").html(outtext);						
		}
		else
		{
			$("#selectimg").html("");
		}
			return false;	
	}

	$(document).ready(function(){
		$("#imgSub").click(function(){
			var sint=0;//开始位置
			var oint=0;//结束位置
			var	imgcount=0;//图片数量
			var outtext="";//待输出文本
			//var username=$("#g_bt").attr("value");
			//if(username==""){
				//var config = {};
				//var editor, html = '';
				var oEditor = CKEDITOR.instances.sprofile;
				var text1= html = oEditor.getData();
				var text2=text1.split("<img");
				imgcount=text2.length-1;//返回图片数目
				//$("#err1").html(imgcount+"张图片");//返回图片数目
				for(i=0;i<imgcount;i++)
				{
					sint=text1.indexOf('src="',sint)+5;
					oint=text1.indexOf('"',sint);
					outtext=outtext+"<option value='"+text1.substring(sint,oint)+"'>"+text1.substring(sint,oint)+"</option>";
				}
				
				if(outtext!=""){
						outtext="<select name='imgselect' id='imgselect' multiple>"+outtext;
						outtext=outtext+"</select>";
						outtext=outtext+"小提示：按住CTRL键，进行多选。<br />这里选中的图片将做为封面显示。"
						$("#selectimg").html(outtext);						
					}
					else
					{
						$("#selectimg").html("");
					}
				return false;			
			//	} 
		});
});