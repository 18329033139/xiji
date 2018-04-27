$(function() {
//	$(".ljq_index_nav_classification").find("p").mouseenter(function(){
//		console.log("1");
//		$(".ljq_index_nav_classification_lv1").css("display","block");
//	});
//	$(".ljq_index_nav_classification").mouseleave(function(){
//		$(".ljq_index_nav_classification_lv1").css("display","none");
//	});
})
$(function() {
	$("#ljq_index_service_list").hide();
	$(".ljq_index_topbar_service").mouseenter(function() {
		$("#ljq_index_service_list").slideDown();
	}).mouseleave(function() {
		$("#ljq_index_service_list").slideDown().stop(true, false);
		$("#ljq_index_service_list").slideUp();
	})

})

$(function() {
	$("#ljq_index_sign_up_hidden").hide();
	$(".ljq_index_sign_up").mouseenter(function() {
		$("#ljq_index_sign_up_hidden").slideDown();
	})
	$(".ljq_index_sign_up").mouseleave(function() {
		$("#ljq_index_sign_up_hidden").slideDown().stop(true, false);
		$("#ljq_index_sign_up_hidden").slideUp();
	})
})
$(function() {
	$("#ljq_minicart-cont").hide();
	$(".ljq_index_shop").mouseenter(function() {
		$("#ljq_minicart-cont").slideDown();
	})
	$(".ljq_index_shop").mouseleave(function() {
		$("#ljq_minicart-cont").slideDown().stop(true, false);
		$("#ljq_minicart-cont").slideUp();
	})
})

$(function() {
	$.ajax({
		type: "post",
		url: "http://localhost:8080/list/staticList",
		async: true,
		dataType: "json",

		success: function(res) {
			var data = res;
			console.log(data);
			$(".ljq_index_classification_items").each(function(index) {
				var i = $(this);
				i.children("a").text(data.goodsType01List[index].goodsType01Name).attr("href", "search.html?lv1contt=" + data.goodsType01List[index].goodsType01Id);
				for(var m = 0; m < 3; m++) {
					i.find(".ljq_index_nav_classification_lv2 li a").eq(m).text(data.goodsType01List[index].goodsType02List[m].goodsType02Name).attr("href", "search.html?lv2contt=" + data.goodsType01List[index].goodsType02List[m].goodsType02Id);
				}
				for(var n = 0; n < data.goodsType01List[index].goodsType02List.length; n++) {
					$("<dl>").addClass("ljq_index_items_lv3_list").append($("<dt>").append($("<a>").attr("href", "search.html?lv2contt=" + data.goodsType01List[index].goodsType02List[n].goodsType02Id).addClass("ljq_index_items_lv3_list_dt_a").text(data.goodsType01List[index].goodsType02List[n].goodsType02Name))).appendTo(i.find(".ljq_index_items_lv3")).append($("<span>").html("&nbsp;|")).append($("<dd>").addClass("ljq_index_items_lv3_list_dd"));
					for(var x = 0; x < data.goodsType01List[index].goodsType02List[n].goodsType03List.length; x++) {
						i.find(".ljq_index_items_lv3_list dd").eq(n).append($("<a>").addClass("ljq_index_items_lv3_list_dd_a").text(data.goodsType01List[index].goodsType02List[n].goodsType03List[x].goodsType03Name).attr("href", "search.html?lv3contt=" + data.goodsType01List[index].goodsType02List[n].goodsType03List[x].goodsType03Id))
					}
				}
			})
		}
	});
})
$(function() {
	$(".ljq_index_classification_items").each(function(index) {
		var m = $(this);
		$(this).mouseenter(function() {
			m.find(".ljq_index_nav_classification_lv3").css("display", "block");
			m.siblings().find(".ljq_index_nav_classification_lv3").css("display", "none")
		})
		$(this).mouseleave(function() {
			$(".ljq_index_nav_classification_lv3").css("display", "none");
		})
	})

})

$(function() {
	$("#ljq_index_search_btn").click(function() {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/goods/findGoodsByDim",
			async: false,

			data: {
				"dimName": $("#ljq_index_search_insert").val()
			},
			success: function(res) {
				console.log(res);
				window.location.href = "search.html?scontent=" + encodeURI($("#ljq_index_search_insert").val());
			}
		});
	})
})

$(function() {
	$(".ljq_index_hot_goods_tapbar_fb").addClass("ljq_index_topbar_active");
	$(".ljq_index_hot_goods_tapbar li").each(function() {
		var m = $(this);
		$(this).mouseover(function() {
			m.addClass("ljq_index_topbar_active");
			m.siblings().removeClass("ljq_index_topbar_active");
		})
	})
})
$(function() {
	console.log($.cookie("user"), $.cookie("pwd"), $.cookie("autologin"));
	if($.cookie("user") != "null") {
		$(".ljq_index_logined_info_top").css("display", "block");
		$(".ljq_index_logined_info_hidden").css("display", "block");
		$(".ljq_index_sign_up").find(".login_hide").css("display", "none");
		$("#ljq_index_login_id").text("您好," + $.cookie("user").substring(0, 3) + "****...");
	}
})
$(function() {
	$("#ljq_index_login_esc").click(function() {
		$.ajax({
			type: "post",
			url: "http://localhost:8080/user/loginOut",
			dataType: "json",
			async: true,

			success: function(res) {
				console.log(res);
				if(res.errorcode == 0) {
					$.cookie("user", null);
					$.cookie("pwd", null);
					window.location.href = "index.html";
					$(".ljq_index_logined_info_top").css("display", "none");
					$(".ljq_index_logined_info_hidden").css("display", "none");
				} 
			}
		});
	});
})
$(function(){
	$(".ljq_index_shop").mouseover(function(){
		$("#ljq_minicart-cont").css("display","block");
		$(".ljq_index_shop").css({"border":"1px solid #C9C9C9","background":"white","borderBottom":"none"})
	})
	$(".ljq_index_shop").mouseout(function(){
		$(".ljq_index_shop").css({"border":"1px solid #F5F5F5","background":"#F5F5F5","borderBottom":"none"})
	})
//	$(".ljq_no-information").html("ljq_no-information")
})
	
	

