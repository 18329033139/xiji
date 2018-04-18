$(function(){
	let html = "";
	for(let i = 0;i<8;i++){
			html += `<li class="ljq_goods-item">
									
									<div class="ljq_goods-item-outer">
										
										<div class="ljq_goods-item-inner">
											<div class="ljq_goods-pic">
												<a href="" title="【水润防晒】Kose 高丝 suncut 高强防晒保湿防晒霜/防晒乳 SPF50 PA++++ 80g"><img src="img/goods1.jpg" alt="" /></a>
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
												<h3 class="ljq_goods-name"><a href="">【水润防晒】Kose 高丝 suncut 高强防晒保湿防晒霜/防晒乳 SPF50 PA++++ 80g</a></h3>
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
	$("#ljq_product-list1").find(".ljq_ccc").before(html);
	let html2 = ""+`<li class="ljq_more">
						<a href=""><span>查看更多</span></a>
					</li>`;
	$("#ljq_product-list1").find(".ljq_ccc").before(html2);
	$("#ljq_product-list2").find(".ljq_ccc").before(html);
	$("#ljq_product-list2").find(".ljq_ccc").before(html2);
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
			$(".ljq_btm-box").each(function(){
				$(this).find("a").attr("href","shop.html?goodsId=18");
			})
})
