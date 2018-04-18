$(function() {
	var isMoving = true;
	var a = $(".djw_xj-content-product-5 .djw_pajing ul li a");
	var lunbo = $(".djw_xj-content-product-5 .djw_holder .djw_goods-list");
	a.mouseenter(function() {
		$(this).addClass("active").parent().siblings().children().removeClass("active");
		if(isMoving) {
			isMoving = true;
			lunbo.stop().animate({
				left: -$("#djw_xj-content-product-5 .djw_holder").width() * $(this).parent().index(),
			}, 500);
		}
		clearInterval(timer);
	})
	a.mouseout(function() {
		timer = setInterval(func, 2000);
	})
	//自动轮播
	var index = 0;
	var timer = setInterval(func, 3000)
	function func() {
		if(index == 5) {
			index = -1;
		}
		index++;
		lunbo.animate({
			left: -1200 * index,
		}, 500)
		for(var i = 0; i < $(".djw_xj-content-product-5 .djw_pajing ul li").length; i++) {
			if(i == index) {
				$(".djw_xj-content-product-5 .djw_pajing ul li").eq(i).find("a").addClass("active").parent().siblings().children().removeClass("active");
			}
		}

	}
	$("#header").load("header.html",function(){
			$.getScript("js/header.js",function() {});
			$.getScript("js/cookie.js",function() {});
			$.getScript("js/jquery.cookie.js",function() {});
		});
		$("#footer").load("footer.html",function(){});      
	
	
	
	
	
	//添加商品时
	var priceArr = [];
	$(".zm_plus-r").click(function(){



		$(this).siblings().eq(1).text(Number($(this).siblings().eq(1).text())+1);
		var price = Number($(this).parent().siblings().eq(0).find("span").text())*Number($(this).siblings().eq(1).text());

		priceArr.push(price);
		$(this).parent().siblings().eq(1).text("￥"+price);
		
		if (flag1) {
			
		}

	});
	
	$(".zm_minus").click(function(){

		if (Number($(this).siblings().eq(0).text())>1) {
			$(this).siblings().eq(0).text(Number($(this).siblings().eq(0).text())-1);

			var price = Number($(this).parent().siblings().eq(0).find("span").text())*Number($(this).siblings().eq(0).text());
			
			priceArr.push(price)
			console.log(priceArr)
			$(this).parent().siblings().eq(1).text("￥"+price);

		}
		if (Number($(this).siblings().eq(1).text()) == 1) {
			$(this).siblings().eq(1).text("1");
			$(this).parent().siblings().eq(1).text("￥"+"268.99");


		}
		
	});

	//勾选
	
	var flagZm = true;
	var flag1 = true;
	$(".zm_good-top span").eq(0).click(function(){
		if (flagZm) {
			$(this).css("background-position","-59px -262px");
			$(".zm_choose-left>span").css("background-position","-59px -262px");

			flagZm = false;
		}else{
			$(this).css("background-position","-78px -262px");
			$(".zm_choose-left>span").css("background-position","-78px -262px");
			flagZm = true;
		}
		
	});
	$(".zm_choose-left>span").click(function(){
		if (flag1) {
			$(this).css("background-position","-59px -262px");
			$(".zm_good-top span").eq(0).css("background-position","-59px -262px");
			
			flag1 = false;
		}else{
			$(this).css("background-position","-78px -262px");
			$(".zm_good-top>span").eq(0).css("background-position","-78px -262px");
			flag1 = true;
		}
	});
	console.log(flag1)
	
})