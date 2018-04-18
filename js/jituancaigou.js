$(function() {

	$(".djw_addProBtn div").click(function() {
		var subtitStyle = $("<div class='proInfo'></div>").append($("<div class='subtitStyle'>采购商品</div>").append("<a class='shanchu' href='javascript:void(0);'></a>"));
		var name = "123";
		var proInfoInner = $("<div class='proInfoInner'></div>").append($("<table cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td width='75' height='70' ><strong>*</strong>商品名称:</td><td colspan='6'><input style='width: 100%;' type='text'></td></tr><tr valign='top'><td width='75'><strong>*</strong>商品名称:</td><td colspan='6'><input style='width: 60%;' type='text'><div class='caption'><span>小贴士</span>: " + name + "</div></td></tr><tr><td width='75' height='70'><strong>*</strong>数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</td><td width='110'><div class='proNum'><a class='upDownBtn over' href='javascript:void(0);'>-</a><input class='number' type='text' value='1'><a class='upDownBtn' href='javascript:void(0);'>+</a></div></td><td style='text-align: right;' width='120'><strong>*</strong> 期望采购单价：</td><td width='130'><div style='width: 90px; float: none;' class='xjExform-selector group-sell-sel '><div class='slide-box'><i class='down'></i><span class='span' title='￥CNY'>￥CNY</span><div class='options-wrapper' style='width: 90px;'><div class='div1'><div class='select-options' style=''><ul class='select-options-ul'><li data-value='￥CNY' data-idx='0'title='￥CNY'class='active2'>￥CNY</li><li data-value='＄USD' data-idx='1' title='＄USD' class=''>＄USD</li><li data-value='€EUR' data-idx='2' title='€EUR' class=''>€EUR</li><li data-value='A＄AUD' data-idx='3' title='A＄AUD' class=''>＄AUD</li><li datavalue='NZ＄NZD' data-idx='4' title='NZ＄NZD'class=''>＄NZD</li><li data-value='￥JPY' data-idx='5' title='￥JPY' class=''>￥JPY</li></ul></div></div></div></div></div></td><td width='20'><input class='input2' type='text' style='padding: 7px 0 7px 5px;'></td><td width='120' style='text-align: right;'><strong>*</strong> 期望到货时间：</td><td width='365'><input onblur='blur' class='rili' type='text'></td></tr></tbody></table>"))
		subtitStyle.appendTo($(".make-pro-block"));
		proInfoInner.appendTo(subtitStyle);
		//删除按钮
		$(".shanchu").click(function() {
			console.log($(this).parent().parent())
			$(this).parent().parent().remove();
		})
		//选择货币
		var s = true;
		$(".slide-box").click(function() {
			if(s == true) {
				$(this).find(".div1").css({
					height: 160
				})
				$(this).find(".span").addClass("active");
				$(this).find(".down").css({
						transform: 'rotateZ(180deg)'
					}),
					$(this).find(".select-options").css({
						margin: 0
					})
			} else {
				$(this).find(".div1").css({
					height: 0
				})
				$(this).find(".span").removeClass("active")
				$(this).find(".down").css({
						transform: 'rotateZ(0deg)'
					}),
					$(".select-options").css({
						margin: "-167px 0 0"
					})
			}
			s = !s;
			$(".select-options-ul li").click(function() {
				console.log($(this).parents());
				console.log($(".span").text());
				
				$(this).parent().parent().parent().parent().parent().find(".span").text($(this).text());
				$(this).addClass("active2").siblings().removeClass("active2");
			}).hover(function() {
				$(this).addClass("active1").siblings().removeClass("active1");
			})
		}).hover(function(){
			$(this).find(".slide-box").css({
				color: "black"
			})
			$(this).find(".down").addClass("up")
		}, function(){
			$(this).find(".slide-box").css({
				color: "#999"
			})
			$(this).find(".down").removeClass("up")
		});
	})
	//删除按钮
	$(".shanchu").click(function() {
		$(this).parent().parent().remove();
	})
	var s = true;
	$(".slide-box").click(function() {
		if(s == true) {
			$(this).find(".div1").css({
				height: 160
			})
			$(this).find(".span").addClass("active");
			$(this).find(".down").css({
					transform: 'rotateZ(180deg)'
				}),
				$(this).find(".select-options").css({
					margin: 0
				})
		} else {
			$(".div1").css({
				height: 0
			})
			$(".span").removeClass("active")
			$(".down").css({
					transform: 'rotateZ(0deg)'
				}),
				$(".select-options").css({
					margin: "-167px 0 0"
				})
		}
		s = !s;
		$(".select-options-ul li").click(function() {
			console.log($(this).text());
			console.log($(".span").text());
			$(this).parent().parent().parent().parent().parent().find(".span").text($(this).text());
			$(this).addClass("active2").siblings().removeClass("active2");
		}).hover(function() {
			$(this).addClass("active1").siblings().removeClass("active1");
		})
	}).hover(function(){
		$(this).find(".slide-box").css({
			color: "black"
		})
		$(this).find(".down").addClass("up")
	}, function() {
		$(this).find(".slide-box").css({
			color: "#999"
		})
		$(this).find(".down").removeClass("up")
	});
	$("#header").load("header.html",function(){
		$.getScript("js/header.js",function() {});
		$.getScript("js/cookie.js",function() {});
		$.getScript("js/jquery.cookie.js",function() {});
	});
	$("#footer").load("footer.html",function(){});
})