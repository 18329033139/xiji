$(function(){
	let html = "";
	for(var i = 0; i < 10; i++) {
		html += `
		<li class="ljq_goods-item">
									
									<div class="ljq_goods-item-outer">
										
										<div class="ljq_goods-item-inner">
											<div class="ljq_goods-pic">
												<a href="" title="【非凡创意 品味生活】Marburg 玛堡 简约条纹3D无纺壁纸/墙纸 10.5x0.53m 9436"><img src="img/house1.jpg" alt="" /></a>
												<div class="ljq_sale-icon">
													<span>热卖</span>
												</div>
											</div>
											<div class="ljq_goods-info">
												<div class="ljq_goods-price">
													<div class="ljq_price1">
														<span>￥</span>14.00
													</div>
													<del class="ljq_price2">
															<span>￥</span>69.00
														</del>
												</div>
												<h3 class="ljq_goods-name"><a href="">【非凡创意 品味生活】Marburg 玛堡 简约条纹3D无纺壁纸/墙纸 10.5x0.53m 9436</a></h3>
												<div class="ljq_tag-box">
													<span>自营</span>
												</div>
												<div class="ljq_btm-box">
													<a href="">立即选购</a>
												</div>
											</div>
										</div>
									</div>
								</li>`;
		}
	
	$(".ljq_clearfix2").find(".ljq_ccc").before(html);
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
			$(".ljq_btm-box").mouseover(function() {
				$(this).css("backgroundColor", "#EB5A41").find("a").css("color", "#fff");
			});
			$(".ljq_btm-box").mouseout(function() {
				$(this).css("backgroundColor", "#fff").find("a").css("color", "#EB5A41");
			});
			$(".ljq_toplink img").click(function(){
				$("html").scrollTop(0);
			});
	$("#header").load("header.html",function(){
		$.getScript("js/header.js",function() {});
		$.getScript("js/cookie.js",function() {});
		$.getScript("js/jquery.cookie.js",function() {});
	});
	$("#footer").load("footer.html",function(){});
});
$(function(){
	$(".ljq_goods-item").each(function(){
		$(this).find("a").attr("href","shop.html?goodsId=10");
	})
})