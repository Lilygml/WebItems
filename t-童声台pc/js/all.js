function changeDiv(nowNum,totalNum){	
	for ( var i=1;i<=totalNum;i++){	
		document.getElementById("bt_"+i).className = "";
	}		
	document.getElementById("bt_"+nowNum).className="on";
}


function changeDiv2(nowNum,totalNum){	
	for ( var i=1;i<=totalNum;i++){	
		document.getElementById("msg"+i).style.display= "none";
		document.getElementById("btn"+i).className="";
	}		
	document.getElementById("msg"+nowNum).style.display="block";
	document.getElementById("btn"+nowNum).className="cur";
}
/*还可以输入多少字*/
function checktext(text)
{
    allValid = true;
    for (i = 0;  i < text.length;  i++)
    {
      if (text.charAt(i) != " ")
      {
        allValid = false;
        break;
      }
    }
return allValid;
}

function gbcount(message,total,used,remain)
{
  var max;
  max = total.value;
  if (message.value.length > max) {
  message.value = message.value.substring(0,max);
  used.value = max;
  remain.value = 0;
 <!-- alert("留言不能超过 200 个字!");-->
 alert("不能超过"+total.value+"个字!");
  }
  else {
  used.value = message.value.length;
  remain.value = max - used.value;
  }
}
$(function(){
	$(".classnav-list-left > ul > li").hover(function(){
		$(this).addClass("hover")
		$(this).find(".classnav-nlit").show();
		
	},function(){
		$(this).removeClass("hover");
		$(this).find(".classnav-nlit").hide();
	})
})

