/*===========================
 *作者：动力启航(谢凯)
 *网址：http://www.it134.cn
 *转发请保留作者信息，谢谢
===========================*/

//=====================全局函数========================
//Tab控制函数
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
	$(".jqzoom").jqueryzoom({xzoom:400,yzoom:400});
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


$(function(){
	var n = $(".ljq_p-quantity input").val();
	$(".ljq_p-quantity a").eq(0).click(function(){
		if(n<=2){
			n=2;
		}
		n--;
		$(".ljq_p-quantity input").val(n);
	});
	$(".ljq_p-quantity a").eq(1).click(function(){
		n++;
		$(".ljq_p-quantity input").val(n);
	});
	$(".ljq_tab-link").mouseover(function(){
		$(this).addClass("ljq_active").siblings().removeClass("ljq_active");
	});
	$(".ljq_tabBtns a").mouseover(function(){
		$(this).css("color", "#EB5A41");
	});
	$(".ljq_tabBtns").click(function(){
		$(this).addClass("ljq_tabBtns-active").siblings().removeClass("ljq_tabBtns-active");
		$(this).siblings().children().css("color", "#666");
		$(".ljq_tabBtns2").children().css("color","white");
	});
	$(".ljq_tabBtns a").mouseout(function(){
		$(this).css("color", "#666");
		if($(this).parent().hasClass("ljq_tabBtns-active")){
			$(this).css("color", "#EB5A41");
		}
	});
	$(".ljq_tabBtns").click(function(){
		$("html").scrollTop($(".ljq_articleBlock").eq($(this).index()).offset().top-41);
	});
	$(".ljq_tabStyle .ljq_tabBtns").eq(1).click(function(){
		$(".ljq_tabStyle2 .ljq_tabBtns").eq(1).addClass("ljq_tabBtns-active").siblings().removeClass("ljq_tabBtns-active").children().css("color", "#666");
		$(".ljq_tabBtns2").children().css("color","white");
	});
	$(".ljq_tabStyle2 .ljq_tabBtns").eq(0).click(function(){
		$(".ljq_tabStyle .ljq_tabBtns").eq(0).addClass("ljq_tabBtns-active").siblings().removeClass("ljq_tabBtns-active").children().css("color", "#666");
	});
	$(document).scroll(function(){
		if($("html").scrollTop()>$(".ljq_articleBlock").eq(0).offset().top){
		$(".ljq_tabStyle2").css("display","block");
	}else{
		$(".ljq_tabStyle2").css("display","none");
	}
	});
	var a = true;
	$(".ljq_xjExform-checked").click(function(){
		if(a){
			$(this).css("backgroundPosition","-72px -279px");
		}else{
			$(this).css("backgroundPosition","-0px -279px");
		}
		a = !a;
	})
	
	$("#header").load("header.html",function(){
		$.getScript("js/header.js",function() {});
		$.getScript("js/cookie.js",function() {});
		$.getScript("js/jquery.cookie.js",function() {});
	});
	$("#footer").load("footer.html",function(){});
	$(".passport-container").load("login.html", function() {});
	
	var scindex = location.href.indexOf("=");
	var localurl = decodeURI(location.href);
//	console.log(localurl);
	var scontent = localurl.substring(scindex + 1, localurl.length);
//	console.log(scontent);
	
	$.ajax({
		type: "post",
		url: "http://localhost:8080/goods/findGoodsAndPicById",
		async: true,
		dataType:"json",
		data: {
			"goodsId": scontent
		},
		success: function(data) {
			console.log(data);
			$(".ljq_product-titles h1").text(data.data.goodsName);
			$(".ljq_product-brief-outbox p").text(data.data.goodsContent);
			$(".ljq_delivery_from").text(data.data.goodsCountry);
			$(".jqzoom").find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"jqimg":data.data.goodsCoverSrc});
			$(".items ul li").eq(0).find($(".ljq")).attr({"src":data.data.goodsCoverSrc,"bimg":data.data.goodsCoverSrc});
			$(".items ul li").eq(1).find($(".ljq")).attr({"src":data.data.goodsCoverSrc1,"bimg":data.data.goodsCoverSrc1});
			$(".items ul li").eq(2).find($(".ljq")).attr({"src":data.data.goodsCoverSrc2,"bimg":data.data.goodsCoverSrc2});
			$(".ljq_weight").text(data.data.goodsWeight);
			let html = "";
			for(var i = 0; i < data.data.goodsPictureList.length-2; i++) {
				html += `<img class="ljq_shop" src="">`;
			}
			$(".ljq_detail-content").find("h3").before(html);
			let html2 = "";
			for(var i = data.data.goodsPictureList.length-2; i < data.data.goodsPictureList.length; i++) {
				html2 += `<img class="ljq_shop" src="">`;
			}
			$(".ljq_detail-content").find("h3").after(html);
			
			for(var i = 0; i < data.data.goodsPictureList.length; i++) {
				$(".ljq_shop").eq(i).attr("src",data.data.goodsPictureList[i].goodsPictureSrc);
			}
			
			
			$(".ljq_action-price").text("￥"+data.data.goodsPrice);
		}
	});
	console.log($.cookie("user"), $.cookie("pwd"), $.cookie("autologin"));
	if($.cookie("user")=="null"){
		$(".ljq_product-buy-action").click(function(){
			$(".ljq_shadow2").css("display","block");
		$(".passport-container").css("display","block");
		});
	}
});

//添加至购物车
//$(function(){
//		$.ajax({
//			type:"get",
//			url:"http://10.80.13.90:8080/user/login",
//			async:true,
//			data:{
//				"user":"18252588715",
//				"password":"xqh@960806"
//			},
//			success:function(res){
//				console.log(res);
//			}
//		});
//	var scindex = location.href.indexOf("=");
//	var localurl = decodeURI(location.href);
//	console.log(localurl);
//	var scontent = localurl.substring(scindex + 1, localurl.length);
//	console.log(scontent);
	
//	
//	$(".ljq_action-addtocart").click(function(){
//		console.log("1111");
//		$.ajax({
//          type:"post",
//          url:"http://10.80.13.90:8080/shopCar/addShopGoods",
//          async:true,
//          dataType:"json",
//          data:{
//              "goodsId":scontent
//          },
//          success:function(res){
//              console.log(res);
//          }
//     });
// })
//	$(".passport-container").load("login.html", function() {});
//})


$(function(){
	$(".ljq_action-addtocart").click(function(){

		var goods = location.search.substr(9);
		
		addCookie("Goods",goods,400000)
		
		console.log(getCookie("Goods"))
	})
	
	
})