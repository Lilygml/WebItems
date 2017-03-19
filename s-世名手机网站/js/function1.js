// JavaScript Document
$(document).ready(function(){
	$("select#atlaset").click(function(){
		$("#atla_color").css("background-color",$(this).find("option:selected").val());
	})
});