

//另
$(function() {

	$.ajax({
		type: "get",
		url: "http://localhost:8080/goodsBrand/findGoodsBrand",
		async: true,
		success: function(data) {
			addss(data);
		},
		error: function() {
			console.log("2");
		}
	});
	$.ajax({
		type: "post",
		url: "http://localhost:8080/list/staticList",
		dataType: "json",
		async: true,
		success: function(data) {
			console.log(data)
			parse(data);
		},
		error: function() {
			console.log("失败");
		}
	});

	function parse(data) {
		var Dl = "";
		var dll = "";
		obj = data.goodsType01List;
		
		for(let i = 0; i < obj.length; i++) {
			dll = obj[i].goodsType01Name;
			var mulu = "";
			for(var j = 0; j < obj[i].goodsType02List.length; j++) {
				mulu += `<li id="two-${obj[i].goodsType02List[j].goodsType02Id}">
				${obj[i].goodsType02List[j].goodsType02Name}</li>`;
			}
			Dl += `<dl>
								<dt id="one-${obj[i].goodsType01Id}">${dll}</dt>
								<dd>
									<ul>
						       ${mulu}
									</ul>
								</dd>
							</dl>`;
			
		}
		$(".classify-inner").append(Dl);
		$(".classify-inner dl dd ul li").each(function(i){
		$(this).click(function(){
			console.log(i);
		  $.ajax({
		  	type:"get",
		  	url:"http://localhost:8080/goodsBrand/findGoodsBrandByCondition",
		  	async:true,
		  	data:{
		  		'goodsType02Id': i+1
		  	},
		  	success:function(res){
		 
		  		addss(res);
		  	}
		  });
		})
	})
	}

	
	
	
	
	addss = function(data) {
		var mainT = "";
		let mainDl = "";
		let Dl = "";
		let a1 = "";	
		if(data.errorcode == 0) {
			for(var key in data.goodsBrandList) {
				mainT += `<a href='javascript:void(0)'>${key}</a>`;
				a1 = ``;
				for(var i = 0; i < data.goodsBrandList[key].length; i++) {
					a1 += `<li><a href="brand-detail.html?${data.goodsBrandList[key][i].goodsBrandId}">${data.goodsBrandList[key][i].goodsBrandName}</a></li>`;
				}
				Dl += `<dl><dt id="brand-${key}">${key}</dt><dd><ul>${a1}</ul></dd></dl>`;
			}
		  $(".brand-main .brand-main-top .brand-mainT-inner a").remove();
		  $(".brand-main dl").remove();
			$(".brand-mainT-inner").append(mainT);
			$(".brand-main").append(Dl);

		}

		var sTop;
		var mainTop = $(".brand-mainT-inner").offset().top;
		$(document).scroll(function() {
			sTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(sTop >= mainTop) {
				$(".brand-mainT-inner").css('position', 'fixed');
			} else {
				$(".brand-mainT-inner").css('position', 'absolute');
			}
			var a = $(".brand-main dl");
			var aa = document.querySelectorAll(".brand-main")[0].querySelectorAll("dl");
			for(var i = 0; i < a.length; i++) {
				var a1 = a.eq(i).offset().top;
				var b1 = $(".brand-mainT-inner").offset().top + $(".brand-mainT-inner").outerHeight() + 20;
				if(a1 < b1) {
					$(".brand-mainT-inner a").eq(i).addClass("active").siblings().removeClass("active");
				} else {
					$(".brand-mainT-inner a").eq(i).removeClass("active");
				}
			}

		});

		$(".brand-mainT-inner a").each(function(i) {
			$(this).click(function() {
				var tt = $(".brand-main dl").eq(i).offset().top - 96;
				console.log(tt);
				console.log(i);
				window.scrollTo(0, tt);
			})
		});

	}
    
	$(".classify-top a").click(function(){
		location.reload()
		
		
	})






});
$(function(){
				$("#header").load("header.html",function(){
					$.getScript("js/header.js",function() {});
					$.getScript("js/cookie.js",function() {});
					$.getScript("js/jquery.cookie.js",function() {});
				});
				$("#footer").load("footer.html",function(){});
})