function get_child(a,b){
  $("#"+b).html("<option value>--please--</option>");
   $('#region_id').html("<option value>--please--</option>");
  $.post("?app=region",{rid:a},function(result){
    
  $("#"+b).html(result);


  
 });
}
function submitform(a,b){
  var m="确定"+b+"吗？";
var r=confirm(m);
if (r==true)
  {
    document.getElementById(a).submit();
    exit;
    }else{

      return false;
    }

}

function CheckAll(obj,b) {
len = document.myform.elements.length;
var i;
for (i=0; i < len; i++) {
   if (document.myform.elements[i].name==b+'[]') {
    document.myform.elements[i].checked=document.myform.selectAll.checked;
   }
}
if(obj.checked) {
   document.myform.selectedInverse.checked = false ;
}
}
function Reverse(obj,b) {
  
len = document.myform.elements.length;
var i;
for (i=0; i<len; i++) {
   if (document.myform.elements[i].name==b+'[]') {
    document.myform.elements[i].click();
   }
}
if(obj.checked) {
   document.myform.selectAll.checked = false ;
}
}

// JavaScript Document
function selectAllDels(a,b) 
{ 

var allCheckBoxs = document.getElementsByName(b); 
var desc = document.getElementById(a); 
var selectOrUnselect=false; 
for(var i = 0; i < allCheckBoxs.length; i ++ ) 
{ 
if(allCheckBoxs[i].checked){ 
selectOrUnselect=true; 
break; 
} 
} 
if (selectOrUnselect) 
{ 
_allUnchecked(allCheckBoxs); 
}else 
{ 
_allchecked(allCheckBoxs); 
} 
} 
function _allchecked(allCheckBoxs){ 
for(var i = 0; i < allCheckBoxs.length; i ++ ) 
{ 
allCheckBoxs[i].checked = true; 
} 
} 
function _allUnchecked(allCheckBoxs){ 
for(var i = 0; i < allCheckBoxs.length; i ++ ) 
{ 
allCheckBoxs[i].checked = false; 
} 
} 
//显示修改管理员

function SubmitForm(a,b){

  if (confirm(b))
  {
  document.getElementById(a).submit();
  }
  else
  {
  return false;
  }
}
function del_data(a,b){


   swal({
                        title: "您确定要删除吗？",
                        text: "您确定要删除数据？",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "是的，我要删除",
                        confirmButtonColor: "#ec6c62"
                    }, function() {
                       $.post(a,{id:b},function(result){
     swal({title:result,showConfirmButton:false,timer: 2000});
    window.location.reload();
     });
                    });



}

function GobBackGoods(a,b){


   swal({
                        title: "您确定要还原吗？",
                        text: "您确定要还原数据？",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "是的，我要还原",
                        confirmButtonColor: "#ec6c62"
                    }, function() {
                       $.post(a,{id:b},function(result){
     swal({title:result,showConfirmButton:false,timer: 2000});
    window.location.reload();
     });
                    });

}
function DelData(a,b){
 var r=confirm("确定删除吗？");
if (r==true)
  {
    $.post(a,{id:b},function(result){
     alert(result);
    window.location.reload();
     });}

}
function UpdtateData(url,value,id){
  var r=confirm("确定此操作吗？");
if (r==true)
  {
    $.post(url,{id:id,v:value},function(result){
     alert(result);
    window.location.reload();
     });}
}
//通过数据库查询管理员资料

//弹出警告窗口
function Fconfirm(text1,spage){
  if (confirm(text1))
  {
  location = spage;
  }
  else
  {
  return false;
  }
}
function selectAll2(o,obj){
    
    if(obj=="checkboxes2"){
      $("input[class=checkboxesno2]").attr("checked",false); 
    }else{
      $("input[class=checkboxes2]").attr("checked",false); 
    }
    if(o.checked){
      $("input[class="+obj+"]").attr("checked",true);  
    }else{ 
      $("input[class="+obj+"]").attr("checked",false);   
    }
    if(obj=="checkboxes1"){
      $("input[class=checkboxesno1]").attr("checked",false); 
    }else{
      $("input[class=checkboxes1]").attr("checked",false); 
    }
    if(o.checked){
      $("input[class="+obj+"]").attr("checked",true);
    }else{ 
      $("input[class="+obj+"]").attr("checked",false); 
    } 
  };
  function selectAll3(o,obj,obj2,obj3){
    if(obj==obj2){
      $("input[box-value="+obj3+"]").attr("checked",false); 
    }else{
      $("input[box-value="+obj2+"]").attr("checked",false); 
    }
    if(o.checked){
      $("input[box-value="+obj+"]").attr("checked",true);
    }else{ 
      $("input[box-value="+obj+"]").attr("checked",false);
    } 
  };
  $(function(){
      $('.data_Area ul li .area_top > span').on('click', function (e) {
        
          var children = $(this).parent().parent().find('ul > li.area_li');
          
          if (children.is(":visible")) {
              children.hide('fast');
              $(this).find(' > i').html('＋');
             
          } else {
              children.show('fast');
              $(this).find(' > i').html('－');
          }
          
      });
  });

function SendMes(a,b,c){
 var r=confirm("是否短信及邮箱通知");
 var  checkid=$('#IfAudit2_'+b).val();
 if (r==true)
  {
$.post('?app=sms&act=InfromMes',{tid:a,id:b,ID:c,cid:checkid},function(result){
    alert('已经通知');
   });

}

}
function PassCheck(a,b){

var r=confirm("确定此操作吗？");
 var  checkid=$('#ReasonMes').val();
if (r==true)
  {
$.post('?app=sms&act=ServiceBase',{ID:b,ifid:a,cid:checkid},function(result){
    alert('已经通知');
    
 
     });
window.location.reload();

}

}

function PassCheckWsq(a,b,c){
var r=confirm("确定此操作吗？");
 var  checkid=$('#ReasonMes').val();
if (r==true)
  {
$.post('?app=sms&act=ServiceWsq',{ID:b,BID:c,ifid:a,cid:checkid},function(result){
    alert('已经通知');

 
     });
window.location.reload();

}


}
function ShowGou(a){

$.post('?app=link_goods&act=GetGou',{GID:a},function(result){

  $('#GouJian').html(result);
})
}

function getAttrHtml(a,b){

if (a==1) {
  document.getElementById('base_goods_part').style.display='none';
  document.getElementById('base_goods_optional').style.display='none';
  document.getElementById('base_goods_copymachine').style.display='block';
  document.getElementById('base_goods_paper').style.display='none';
  document.getElementById('base_goods_expend').style.display='none';
   document.getElementById('base_goods_other').style.display='none';
};
if (a==2) {

  document.getElementById('base_goods_part').style.display='none';
document.getElementById('base_goods_optional').style.display='block';
  document.getElementById('base_goods_copymachine').style.display='none';
  document.getElementById('base_goods_paper').style.display='none';
  document.getElementById('base_goods_expend').style.display='none';
   document.getElementById('base_goods_other').style.display='none';
};
if (a==3) {

  document.getElementById('base_goods_part').style.display='block';
document.getElementById('base_goods_optional').style.display='none';
  document.getElementById('base_goods_copymachine').style.display='none';
  document.getElementById('base_goods_paper').style.display='none';
  document.getElementById('base_goods_expend').style.display='none';
   document.getElementById('base_goods_other').style.display='none';
};

if (a==4) {

 document.getElementById('base_goods_part').style.display='none';
document.getElementById('base_goods_optional').style.display='none';
  document.getElementById('base_goods_copymachine').style.display='none';
  document.getElementById('base_goods_paper').style.display='none';
   document.getElementById('base_goods_other').style.display='none';
  document.getElementById('base_goods_expend').style.display='block';

};
if (a==5) {
 document.getElementById('base_goods_part').style.display='none';
document.getElementById('base_goods_optional').style.display='none';
  document.getElementById('base_goods_copymachine').style.display='none';
  document.getElementById('base_goods_paper').style.display='block';
  document.getElementById('base_goods_expend').style.display='none';
   document.getElementById('base_goods_other').style.display='none';

};
if (a==6) {

  document.getElementById('base_goods_part').style.display='none';
document.getElementById('base_goods_optional').style.display='none';
  document.getElementById('base_goods_copymachine').style.display='none';
  document.getElementById('base_goods_paper').style.display='none';
  document.getElementById('base_goods_expend').style.display='none';
 document.getElementById('base_goods_other').style.display='block';
};
}
function searchGoods(a,b,c,d){
var cat_id=$('#'+a).val();
var Brand_ID=$('#'+b).val();
var Type_ID=$('#'+c).val();
var goods_name=$('#'+d).val();

$.post('?app=link_goods&act=search',{CID:cat_id,BrandID:Brand_ID,TID:Type_ID,GNM:goods_name},function(result){

  $('#select1').html(result);
})
}

function AjaxSubInfo(a){
	$("#"+a).ajaxSubmit(function(message) {//message yon  type  [1:success] url[ture |flase  goback ] msg[] 
	  var result=eval('('+message+')');
	  if (result.tp) {
		showMsg(result.msg,result.tp);
	  }else{
	  
		showMsg(result.msg);
	  }
	
	
	});  
	  return false;
	
	}
function showMsg(msg,type) {
 
		if (type) {
			swal({
				title: "",
				text: msg,
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
		} else {
			swal({
				title: "",
				text: msg,
				type: "error",
				timer: 2000,
				showConfirmButton: false
		  });
		}
	}
	
	 function showConfirmMsg(type, msg,url) {
		swal({
			title: "",
			text: msg,
			type: "success",
			showCancelButton: false,
			closeOnConfirm: false,
			confirmButtonText: "确认",
			confirmButtonColor: "#ec6c62"
		}, function () {
			if (type == 1) {
				window.location.href = url;
			} else if (type == 2) {
				window.location.href = url;
			}
		});
	}

  function AjaxSubGood(a,b){
$("#"+a).ajaxSubmit(function(message) {
result =message.split(",");
 if (result[1]==1) {

  showMsg(result[0],result[1]);
 };
 if (result[1]==0) {
  showMsg(result[0]);
 };
});  
  return false;
}
function AddSpec(a,b){

  msg=$('#'+a).html();
    swal({
		title: msg,
		text: "这里可以输入并确认:",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputPlaceholder: "填写到这里面"
	}, function(inputValue) {
		if (inputValue === false)
			return false;
		if (inputValue === "") {
			swal.showInputError("请输入!");
			return false
		}
			PostAjax(a,inputValue);
			
		
	   $('#'+b).append('<option o value='+inputValue+'>'+inputValue+'</option>');
	   showMsg('添加成功',1);
   
	});
}

function PostAjax(a,b){
 
     $.post("?app=goods_type&act=AddAttrAjax",{Index:a,Value:b},function(result){

        if (result) {
            return true;
        }else{

            return false;
        }
    
   });
}


