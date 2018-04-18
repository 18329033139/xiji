$(function(){
//	$("body a")
      var iteamArr1={"country":["日本","美国","新西兰","澳洲","中国香港","英国","德国","中国"],"number":["JA","US","NAL","AUA","HK","GBA","DEA","CH"]}
			var foot="";
			for (var ii=0;ii<iteamArr1.country.length;ii++) {
//				for () {
					foot +=`<li class="btn_${iteamArr1.number[ii]} clearfix">
							<a href="">
								<span class="icon"></span>
								<p>${iteamArr1.country[ii]}馆</p>
								<span class="gogogo">GO</span>
							</a>
						</li>`
//				}
//				[i].[k]
			}
			$(".djw_country-btn ul").append(foot)
			
			
			var country=["JA","US","NAL","AUA","HK","GBA","DEA","CH"];
			var s="";
			for (var i=0;i<country.length;i++){
			        s += `<div class="content-block store_${country[i]} ">
						<div class="countrystore-tit ">
							<i></i>日本馆<a class="link " href=" "><span>进入日本馆</span></a>
						</div>
						    
						<div class="goods-list-box ">
							<ul>
								<li class="first ">
									<div class="goods-img ">
										<a href=" ">
											<img src="img/ae01294216e9b6ca13d2f9ec68b04832e46b6c0e.jpg " alt=" " />
										</a>
									</div>
									<div class="goods-txt ">
										<div class="tit ">
											<a href=" ">【香沁水润 唇唇欲动】DHC 蝶翠诗 香氛滋润护唇膏 1.5g 两种香味可选 迷迭香</a>
										</div>
										<div class="price ">￥36.99</div>
									</div>
								</li>
								<li>
									<div class="goods-img ">
										<a href=" "><img src="img/7a100f33a8cf5ae8c46f10b813403911f179b494.jpg "/></a>
									</div>
									<div class="goods-txt ">
										<div class="tit ">
											<a href=" ">【国民去汗小白瓶】Deonatulle 天然魔芋晶石止汗棒 60g 杀菌</a>
										</div>
										<div class="price ">￥47.00</div>
									</div>
								</li>
								<li>
									<div class="goods-img ">
										<a href=" "><img src="img/7a100f33a8cf5ae8c46f10b813403911f179b494.jpg "/></a>
									</div>
									<div class="goods-txt ">
										<div class="tit ">
											<a href=" ">【国民去汗小白瓶】Deonatulle 天然魔芋晶石止汗棒 60g 杀菌</a>
										</div>
										<div class="price ">￥47.00</div>
									</div>
								</li>
								<li>
									<div class="goods-img ">
										<a href=" "><img src="img/7a100f33a8cf5ae8c46f10b813403911f179b494.jpg "/></a>
									</div>
									<div class="goods-txt ">
										<div class="tit ">
											<a href=" ">【国民去汗小白瓶】Deonatulle 天然魔芋晶石止汗棒 60g 杀菌</a>
										</div>
										<div class="price ">￥47.00</div>
									</div>
								</li>
								<li>
									<div class="goods-img ">
										<a href=" "><img src="img/7a100f33a8cf5ae8c46f10b813403911f179b494.jpg "/></a>
									</div>
									<div class="goods-txt ">
										<div class="tit ">
											<a href=" ">【国民去汗小白瓶】Deonatulle 天然魔芋晶石止汗棒 60g 杀菌</a>
										</div>
										<div class="price ">￥47.00</div>
									</div>
								</li>
								<div class="aaaaaaa "></div>
							</ul>
						</div>
					</div>`
			       
		   }
		    $(".djw_country-block").prepend(s);
       var iteamArr={"country":["日本","美国","新西兰","澳洲","中国香港","英国","德国","中国"],"number":[0,1,2,3,4,5,6,7]}
      
       console.log(iteamArr)
             let html = "";
            for (var c=0;c<iteamArr.country.length;c++) {
                html +=`<li class="iteam${iteamArr.number[c]} dingwei" style="background:url(http://img0.helper-sys.com/images/17/50/99e8885b2bf296e45d56be7d75f6ea5e552bd832.png?1512997752#h) 0 0 no-repeat;">
					 		<a href="">
					 			<div class="txt-box">
					 				${iteamArr.country[c]}
					 				<br />
					 				<span>点击查看</span>
					 			</div>
					 		</a>
					 	</li>`;
            }
           $(".djw_countrystore-list ul").append(html)
           
          
        $("#header").load("header.html",function(){
			$.getScript("js/header.js",function() {});
			$.getScript("js/cookie.js",function() {});
			$.getScript("js/jquery.cookie.js",function() {});
		});
		$("#footer").load("footer.html",function(){});      
})
