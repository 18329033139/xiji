$(function(){
	$(window).scroll(function(){
		var scropTop=$(this).scrollTop();
		if (scropTop>=470) {
			$(".djw_nav-area-warpper").addClass("fix-top");
		}
		if (scropTop<=470) {
			$(".djw_nav-area-warpper").removeClass("fix-top");
		}
	}),
    
	$(".djw_btn-inner").click(function(){
	   $(this).parent().addClass("active1").siblings().removeClass("active1");
	   var s=$(this).parent().index();
	   console.log(s);
	   $(".djw_frame").eq(s).show().siblings().hide();
	}),
	$(".show-rule-btn").click(function(){
		$(this).toggleClass("opened");
		$(".djw_table_rule").toggleClass("djw_table_rule-show");
	})
	$("#header").load("header.html",function(){
		$.getScript("js/header.js",function() {});
		$.getScript("js/cookie.js",function() {});
		$.getScript("js/jquery.cookie.js",function() {});
	});
	$("#footer").load("footer.html",function(){});
})