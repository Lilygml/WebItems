// JavaScript Document
/*
* 地图类
* city 初始默认城市
* longitude 初始经度
* latitude 初始纬度
* id 地图显示id 默认为pupuwangmap
*/
function ppwMap(address,longitude,latitude,seach,wheel,id){
	this.address = address;
	this.id = id || "pupuwangmap";
	this.longitude = longitude || '';
	this.latitude = latitude || '';
	this.seach = seach ||0;       //覆盖层是否需要查公交路线
	this.wheelzoom = wheel || 1  ; //是否可以缩放
	this.init();//初始地图	
}
ppwMap.prototype = {
	init:function(){
		this.map = new BMap.Map(this.id);
		if(this.longitude !=0){
			var point = new BMap.Point(parseFloat(this.longitude),parseFloat(this.latitude));
			this.point = point;
		}else{
			this.point = this.address;
		}
		this.zoom();
		if(this.id){
			this.map.enableScrollWheelZoom(); 
		}
	} ,
	zoom:function(){
		this.map.centerAndZoom(this.point,15);  
	},
	marker:function(){
		this.marker  = new BMap.Marker(this.point); 	
		this.map.addOverlay(this.marker);  
	},
	searchinfowindow:function(content,title){
		var _this =this;
		var setting = 
		{
			title  : title,           //标题
			         //高度
			panel  : "panel",         //检索结果面板
			enableAutoPan : true   //自动平移
		};
		if(content){
			setting.width  = 290;          //宽度
			setting.height = 105;
			}   
		if(this.seach){
			setting.searchTypes = [
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			];
		}else{
			setting.searchTypes=[];
		}
		var searchInfoWindow = new BMapLib.SearchInfoWindow(this.map, content, setting);
		this.opentwindow = this.opentwindow || 0;
		if(this.opentwindow){
			searchInfoWindow.open(_this.marker);
		}
	
		this.marker.addEventListener("click", function(e){
	    	searchInfoWindow.open(_this.marker);
   		 });
	},
	simpleinfo:function(text){
		var _this = this;
		this.infoWindow = new BMap.InfoWindow(text);
		this.marker.addEventListener("click",function(){this.openInfoWindow(_this.infoWindow)});
	},
	addpoint:function(longitude,latitude){
		var point = new BMap.Point(parseFloat(longitude),parseFloat(latitude));
		this.point = point;
		this.marker();
	},
	mapto:function(city){
		_this = this;
		this.local = new BMap.LocalSearch(this.map, {
		 	onSearchComplete: function(){_this.searchcity();}
		});
		this.local.search(city);
	},
	searchcity:function(){
		var pp = this.local.getResults().getPoi(0).point;
		this.point = pp;
   		this.zoom();
	},
	createpoint:function(e){
		return newpoint = new BMap.Point(e.point.lng, e.point.lat);
	}
	
};

//列表地图
//显示地图 @shop_date json 
var openwindow= new Array();
function  choicemap (shop_data){
	var map = new BMap.Map("l-map"); 
	var points =  new Array();
	var ii =0;
	var poiq = {};
	var poi = new Array();
	$.each(shop_data,function(i,v){
		points[ii] = new BMap.Point(v.longitude,v.latitude);
		poi[ii]={
			title:v.shop_name,
			address:v.address,
			name:v.shop_name,
			telephone:v.telphone,
			feature:v.feature,
			img_url:v.img_url,
			shop_id:v.shop_id
		};
		ii++;
	});
	
	var mar ={};
	$.each(points,function(i,v){
			mar.i = addMarker(points[i],i,map);
			openwindow[i] = addInfoWindow(mar.i,poi[i],map);
	});
	
	map.centerAndZoom(points[6], 16);     
	map.enableScrollWheelZoom();             // 初始化地图，设置中间点坐标和地图级别
	map.addControl(new BMap.NavigationControl());      //为地图添加鱼骨
	map.setViewport(points);
}

//添加marker
function addMarker(point, index, map){
  var myIcon = new BMap.Icon("http://ui.echiele.com/img/ppwmap.png", new BMap.Size(23, 25), {
    offset: new BMap.Size(10, 25),
    imageOffset: new BMap.Size(0, 0 - index * 25)
  });
  var marker = new BMap.Marker(point, {icon: myIcon});
  map.addOverlay(marker);
  return marker;
}

// 添加信息窗口
function addInfoWindow(marker,poi,map){
	var setting = 
	{
		title  : "<a href='/shop?id="+poi.shop_id+"' target='_blank'>"+poi.title+"</a>",           //标题
		width  : 290,             //宽度
		height : 105,             //高度
		panel  : "panel",         //检索结果面板
		enableAutoPan : true ,  //自动平移
		searchTypes:[
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
				]
	};
	 var content = "<div style='margin:0;line-height:20px;padding:2px;'>" +
	"<a href='/shop?id="+poi.shop_id+"' target='_blank'><img src='"+poi.img_url+"' alt='"+poi.title+"' style='float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;'/></a>" +
	"电话："+poi.telephone+"<br/>地址：<a href='/shop?id="+poi.shop_id+"' target='_blank'>"+poi.address+"</a><br/>特色：<a href='/shop?id="+poi.shop_id+"' target='_blank'>" +poi.feature+
	"</a></div>";	
	var openInfoWinFun = function(e){
		searchInfoWindow.open(marker);
	 };
	var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, setting);
	marker.addEventListener("click", openInfoWinFun);
	return openInfoWinFun;
}