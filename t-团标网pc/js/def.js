// JavaScript Document

/* detail图片切换 */
	$('body').attr({'data-spy':'scroll','data-target':'#scroll-menu','data-offset':'-450'});
	$(function(){
		
		YL.job.detail.init(378371);
		
		/*表单验证strat*/
		$('#formID,#formID2,#formID3,#formID4').each(function(){
			$(this).validationEngine({
				showOneMessage: true,
				maxErrorsPerField: 1,
				addPromptClass:"formError-noArrow"
			});
		});
		
	});
/* reduce_add商品加减 */
	var setAmount = {
		min:1,
		max:999,
		reg:function(x) {
			return new RegExp("^[1-9]\\d*$").test(x);
		},
		amount:function(obj, mode) {
			var x = $(obj).val();
			if (this.reg(x)) {
				if (mode) {
					x++;
				} else {
					x--;
				}
			} else {
				alert("请输入正确的数量！");
				$(obj).val(1);
				$(obj).focus();
			}
			return x;
		},
		reduce:function(obj) {
			var x = this.amount(obj, false);
			if (x >= this.min) {
				$(obj).val(x);
				recalc();
			} else {
				alert("商品数量最少为" + this.min);
				$(obj).val(1);
				$(obj).focus();
			}
		},
		add:function(obj) {
			var x = this.amount(obj, true);
			if (x <= this.max) {
				$(obj).val(x);
				recalc();
			} else {
				alert("商品数量最多为" + this.max);
				$(obj).val(999);
				$(obj).focus();
			}
		},
		modify:function(obj) {
			var x = $(obj).val();
			if (x < this.min || x > this.max || !this.reg(x)) {
				alert("请输入正确的数量！");
				$(obj).val(1);
				$(obj).focus();
			}
		}
	}
	
	function BuyUrl(wid) {
		var pcounts = $("input[id^=qty_item_]").val();
		var patrn = /^[0-9]{1,4}$/;
		if (!patrn.exec(pcounts)) {
			pcounts = 1;
		}
		else {
			if (pcounts <= 0)
				pcounts = 1;
			if (pcounts >= 1000)
				pcounts = 999;
		}
	}
	;












