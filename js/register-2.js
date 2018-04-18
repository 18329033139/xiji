$(funtion(){
	var flag1 = true;
	$(".arrow").click(function() {
		/*没有点击时*/
		if(flag1 == true) {
			/*下拉菜单向下滑动出现*/
			$(".dropdown").slideDown().css({
				"border": "1px solid #eb5a41",
				"border-top": "none",
				"border-bottom": "none",
				"background": "white"
			}).next().css("transform", "rotateZ(" + 180 + "deg) translateY(-" + 5 + "px)").parent().css({
				"border": "1px solid #eb5a41",
				"border-bottom": "none"
			});
			/*选择所在国家字体颜色变红*/
			$(".choose").css("color", "#eb5a41");
			flag1 = false;
		} else {
			$(".dropdown").slideUp().next().css("transform", "translateY(" + 0 + "px) rotateZ(" + 0 + "deg)").parent().css("border", "1px solid #e4e4e4");
			$(".choose").css("color", "#a3a3a5");
			flag1 = true;
		}
	});
	var flag2 = true;
	$(".dropdown>li").hover(function() {
		$(this).css("background", "#f4f4f4").siblings().css("background", "white");
	});
	$(".dropdown>li").click(function() {
		$(this).addClass("grey");
		$(".con").html($(this).html()).next().slideUp().next().css("transform", "translateY(" + 0 + "px) rotateZ(" + 0 + "deg)").parent().css("border", "1px solid #e4e4e4");
		$(".choose").css("color", "#a3a3a5");
		flag1 = true;
		if($(this).index() = 0) {
			$(".num-holder").html("请输入手机号");
			$(".isCorrect").hide();
			$(".message").hide();
			flag2 = true;
		} else {
			$(".num-holder").html("请输入邮箱");
			$(".isCorrect").hide();
			$(".message").show();
			flag2 = false;
		}
	});
});
