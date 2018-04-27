
	function tabs(tabId, tabNum){
	//设置点击后的切换样式
	$(tabId + " .tab li").removeClass("curr");
	$(tabId + " .tab li").eq(tabNum).addClass("curr");
	//根据参数决定显示内容
	$(tabId + " .tabcon").hide();
	$(tabId + " .tabcon").eq(tabNum).show();
}
//=====================全局函数========================

//==================图片详细页函数=====================
//鼠标经过预览图片函数
function preview(img){
	$("#preview .jqzoom img").attr("src",$(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"));
}

//图片放大镜效果
$(function(){
	$(".jqzoom").jqueryzoom({xzoom:0,yzoom:0});
});

//图片预览小图移动效果,页面加载时触发
$(function(){
	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 5; //设置每次显示图片的个数量
	var moveNum = 2; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
	var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
	var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
	var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
	  
	//下一张
	$(".spec-scroll .next").bind("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});
});
	//==================图片详细页函数=====================

	$(function() {
		var n = $(".ljq_p-quantity input").val();
		$(".ljq_p-quantity a").eq(0).click(function() {
			if(n <= 2) {
				n = 2;
			}
			n--;
			$(".ljq_p-quantity input").val(n);
		});
		$(".ljq_p-quantity a").eq(1).click(function() {
			n++;
			$(".ljq_p-quantity input").val(n);
		});
		$(".ljq_close-btn").click(function(){
			$(".ljq_popup_product").css("display","none");
			$(".ljq_shadow").css("display","none");
		})
		
		$(".passport-btn-close").click(function(){
			console.log("1");
			$(".passport-container").css("display","none");
			$(".ljq_shadow2").css("display","none");
		})
		$(".passport-container").load("login.html", function() {});
		$("#header").load("header.html", function() {
			$.getScript("js/header.js", function() {});
			$.getScript("js/cookie.js", function() {});
			$.getScript("js/jquery.cookie.js", function() {});
		});
		$("#footer").load("footer.html", function() {});
		
	})
	
	
	

$(function() {
	console.log($.cookie("user"), $.cookie("pwd"), $.cookie("autologin"));
	
	
	console.log(location.href);
	var scindex = location.href.indexOf("=");
	console.log(scindex);
	var localurl = decodeURI(location.href);
	console.log(localurl);
	var scontent = localurl.substring(scindex + 1, localurl.length);
	console.log(scontent);
	var test = localurl.substring(scindex - 7, scindex);
	console.log(test);


	
	if(test == "content") {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/goods/findGoodsByDim",
			async: true,
			dataType:"json",
			data: {
				dimName: scontent
			},
			success: function(data) {
				console.log(data);
				for(var i = 0; i < data.goodsList.length; i++) {
					var index = data.goodsList[i].goodsId;
					$("<li>").addClass("ljq_goods-item").append($("<div>").addClass("ljq_goods-item-outer").append($("<div>").addClass("ljq_goods-item-inner").append($("<div>").addClass("ljq_goods-pic").append($("<a>").attr("href", "shop.html?goodsId=" + index).attr("title", data.goodsList[i].goodsName).append($("<img>").prop("src", data.goodsList[i].goodsCoverSrc))).append($("<div>").addClass("ljq_sale-icon").append("<span>").text("热卖"))).append($("<div>").addClass("ljq_goods-info").append($("<div>").addClass("ljq_goods-price").append($("<div>").addClass("ljq_price1").append($("<div>").html("<span>￥</span>" + data.goodsList[i].goodsPrice))).append($("<del>").addClass("ljq_price2").append($("<span>").html("<span>￥</span>69.00")))).append($("<h3>").addClass("ljq_goods-name").append($("<a>").attr("href", "shop.html?goodsId=" + index).html(data.goodsList[i].goodsName))).append($("<div>").addClass("ljq_tag-box").append($("<span>").text("自营"))).append($("<div>").addClass("ljq_btm-box").append($("<a>").addClass("ljq_btm-box2").attr("href", "shop.html?goodsId=" + index).text("立即选购")))))).insertBefore(".ccc");
				}
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;") 
				}
				$(".ljq_filter-item").click(function() {
					$(this).addClass("ljq_active").siblings().removeClass("ljq_active");
				});
				$(".ljq_gallery-sort em").mouseover(function() {
					$(this).css("color", "#EB5A41");
				});
				$(".ljq_gallery-sort em").click(function() {
					$(this).addClass("active").siblings().removeClass("active");
					$(this).siblings().css("color", "#666");
				});
				$(".ljq_gallery-sort em").mouseout(function() {
					$(this).css("color", "#666");
					if($(this).hasClass("active")) {
						$(this).css("color", "#EB5A41");
					}
				});
				$(".ljq_goods-item-outer").mouseover(function() {
					$(this).css({
						"overflow": "inherit",
						"z-index": 999
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #DDD solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_goods-item-outer").mouseout(function() {
					$(this).css({
						"overflow": "hidden",
						"z-index": 1
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #fff solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_filter-item-input").focus(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "block");
				});
				$(".ljq_filter-item-input").focusout(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "none");
				});
				$(".ljq_btm-box").mouseover(function() {
					$(this).css("backgroundColor", "#EB5A41").find("a").css("color", "#fff");
				});
				$(".ljq_btm-box").mouseout(function() {
					$(this).css("backgroundColor", "#fff").find("a").css("color", "#EB5A41");
				});
				$(".ljq_checker input").click(function() {
					if($(this).parent().css("backgroundPosition") == "0px -260px") {
						$(this).parent().css("backgroundPosition", "-76px -260px");
					} else {
						$(this).parent().css("backgroundPosition", "0px -260px");
					}
				});
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;")  
					$(".ljq_btm-box").click(function(){
						console.log("1");
						$(".ljq_shadow").css("display","block");
						$(".ljq_popup_product").css("display","block");
						console.log($(this).siblings($(".ljq_goods-name")).find("a").attr("href"));
						var aaaa = $(this).siblings($(".ljq_goods-name")).find("a").attr("href");
						var scindex2 = aaaa.indexOf("=");
						console.log(scindex);	
						var scontent2 = aaaa.substring(scindex2 + 1, aaaa.length);
						console.log(scontent2);
						
						$.ajax({
							type: "post",
							url: "http://localhost:8080/goods/findGoodsAndPicById",
							async: true,
							dataType:"json",
							data: {
								"goodsId": scontent2
								},
							success: function(data) {
								console.log(data);
								$(".ljq_product-titles h1").text(data.data.goodsName);
								$(".jqzoom").find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"jqimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(0).find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"bimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(1).find($(".ljq")).attr({"src":data.data.goodsCoverSrc1,"bimg":data.data.goodsCoverSrc1});
								$(".items ul li").eq(2).find($(".ljq")).attr({"src":data.data.goodsCoverSrc2,"bimg":data.data.goodsCoverSrc2});
								$(".ljq_action-price").text("￥"+data.data.goodsPrice);
							}
						});
					})
				}
			}

		});

	} else if(test == "v1contt") {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/goods/findGoodsByType01Id",
			async: true,
			data: {
				goodsType01Id: scontent
			},
			success: function(data) {
				console.log(data);
				for(var i = 0; i < data.goodsList.length; i++) {
					var index = data.goodsList[i].goodsId;
					$("<li>").addClass("ljq_goods-item").append($("<div>").addClass("ljq_goods-item-outer").append($("<div>").addClass("ljq_goods-item-inner").append($("<div>").addClass("ljq_goods-pic").append($("<a>").attr("href", "shop.html?goodsId=" + index).attr("title", data.goodsList[i].goodsName).append($("<img>").prop("src", data.goodsList[i].goodsCoverSrc))).append($("<div>").addClass("ljq_sale-icon").append("<span>").text("热卖"))).append($("<div>").addClass("ljq_goods-info").append($("<div>").addClass("ljq_goods-price").append($("<div>").addClass("ljq_price1").append($("<div>").html("<span>￥</span>" + data.goodsList[i].goodsPrice))).append($("<del>").addClass("ljq_price2").append($("<span>").html("<span>￥</span>69.00")))).append($("<h3>").addClass("ljq_goods-name").append($("<a>").attr("href", "shop.html?goodsId=" + index).html(data.goodsList[i].goodsName))).append($("<div>").addClass("ljq_tag-box").append($("<span>").text("自营"))).append($("<div>").addClass("ljq_btm-box").append($("<a>").addClass("ljq_btm-box2").attr("href", "shop.html?goodsId=" + index).text("立即选购")))))).insertBefore(".ccc");
				}
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;") 
				}
				$(".ljq_filter-item").click(function() {
					$(this).addClass("ljq_active").siblings().removeClass("ljq_active");
				});
				$(".ljq_gallery-sort em").mouseover(function() {
					$(this).css("color", "#EB5A41");
				});
				$(".ljq_gallery-sort em").click(function() {
					$(this).addClass("active").siblings().removeClass("active");
					$(this).siblings().css("color", "#666");
				});
				$(".ljq_gallery-sort em").mouseout(function() {
					$(this).css("color", "#666");
					if($(this).hasClass("active")) {
						$(this).css("color", "#EB5A41");
					}
				});
				$(".ljq_goods-item-outer").mouseover(function() {
					$(this).css({
						"overflow": "inherit",
						"z-index": 999
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #DDD solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_goods-item-outer").mouseout(function() {
					$(this).css({
						"overflow": "hidden",
						"z-index": 1
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #fff solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_filter-item-input").focus(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "block");
				});
				$(".ljq_filter-item-input").focusout(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "none");
				});
				$(".ljq_btm-box").mouseover(function() {
					$(this).css("backgroundColor", "#EB5A41").find("a").css("color", "#fff");
				});
				$(".ljq_btm-box").mouseout(function() {
					$(this).css("backgroundColor", "#fff").find("a").css("color", "#EB5A41");
				});
				$(".ljq_checker input").click(function() {
					if($(this).parent().css("backgroundPosition") == "0px -260px") {
						$(this).parent().css("backgroundPosition", "-76px -260px");
					} else {
						$(this).parent().css("backgroundPosition", "0px -260px");
					}
				});
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;")  
					$(".ljq_btm-box").click(function(){
						console.log("1");
						$(".ljq_shadow").css("display","block");
						$(".ljq_popup_product").css("display","block");
						console.log($(this).siblings($(".ljq_goods-name")).find("a").attr("href"));
						var aaaa = $(this).siblings($(".ljq_goods-name")).find("a").attr("href");
						var scindex2 = aaaa.indexOf("=");
						console.log(scindex);	
						var scontent2 = aaaa.substring(scindex2 + 1, aaaa.length);
						console.log(scontent2);
						
						$.ajax({
							type: "post",
							url: "http://localhost:8080/goods/findGoodsAndPicById",
							async: true,
							dataType:"json",
							data: {
								"goodsId": scontent2
								},
							success: function(data) {
								console.log(data);
								$(".ljq_product-titles h1").text(data.data.goodsName);
								$(".jqzoom").find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"jqimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(0).find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"bimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(1).find($(".ljq")).attr({"src":data.data.goodsCoverSrc1,"bimg":data.data.goodsCoverSrc1});
								$(".items ul li").eq(2).find($(".ljq")).attr({"src":data.data.goodsCoverSrc2,"bimg":data.data.goodsCoverSrc2});
								$(".ljq_action-price").text("￥"+data.data.goodsPrice);
							}
						});
						
					});
					
					
					
				}
			}
		})
	} else if(test == "v2contt") {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/goods/findGoodsByType02Id",
			async: true,
			data: {
				goodsType02Id: scontent
			},
			success: function(data) {
				console.log(data);
				for(var i = 0; i < data.goodsList.length; i++) {
					var index = data.goodsList[i].goodsId;
					$("<li>").addClass("ljq_goods-item").append($("<div>").addClass("ljq_goods-item-outer").append($("<div>").addClass("ljq_goods-item-inner").append($("<div>").addClass("ljq_goods-pic").append($("<a>").attr("href", "shop.html?goodsId=" + index).attr("title", data.goodsList[i].goodsName).append($("<img>").prop("src", data.goodsList[i].goodsCoverSrc))).append($("<div>").addClass("ljq_sale-icon").append("<span>").text("热卖"))).append($("<div>").addClass("ljq_goods-info").append($("<div>").addClass("ljq_goods-price").append($("<div>").addClass("ljq_price1").append($("<div>").html("<span>￥</span>" + data.goodsList[i].goodsPrice))).append($("<del>").addClass("ljq_price2").append($("<span>").html("<span>￥</span>69.00")))).append($("<h3>").addClass("ljq_goods-name").append($("<a>").attr("href", "shop.html?goodsId=" + index).html(data.goodsList[i].goodsName))).append($("<div>").addClass("ljq_tag-box").append($("<span>").text("自营"))).append($("<div>").addClass("ljq_btm-box").append($("<a>").addClass("ljq_btm-box2").attr("href", "shop.html?goodsId=" + index).text("立即选购")))))).insertBefore(".ccc");
				}
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;") 
				}
				$(".ljq_filter-item").click(function() {
					$(this).addClass("ljq_active").siblings().removeClass("ljq_active");
				});
				$(".ljq_gallery-sort em").mouseover(function() {
					$(this).css("color", "#EB5A41");
				});
				$(".ljq_gallery-sort em").click(function() {
					$(this).addClass("active").siblings().removeClass("active");
					$(this).siblings().css("color", "#666");
				});
				$(".ljq_gallery-sort em").mouseout(function() {
					$(this).css("color", "#666");
					if($(this).hasClass("active")) {
						$(this).css("color", "#EB5A41");
					}
				});
				$(".ljq_goods-item-outer").mouseover(function() {
					$(this).css({
						"overflow": "inherit",
						"z-index": 999
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #DDD solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_goods-item-outer").mouseout(function() {
					$(this).css({
						"overflow": "hidden",
						"z-index": 1
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #fff solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_filter-item-input").focus(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "block");
				});
				$(".ljq_filter-item-input").focusout(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "none");
				});
				$(".ljq_btm-box").mouseover(function() {
					$(this).css("backgroundColor", "#EB5A41").find("a").css("color", "#fff");
				});
				$(".ljq_btm-box").mouseout(function() {
					$(this).css("backgroundColor", "#fff").find("a").css("color", "#EB5A41");
				});
				$(".ljq_checker input").click(function() {
					if($(this).parent().css("backgroundPosition") == "0px -260px") {
						$(this).parent().css("backgroundPosition", "-76px -260px");
					} else {
						$(this).parent().css("backgroundPosition", "0px -260px");
					}
				});
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;")  
					$(".ljq_btm-box").click(function(){
						console.log("1");
						$(".ljq_shadow").css("display","block");
						$(".ljq_popup_product").css("display","block");
						console.log($(this).siblings($(".ljq_goods-name")).find("a").attr("href"));
						var aaaa = $(this).siblings($(".ljq_goods-name")).find("a").attr("href");
						var scindex2 = aaaa.indexOf("=");
						console.log(scindex);	
						var scontent2 = aaaa.substring(scindex2 + 1, aaaa.length);
						console.log(scontent2);
						
						$.ajax({
							type: "post",
							url: "http://localhost:8080/goods/findGoodsAndPicById",
							async: true,
							dataType:"json",
							data: {
								"goodsId": scontent2
								},
							success: function(data) {
								console.log(data);
								$(".ljq_product-titles h1").text(data.data.goodsName);
								$(".jqzoom").find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"jqimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(0).find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"bimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(1).find($(".ljq")).attr({"src":data.data.goodsCoverSrc1,"bimg":data.data.goodsCoverSrc1});
								$(".items ul li").eq(2).find($(".ljq")).attr({"src":data.data.goodsCoverSrc2,"bimg":data.data.goodsCoverSrc2});
								$(".ljq_action-price").text("￥"+data.data.goodsPrice);
							}
						});
					})
				}
			}
		})
	} else if(test == "v3contt") {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/goods/findGoodsByType03Id",
			async: true,
			data: {
				goodsType03Id: scontent
			},
			success: function(data) {
				console.log(data);
				for(var i = 0; i < data.goodsList.length; i++) {
					var index = data.goodsList[i].goodsId;
					$("<li>").addClass("ljq_goods-item").append($("<div>").addClass("ljq_goods-item-outer").append($("<div>").addClass("ljq_goods-item-inner").append($("<div>").addClass("ljq_goods-pic").append($("<a>").attr("href", "shop.html?goodsId=" + index).attr("title", data.goodsList[i].goodsName).append($("<img>").prop("src", data.goodsList[i].goodsCoverSrc))).append($("<div>").addClass("ljq_sale-icon").append("<span>").text("热卖"))).append($("<div>").addClass("ljq_goods-info").append($("<div>").addClass("ljq_goods-price").append($("<div>").addClass("ljq_price1").append($("<div>").html("<span>￥</span>" + data.goodsList[i].goodsPrice))).append($("<del>").addClass("ljq_price2").append($("<span>").html("<span>￥</span>69.00")))).append($("<h3>").addClass("ljq_goods-name").append($("<a>").attr("href", "shop.html?goodsId=" + index).html(data.goodsList[i].goodsName))).append($("<div>").addClass("ljq_tag-box").append($("<span>").text("自营"))).append($("<div>").addClass("ljq_btm-box").append($("<a>").addClass("ljq_btm-box2").attr("href", "shop.html?goodsId=" + index).text("立即选购")))))).insertBefore(".ccc");
				}
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;") 
				}
				$(".ljq_filter-item").click(function() {
					$(this).addClass("ljq_active").siblings().removeClass("ljq_active");
				});
				$(".ljq_gallery-sort em").mouseover(function() {
					$(this).css("color", "#EB5A41");
				});
				$(".ljq_gallery-sort em").click(function() {
					$(this).addClass("active").siblings().removeClass("active");
					$(this).siblings().css("color", "#666");
				});
				$(".ljq_gallery-sort em").mouseout(function() {
					$(this).css("color", "#666");
					if($(this).hasClass("active")) {
						$(this).css("color", "#EB5A41");
					}
				});
				$(".ljq_goods-item-outer").mouseover(function() {
					$(this).css({
						"overflow": "inherit",
						"z-index": 999
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #DDD solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_goods-item-outer").mouseout(function() {
					$(this).css({
						"overflow": "hidden",
						"z-index": 1
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #fff solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_filter-item-input").focus(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "block");
				});
				$(".ljq_filter-item-input").focusout(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "none");
				});
				$(".ljq_btm-box").mouseover(function() {
					$(this).css("backgroundColor", "#EB5A41").find("a").css("color", "#fff");
				});
				$(".ljq_btm-box").mouseout(function() {
					$(this).css("backgroundColor", "#fff").find("a").css("color", "#EB5A41");
				});
				$(".ljq_checker input").click(function() {
					if($(this).parent().css("backgroundPosition") == "0px -260px") {
						$(this).parent().css("backgroundPosition", "-76px -260px");
					} else {
						$(this).parent().css("backgroundPosition", "0px -260px");
					}
				});
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;")  
					$(".ljq_btm-box").click(function(){
						console.log("1");
						$(".ljq_shadow").css("display","block");
						$(".ljq_popup_product").css("display","block");
						console.log($(this).siblings($(".ljq_goods-name")).find("a").attr("href"));
						var aaaa = $(this).siblings($(".ljq_goods-name")).find("a").attr("href");
						var scindex2 = aaaa.indexOf("=");
						console.log(scindex);	
						var scontent2 = aaaa.substring(scindex2 + 1, aaaa.length);
						console.log(scontent2);
						
						$.ajax({
							type: "post",
							url: "http://localhost:8080/goods/findGoodsAndPicById",
							async: true,
							dataType:"json",
							data: {
								"goodsId": scontent2
								},
							success: function(data) {
								console.log(data);
								$(".ljq_product-titles h1").text(data.data.goodsName);
								$(".jqzoom").find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"jqimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(0).find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"bimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(1).find($(".ljq")).attr({"src":data.data.goodsCoverSrc1,"bimg":data.data.goodsCoverSrc1});
								$(".items ul li").eq(2).find($(".ljq")).attr({"src":data.data.goodsCoverSrc2,"bimg":data.data.goodsCoverSrc2});
								$(".ljq_action-price").text("￥"+data.data.goodsPrice);
							}
						});
					})
				}
			}
		})
	}else if(test == "ttttttt") {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/goods/findGoodsByType03Id",
			async: true,
			data: {
				dimName: scontent
			},
			success: function(data) {
				console.log(data);
				for(var i = 0; i < data.data.length; i++) {
					var index = data.data[i].goodsId;
					$("<li>").addClass("ljq_goods-item").append($("<div>").addClass("ljq_goods-item-outer").append($("<div>").addClass("ljq_goods-item-inner").append($("<div>").addClass("ljq_goods-pic").append($("<a>").attr("href", "shop.html?goodsId=" + index).attr("title", data.data[i].goodsName).append($("<img>").prop("src", data.data[i].goodsCoverSrc))).append($("<div>").addClass("ljq_sale-icon").append("<span>").text("热卖"))).append($("<div>").addClass("ljq_goods-info").append($("<div>").addClass("ljq_goods-price").append($("<div>").addClass("ljq_price1").append($("<div>").html("<span>￥</span>" + data.data[i].goodsPrice))).append($("<del>").addClass("ljq_price2").append($("<span>").html("<span>￥</span>69.00")))).append($("<h3>").addClass("ljq_goods-name").append($("<a>").attr("href", "shop.html?goodsId=" + index).html(data.data[i].goodsName))).append($("<div>").addClass("ljq_tag-box").append($("<span>").text("自营"))).append($("<div>").addClass("ljq_btm-box").append($("<a>").addClass("ljq_btm-box2").attr("href", "shop.html?goodsId=" + index).text("立即选购")))))).insertBefore(".ccc");
				}
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;") 
				}
				$(".ljq_filter-item").click(function() {
					$(this).addClass("ljq_active").siblings().removeClass("ljq_active");
				});
				$(".ljq_gallery-sort em").mouseover(function() {
					$(this).css("color", "#EB5A41");
				});
				$(".ljq_gallery-sort em").click(function() {
					$(this).addClass("active").siblings().removeClass("active");
					$(this).siblings().css("color", "#666");
				});
				$(".ljq_gallery-sort em").mouseout(function() {
					$(this).css("color", "#666");
					if($(this).hasClass("active")) {
						$(this).css("color", "#EB5A41");
					}
				});
				$(".ljq_goods-item-outer").mouseover(function() {
					$(this).css({
						"overflow": "inherit",
						"z-index": 999
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #DDD solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_goods-item-outer").mouseout(function() {
					$(this).css({
						"overflow": "hidden",
						"z-index": 1
					}).find($(".ljq_goods-item-inner")).css({
						"border": "1px #fff solid",
						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
					});
				});
				$(".ljq_filter-item-input").focus(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "block");
				});
				$(".ljq_filter-item-input").focusout(function() {
					$(this).siblings($(".ljq_filter-item-pop ")).find("button").css("display", "none");
				});
				$(".ljq_btm-box").mouseover(function() {
					$(this).css("backgroundColor", "#EB5A41").find("a").css("color", "#fff");
				});
				$(".ljq_btm-box").mouseout(function() {
					$(this).css("backgroundColor", "#fff").find("a").css("color", "#EB5A41");
				});
				$(".ljq_checker input").click(function() {
					if($(this).parent().css("backgroundPosition") == "0px -260px") {
						$(this).parent().css("backgroundPosition", "-76px -260px");
					} else {
						$(this).parent().css("backgroundPosition", "0px -260px");
					}
				});
				if($.cookie("user")=="null"){
					$(".ljq_btm-box2").attr("href","javascript:;")  
					$(".ljq_btm-box").click(function(){
						console.log("1");
						$(".ljq_shadow").css("display","block");
						$(".ljq_popup_product").css("display","block");
						console.log($(this).siblings($(".ljq_goods-name")).find("a").attr("href"));
						var aaaa = $(this).siblings($(".ljq_goods-name")).find("a").attr("href");
						var scindex2 = aaaa.indexOf("=");
						console.log(scindex);	
						var scontent2 = aaaa.substring(scindex2 + 1, aaaa.length);
						console.log(scontent2);
						
						$.ajax({
							type: "post",
							url: "http://localhost:8080/goods/findGoodsAndPicById",
							async: true,
							dataType:"json",
							data: {
								"goodsId": scontent2
								},
							success: function(data) {
								console.log(data);
								$(".ljq_product-titles h1").text(data.data.goodsName);
								$(".jqzoom").find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"jqimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(0).find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"bimg":data.data.goodsCoverSrc});
								$(".items ul li").eq(1).find($(".ljq")).attr({"src":data.data.goodsCoverSrc1,"bimg":data.data.goodsCoverSrc1});
								$(".items ul li").eq(2).find($(".ljq")).attr({"src":data.data.goodsCoverSrc2,"bimg":data.data.goodsCoverSrc2});
								$(".ljq_action-price").text("￥"+data.data.goodsPrice);
							}
						});
					})
				}
			}
		})
	}

	$(".ljq_product-buy-action").click(function(){
		$(".ljq_shadow2").css("display","block");
		$(".passport-container").css("display","block");
	})
});	






//$(function() {
//	var scindex = location.href.indexOf("=");
//	console.log(scindex);
//	var localurl = decodeURI(location.href);
//	console.log(localurl);
//	var scontent = localurl.substring(scindex + 1, localurl.length);
//	$(".ljq_filter-entries:eq(1) span.ljq_filter-item").click(function(){
//         var index=$(this).index();
//         var minPrice;
//         var maxPrice;
//          console.log(index);
//          switch (index){
//          	case 0:
//          	select();
//          		break;
//          	case 1:
//          	minPrice=0;
//          	maxPrice=99;
//          	select();
//          		break;
//          	case 2:
//          	minPrice=100;
//          	maxPrice=199;
//          	select();
//          		break;
//          	case 3:
//          	minPrice=200;
//          	maxPrice=299;
//          	select();
//          		break;
//          	case 4:
//          	minPrice=300;
//          	maxPrice=399;
//          	select();
//          	    break;
//          	case 5:
//          	minPrice=500;
//          	maxPrice=699;
//          	select();
//          	    break;
//          	case 6:
//          	minPrice=700;
//          	maxPrice=999;
//          	select();
//          	    break;
//          	case 7:
//          	minPrice=1000;
//          	maxPrice=10000;
//          	select();
//          	    break;
//          	default:
//          		break;
//          }
//			function select(){
//				$.ajax({
//				type: "post",
//				url: "http://localhost:8080/goods/findGoodsByDimAndCondition",
//				async: true,
//				dataType: "JSON",
//				data: {
//					"dimName": scontent,
//					"minPrice":minPrice,
//					"maxPrice":maxPrice,
//					"page":"1",
//				},
//				success: function(res) {
//					console.log(res);
//					var searchesShop = "";
//					for(var i = 0; i < res.goodsList.length; i++) {
//						console.log(res.goodsList.length);
//						searchesShop += `<li class="ljq_goods-item"><div class="ljq_goods-item-outer" style="overflow: hidden; z-index: 1;"><div class="ljq_goods-item-inner" style="border: 1px solid rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;"><div class="ljq_goods-pic"><a href="shop.html?goodsId=1" title="【简约流线美学】TUMI 塔米/途明 A"><img src="img/shop.jpg"></a><div class="ljq_sale-icon">热卖</div></div><div class="ljq_goods-info"><div class="ljq_goods-price"><div class="ljq_price1"><div><span>￥${res.goodsList[i].goodsPrice}</span></div></div><del class="ljq_price2"><span><span>￥</span>69.00</span></del></div><h3 class="ljq_goods-name"><a href="shop.html?goodsId=1">【简约流线美学】TUMI 塔米/途明 A</a></h3><div class="ljq_tag-box"><span>自营</span></div><div class="ljq_btm-box"><a href="shop.html?goodsId=1">立即选购</a></div></div></div></div></li>`
//
//					}
//					$(".ljq_gallery-show .ljq_goods-item").remove();
//					$(".ljq_clearfix").prepend(searchesShop);
//					$(".ljq_goods-item-outer").mouseover(function() {
//					$(this).css({
//						"overflow": "inherit",
//						"z-index": 999
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #DDD solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				$(".ljq_goods-item-outer").mouseout(function() {
//					$(this).css({
//						"overflow": "hidden",
//						"z-index": 1
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #fff solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				}
//			});
//			}	
//	})
//	$(".ljq_filter-entries:eq(1) span.ljq_filter-item2 .ljq_filter-item-pop button:eq(1)").click(function(){
//          	      var minPrice=$(".ljq_filter-entries:eq(1) input:eq(0)").val();
//          	      var maxPrice=$(".ljq_filter-entries:eq(1) input:eq(1)").val();
//          	      console.log(maxPrice);
//          	        select();
//          	    function select(){
//				$.ajax({
//				type: "post",
//				url: "http://localhost:8080/goods/findGoodsByDimAndCondition",
//				async: true,
//				dataType: "JSON",
//				data: {
//					"dimName": scontent,
//					"minPrice":minPrice,
//					"maxPrice":maxPrice,
//					"page":"1",
//				},
//				success: function(res) {
//					console.log(res);
//					var searchesShop = "";
//					for(var i = 0; i < res.goodsList.length; i++) {
//						console.log(res.goodsList.length);
//						searchesShop += `<li class="ljq_goods-item"><div class="ljq_goods-item-outer" style="overflow: hidden; z-index: 1;"><div class="ljq_goods-item-inner" style="border: 1px solid rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;"><div class="ljq_goods-pic"><a href="shop.html?goodsId=1" title="【简约流线美学】TUMI 塔米/途明 A"><img src="img/shop.jpg"></a><div class="ljq_sale-icon">热卖</div></div><div class="ljq_goods-info"><div class="ljq_goods-price"><div class="ljq_price1"><div><span>￥${res.goodsList[i].goodsPrice}</span></div></div><del class="ljq_price2"><span><span>￥</span>69.00</span></del></div><h3 class="ljq_goods-name"><a href="shop.html?goodsId=1">【简约流线美学】TUMI 塔米/途明 A</a></h3><div class="ljq_tag-box"><span>自营</span></div><div class="ljq_btm-box"><a href="shop.html?goodsId=1">立即选购</a></div></div></div></div></li>`
//
//					}
//					$(".ljq_gallery-show .ljq_goods-item").remove();
//					$(".ljq_clearfix").prepend(searchesShop);
//					$(".ljq_goods-item-outer").mouseover(function() {
//					$(this).css({
//						"overflow": "inherit",
//						"z-index": 999
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #DDD solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				$(".ljq_goods-item-outer").mouseout(function() {
//					$(this).css({
//						"overflow": "hidden",
//						"z-index": 1
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #fff solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				}
//			});
//			}
//          })
//	
//	$(".ljq_filter-entries:eq(2) span.ljq_filter-item").click(function(){
//		 var index=$(this).index();
//		 var minWeight;
//		 var maxWeight;
//		 switch (index){
//		 	case 0:
//		 	select1();
//		 		break;
//		 	case 1:
//		 	minWeight=0;
//		 	maxWeight=50;
//		 	select1();
//		 		break;
//		 	case 2:
//		 	minWeight=50;
//		 	maxWeight=100;
//		 	select1();
//		 		break;
//		 	case 3:
//		 	minWeight=101;
//		 	maxWeight=200;
//		 	select1();
//		 		break;
//		 	case 4:
//		 	minWeight=201;
//		 	maxWeight=300;
//		 	select1();
//		 		break;
//		 	case 5:
//		 	minWeight=301;
//		 	maxWeight=500;
//		 	select1();
//		 		break;
//		 	case 6:
//		 	minWeight=501;
//		 	maxWeight=999;
//		 	select1();
//		 		break;
//		 	case 7:
//		 	minWeight=1000;
//		 	maxWeight=2000;
//		 	select1();
//		 		break;
//		 	case 8:
//		 	minWeight=2001;
//		 	maxWeight=200000;
//		 	select1();
//		 		break;
//		 	default:
//		 		break;
//		 }
//		
//		 function select1(){
//		 	$.ajax({
//				type: "post",
//				url: "http://localhost:8080/goods/findGoodsByDimAndCondition",
//				async: true,
//				dataType: "JSON",
//				data: {
//					"dimName": scontent,
//					"minWeight":minWeight,
//					"maxWeight":maxWeight,
//					"page":"1",
//				},
//				success: function(res) {
//					console.log(res);
//					var searchesShop = "";
//					for(var i = 0; i < res.goodsList.length; i++){
//						console.log(res.goodsList.length);
//						searchesShop += `<li class="ljq_goods-item"><div class="ljq_goods-item-outer" style="overflow: hidden; z-index: 1;"><div class="ljq_goods-item-inner" style="border: 1px solid rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;"><div class="ljq_goods-pic"><a href="shop.html?goodsId=1" title="【简约流线美学】TUMI 塔米/途明 A"><img src="img/shop.jpg"></a><div class="ljq_sale-icon">热卖</div></div><div class="ljq_goods-info"><div class="ljq_goods-price"><div class="ljq_price1"><div><span>￥${res.goodsList[i].goodsPrice}</span></div></div><del class="ljq_price2"><span><span>￥</span>69.00</span></del></div><h3 class="ljq_goods-name"><a href="shop.html?goodsId=1">【简约流线美学】TUMI 塔米/途明 A</a></h3><div class="ljq_tag-box"><span>自营</span></div><div class="ljq_btm-box"><a href="shop.html?goodsId=1">立即选购</a></div></div></div></div></li>`
//					}
//					$(".ljq_gallery-show .ljq_goods-item").remove();
//					$(".ljq_clearfix").prepend(searchesShop);
//					$(".ljq_goods-item-outer").mouseover(function() {
//					$(this).css({
//						"overflow": "inherit",
//						"z-index": 999
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #DDD solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				$(".ljq_goods-item-outer").mouseout(function() {
//					$(this).css({
//						"overflow": "hidden",
//						"z-index": 1
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #fff solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				}
//
//			});
//		 }
//	})
//	$(".ljq_filter-entries:eq(2) span.ljq_filter-item2 .ljq_filter-item-pop button:eq(1)").click(function(){
//          	      var minWeight=$(".ljq_filter-entries:eq(2) input:eq(0)").val();
//          	      var maxWeight=$(".ljq_filter-entries:eq(2) input:eq(1)").val();
//          	      console.log(maxWeight);
//          	    select();
//          	    function select(){
//				$.ajax({
//				type: "post",
//				url: "http://localhost:8080/goods/findGoodsByDimAndCondition",
//				async: true,
//				dataType: "JSON",
//				data: {
//					"dimName": scontent,
//					"minWeight":minWeight,
//					"maxWeight":maxWeight,
//					"page":"1",
//				},
//				success: function(res) {
//					console.log(res);
//					var searchesShop = "";
//					for(var i = 0; i < res.goodsList.length; i++) {
//						console.log(res.goodsList.length);
//						searchesShop += `<li class="ljq_goods-item"><div class="ljq_goods-item-outer" style="overflow: hidden; z-index: 1;"><div class="ljq_goods-item-inner" style="border: 1px solid rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;"><div class="ljq_goods-pic"><a href="shop.html?goodsId=1" title="【简约流线美学】TUMI 塔米/途明 A"><img src="img/shop.jpg"></a><div class="ljq_sale-icon">热卖</div></div><div class="ljq_goods-info"><div class="ljq_goods-price"><div class="ljq_price1"><div><span>￥${res.goodsList[i].goodsPrice}</span></div></div><del class="ljq_price2"><span><span>￥</span>69.00</span></del></div><h3 class="ljq_goods-name"><a href="shop.html?goodsId=1">【简约流线美学】TUMI 塔米/途明 A</a></h3><div class="ljq_tag-box"><span>自营</span></div><div class="ljq_btm-box"><a href="shop.html?goodsId=1">立即选购</a></div></div></div></div></li>`
//
//					}
//					$(".ljq_gallery-show .ljq_goods-item").remove();
//					$(".ljq_clearfix").prepend(searchesShop);
//					$(".ljq_goods-item-outer").mouseover(function() {
//					$(this).css({
//						"overflow": "inherit",
//						"z-index": 999
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #DDD solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				$(".ljq_goods-item-outer").mouseout(function() {
//					$(this).css({
//						"overflow": "hidden",
//						"z-index": 1
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #fff solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				}
//			});
//			}
//          })
//
//	$(".ljq_filter-entries:eq(3) span").click(function(){
//		   var goodsCountry;
//		   var index=$(this).index();
//		   switch (index){
//		   	case 0:
//		   	select1();
//		   		break;
//		   	case 1:
//		   	goodsCountry="美国";
//		   	select1();
//		   		break;
//		   	case 2:
//		   	goodsCountry="日本";
//		   	select1();
//		   		break;
//		   	case 3:
//		   	goodsCountry="中国";
//		   	select1();
//		   		break;
//		   	case 4:
//		   	goodsCountry="香港";
//		   	select1();
//		   		break;
//		   	case 5:
//		   	goodsCountry="澳新";
//		   	select1();
//		   		break;
//		   	case 6:
//		   	goodsCountry="英国";
//		   	select1();
//		   		break;
//		   	case 7:
//		   	goodsCountry="德国";
//		   	select1();
//		   		break;
//		   	case 8:
//		   	goodsCountry="加拿大";
//		   	select1();
//		   		break;
//		   	case 9:
//		   	goodsCountry="瑞典";
//		   	select1();
//		   		break;
//		   	case 10:
//		   	goodsCountry="中国台湾";
//		   	select1();
//		   		break;
//		   	case 9:
//		   	goodsCountry="比利时";
//		   	select1();
//		   		break;
//		   	default:
//		   		break;
//		   }
//		   function select1(){
//		 	$.ajax({
//				type: "post",
//				url: "http://localhost:8080/goods/findGoodsByDimAndCondition",
//				async: true,
//				dataType: "JSON",
//				data: {
//					"dimName": scontent,
//					"goodsCountry":goodsCountry,
//					"page":"1",
//				},
//				success: function(res) {
//					console.log(res);
//					var searchesShop = "";
//					for(var i = 0; i < res.goodsList.length; i++){
//						console.log(res.goodsList.length);
//						searchesShop += `<li class="ljq_goods-item"><div class="ljq_goods-item-outer" style="overflow: hidden; z-index: 1;"><div class="ljq_goods-item-inner" style="border: 1px solid rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 5px;"><div class="ljq_goods-pic"><a href="shop.html?goodsId=1" title="【简约流线美学】TUMI 塔米/途明 A"><img src="img/shop.jpg"></a><div class="ljq_sale-icon">热卖</div></div><div class="ljq_goods-info"><div class="ljq_goods-price"><div class="ljq_price1"><div><span>￥${res.goodsList[i].goodsPrice}</span></div></div><del class="ljq_price2"><span><span>￥</span>69.00</span></del></div><h3 class="ljq_goods-name"><a href="shop.html?goodsId=1">【简约流线美学】TUMI 塔米/途明 A</a></h3><div class="ljq_tag-box"><span>自营</span></div><div class="ljq_btm-box"><a href="shop.html?goodsId=1">立即选购</a></div></div></div></div></li>`
//					}
//					$(".ljq_gallery-show .ljq_goods-item").remove();
//					$(".ljq_clearfix").prepend(searchesShop);
//					$(".ljq_goods-item-outer").mouseover(function() {
//					$(this).css({
//						"overflow": "inherit",
//						"z-index": 999
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #DDD solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				$(".ljq_goods-item-outer").mouseout(function() {
//					$(this).css({
//						"overflow": "hidden",
//						"z-index": 1
//					}).find($(".ljq_goods-item-inner")).css({
//						"border": "1px #fff solid",
//						"box-shadow": "0 0 5px rgba(0, 0, 0, 0.3)"
//					});
//				});
//				}
//
//			});
//		 }
//		   
//	})
//	})
