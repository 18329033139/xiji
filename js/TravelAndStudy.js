$(function(){
	var n = 0;
	var t1 = setInterval(function(){
		n+=1;
		if (n>=2) {
			n=0;
		}
		$(".zm_qualification-con").css({
			left:-1200*n + "px",
		});
		
		
		
	},2000);
	$(".zm_qualification-page i").eq(0).click(function(){
//		clearInterval(t1);
		n+=1;
		if (n>=2) {
			n=0;
		}
		$(".zm_qualification-con").css({
			left:-1200*n + "px",
		});
	})
	$(".zm_qualification-page i").eq(1).click(function(){
//		clearInterval(t1);
		n+=1;
		if (n>=2) {
			n=0;
		}
		$(".zm_qualification-con").css({
			left:-1200*n + "px",
		});
	})
	
	
	
	
	$(".zm_select span").eq(0).click(function(){
		$(this).addClass("active").siblings().removeClass("active")
		
		$(".zm_study-wrap").show().siblings().hide()
	});
	$(".zm_select span").eq(1).click(function(){
		$(this).addClass("active").siblings().removeClass("active")
		$(".zm_travel-wrap").show().siblings().hide();
	})
	var i = 0;
	function autoPlay(){
		
		
		if (i == 0) {
			$(".zm_picture img").eq(0).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_picture img").eq(1).css({
				opacity:0,
			})
			$(".zm_page span").eq(0).addClass("page-active").siblings().removeClass("page-active");
			i = 1;
		}else{
			$(".zm_picture img").eq(0).css({
				opacity:0,
			})
			$(".zm_picture img").eq(1).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_page span").eq(1).addClass("page-active").siblings().removeClass("page-active");
			i = 0;
		}
		

	}
	
	
	
	var timer = setInterval(autoPlay,2000);
	
	$(".zm_page span").eq(0).click(function(){
		$(".zm_picture img").eq(0).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_picture img").eq(1).css({
				opacity:0,
			})
			$(".zm_page span").eq(0).addClass("page-active").siblings().removeClass("page-active");
			
	});
	
	$(".zm_page span").eq(1).click(function(){
		$(".zm_picture img").eq(0).css({
				opacity:0,
			})
			$(".zm_picture img").eq(1).css({
				opacity:1,
				zIndex:222,
			});
			$(".zm_page span").eq(1).addClass("page-active").siblings().removeClass("page-active");
			
	});
	

	
	$(".zm_arrow div").eq(0).click(function(){
//		clearInterval(timer)
		if (i == 0) {
			$(".zm_picture img").eq(0).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_picture img").eq(1).css({
				opacity:0,
			})
			$(".zm_page span").eq(0).addClass("page-active").siblings().removeClass("page-active");
			i = 1;
		}else{
			$(".zm_picture img").eq(0).css({
				opacity:0,
			})
			$(".zm_picture img").eq(1).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_page span").eq(1).addClass("page-active").siblings().removeClass("page-active");
			i = 0;
		}
	});
//	setInterval(autoPlay,2000);
	
	$(".zm_arrow div").eq(1).click(function(){
//		clearInterval(timer)
		
		if (i == 0) {
			$(".zm_picture img").eq(0).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_picture img").eq(1).css({
				opacity:0,
			})
			$(".zm_page span").eq(0).addClass("page-active").siblings().removeClass("page-active");
			i = 1;
		}else{
			$(".zm_picture img").eq(0).css({
				opacity:0,
			})
			$(".zm_picture img").eq(1).css({
				opacity:1,
				zIndex:222,
			})
			$(".zm_page span").eq(1).addClass("page-active").siblings().removeClass("page-active");
			i = 0;
		}
	});
//	setInterval(autoPlay,2000);
	
	var m = 0;
	var t2 = setInterval(function(){
		m++;
		if (m >= 4) {
			m=0;
		}
		$(".zm_travel-wrap>.zm_picture img").eq(m).css({
			opacity:1,
			zIndex:222,
		}).siblings().css({
			opacity:0,
		})
		$(".zm_travel-wrap .zm_page span").eq(m).addClass("page-active").siblings().removeClass("page-active")
		
		
		
	},2000);

	$(".zm_travel-wrap .zm_arrow-left").click(function(){
		clearInterval(t2);
		m++;
		if (m >= 4) {
			m=0;
		}
		$(".zm_travel-wrap>.zm_picture img").eq(m).css({
			opacity:1,
			zIndex:222,
		}).siblings().css({
			opacity:0,
		})
		$(".zm_travel-wrap .zm_page span").eq(m).addClass("page-active").siblings().removeClass("page-active")
	})
	
	$(".zm_travel-wrap .zm_arrow_right").click(function(){
		m++;
		if (m >= 4) {
			m=0;
		}
		$(".zm_travel-wrap>.zm_picture img").eq(m).css({
			opacity:1,
			zIndex:222,
		}).siblings().css({
			opacity:0,
		})
		$(".zm_travel-wrap .zm_page span").eq(m).addClass("page-active").siblings().removeClass("page-active")
	})
	$("#header").load("header.html",function(){
		$.getScript("js/header.js",function() {});
		$.getScript("js/cookie.js",function() {});
		$.getScript("js/jquery.cookie.js",function() {});
	});
	$("#footer").load("footer.html",function(){});
	
});