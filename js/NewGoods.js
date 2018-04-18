$(function(){
	var dx = 0;
	$(".zm_arrow span").eq(0).click(function(){
		dx += 480;
		if (dx > 480) {
			dx = 0;
		}
		
		$(".zm_images-con").css({
			left: -dx + "px",
		})
		
	})
	
	$(".zm_arrow span").eq(1).click(function(){
		dx -= 480;
		if(dx < -480){
			dx = 0
		}
		$(".zm_images-con").css({
			left:dx + "px",
		})
	})
	
	$(".zm_left-vedio").click(function(){
		$(this).siblings().show();
	})
	$(".zm_vedio span").click(function(){
		$(this).parent().hide()
	})
	
	
	$(".classfly a").mouseover(function(){
		$(this).find(".h1").css("color","red");
		$(this).find(".h2").css("background","red");
		$(this).parent().siblings().find("a").find(".h1").css("color","#656665");
		$(this).parent().siblings().find("a").find(".h2").css("background","#656665");
	})
	
	
	$(".classfly li").click(bigger)
	
	function bigger(obj){
		
		$(this).find(".h1").css("color","#656665").addClass("active");
		$(this).find("a").addClass("a_active");
		$(this).find(".h2").css("background","#656665").addClass("span_active");
		
		$(this).siblings().find("a").removeClass("a_active");
		$(this).siblings().find("a").find(".h1").removeClass("active");
		$(this).siblings().find("a").find(".h2").removeClass("span_active");
		
	
	}
	
	function big(index){
		$(".classfly li").eq(index).find(".h1").css("color","black").addClass("active");
		
				$(".classfly li").eq(index).find("a").addClass("a_active");
				$(".classfly li").eq(index).find(".h2").css("background","black").addClass("span_active");
		
				$(".classfly li").eq(index).siblings().find("a").removeClass("a_active");
				$(".classfly li").eq(index).siblings().find("a").find(".h1").removeClass("active");
				$(".classfly li").eq(index).siblings().find("a").find(".h2").removeClass("span_active");
	}
	big(0)
	//当滚动页面时
	
	


	$(document).scroll(function(){
		$(".zm_side").show();
		$(".zm_victoria-wrap").each(function(i){
			h1 = $(".zm_victoria-wrap").eq(i).height()*i;
			h2 = $(".zm_victoria-wrap").eq(i).height()*(i+1);
			if ($(document).scrollTop() <= h2 && $(document).scrollTop() >= h1) {
				big(i);
				
				if (i > 4) {
					var n = i-4;
					if (n>25) {
						n=25;
					}
					$(".classfly").css({
						top: "-41"*(n)+"px",
					})
					
					$("#bar").css({
						top:"3.9"*(n) + "%",
					})
					
//					$("#bar").mousedown(function(e){
//						var eve = event || e;
//						var y = eve.pageY - $("#bar").offset().top;
//						$("#bar").mousemove(function(e){
//							var ent = event || e;
//							var y1 = ent.pageY -y;
//							console.log(y,y1)
//							$(this).css({
//								top:y + "px",
//							})
//							
//						})
//					})
					
				}
			}
			
			
			
		})
		
	})
	
	

	

	
	
})
$(function(){
	$(".zm_right a").eq(1).attr("href","zhuanchang.html");
})


$(function(){
				$("#header").load("header.html",function(){
					$.getScript("js/header.js",function() {});
					$.getScript("js/cookie.js",function() {});
					$.getScript("js/jquery.cookie.js",function() {});
				});
				$("#footer").load("footer.html",function(){});
})