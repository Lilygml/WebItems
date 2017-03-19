/*
 item.jd.com Compressed by uglify 
 Author:keelii 
 Date: 2014-04-24 
 */
(jQuery),
function(t) {
	t.fn.jqueryzoom = function(e) {
		var i = {
			xzoom: 200,
			yzoom: 200,
			offset: 10,
			position: "right",
			lens: 1,
			preload: 1
		};
		e && t.extend(i, e);
		var s = "";
		t(this).hover(function() {
			function e(t) {
				this.x = t.pageX,
				this.y = t.pageY
			}
			var a = t(this).offset().left,
			n = t(this).offset().top,
			o = t(this).find("img").get(0).offsetWidth,
			r = t(this).find("img").get(0).offsetHeight;
			s = t(this).find("img").attr("alt");
			var c = t(this).find("img").attr("jqimg");
			t(this).find("img").attr("alt", ""),
			//0 == t("div.zoomdiv").get().length && (t(this).after("<div class='zoomdiv'><img class='bigimg' src='" + c + "'/></div>"), t(this).append("<div class='jqZoomPup'>&nbsp;</div>")),
			t("div.zoomdiv").width(i.xzoom),
			t("div.zoomdiv").height(i.yzoom),
			t("div.zoomdiv").show(),
			i.lens || t(this).css("cursor", "crosshair"),
			t(document.body).mousemove(function(s) {
				mouse = new e(s);
				var c = t(".bigimg").get(0).offsetWidth,
				d = t(".bigimg").get(0).offsetHeight,
				l = "x",
				p = "y";
				if (isNaN(p) | isNaN(l)) {
					var p = c / o,
					l = d / r;
					t("div.jqZoomPup").width(i.xzoom / (1 * p)),
					t("div.jqZoomPup").height(i.yzoom / (1 * l)),
					i.lens && t("div.jqZoomPup").css("visibility", "visible")
				}
				xpos = mouse.x - t("div.jqZoomPup").width() / 2 - a,
				ypos = mouse.y - t("div.jqZoomPup").height() / 2 - n,
				i.lens && (xpos = a > mouse.x - t("div.jqZoomPup").width() / 2 ? 0 : mouse.x + t("div.jqZoomPup").width() / 2 > o + a ? o - t("div.jqZoomPup").width() - 2 : xpos, ypos = n > mouse.y - t("div.jqZoomPup").height() / 2 ? 0 : mouse.y + t("div.jqZoomPup").height() / 2 > r + n ? r - t("div.jqZoomPup").height() - 2 : ypos),
				i.lens && t("div.jqZoomPup").css({
					top: ypos,
					left: xpos
				}),
				scrolly = ypos,
				t("div.zoomdiv").get(0).scrollTop = scrolly * l,
				scrollx = xpos,
				t("div.zoomdiv").get(0).scrollLeft = scrollx * p
			})
		},
		function() {
			t(this).children("img").attr("alt", s),
			t(document.body).unbind("mousemove"),
			i.lens && t("div.jqZoomPup").remove(),
			t("div.zoomdiv").remove()
		})
	}
} (jQuery);
NotifyPop = {
	init: function(t, e, i) {}
};
if ($(function() {
	if ($(".jqzoom").jqueryzoom({
		xzoom: 400,
		yzoom: 400,
		offset: 10,
		position: "left",
		preload: 1,
		lens: 1
	}),
	function() {
		var t = $("#spec-list li");
		t.find("img").eq(0).addClass("img-hover"),
		t.mouseover(function() {
			var e = $(this).find("img"),
			i = e.attr("src");
			t.index($(this)),
			$("#spec-list img").removeClass("img-hover"),
			e.addClass("img-hover"),
			$("#spec-n1 img").eq(0).attr({
				src: i.replace("/n5/", "/n1/"),
				jqimg: i.replace("/n5/", "/n0/")
			})
		})
	} (), $(".spec-items").imgScroll({
		visible: 5,
		speed: 200,
		step: 1,
		loop: !1,
		prev: "#spec-forward",
		next: "#spec-backward",
		disableClass: "disabled"
	})) {}
})) {}