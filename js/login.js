$(function(){
	$(".zm_top div").click(function(){
		$(this).find("a").addClass("zm_a-active").parent().siblings().find("a").removeClass("zm_a-active");
		$(this).find("span").addClass("zm_span-active").parent().siblings().find("span").removeClass("zm_span-active");
		$(".zm_r").eq($(this).index()).show().siblings().hide();
		$(".zm_inp p").css({
			top:"20px",
			color:"lightgray",
		});
		$(".zm_inp input").css("border","1px solid lightgray");
		
		if($(".zm_pwd-user input").val() != ""){
			$(".zm_pwd-user p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white"
			})
		}
		
		if($(".zm_number").val() != ""){
			$(".zm_number").siblings("p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white",
			})
		}
	});
	
	
	$(".zm_inp").click(function(){
		
		$(this).find("input").css("border","1px solid #E35939").parent().siblings().find("input").css("border","1px solid lightgray")
		if($(".zm_text input").val() == ""){
			$(this).find("p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white"
				
			}).parent().siblings().find("p").css({
				top:"20px",
				color:"lightgray",
			})
		}else{
			$(this).find("p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white"
			})
		}
		
		if($(".zm_number").val() == ""){
			$(this).siblings("p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white"
			}).parent().siblings().find("p").css({
				top:"20px",
			})
		}else{
			$(".zm_number").siblings("p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white"
			})
		}
		
	});
	
	
	var flag = true;
	$(".zm_remeber span").attr("check","checked");
	$(".zm_remeber span").mouseover(function(){
		$(this).css({
			boxShadow:"0 0 2px lightgray",
		})
	}).mousedown(function(){
		
		if(flag){
			$(this).css({
				backgroundPosition:"-59px -262px",
				
			})
			flag = false;
			$(this).attr("check","unchecked");
		}else{
			$(this).css({
				backgroundPosition:"-116px -262px",
			})
			flag = true;
			$(this).attr("check","checked");
		}
		
		
	});
	

	
	
	var email = /^[\w-\.]+@[\w-]+(\.[\w-]+)+$/;
	var mobil = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
	var use = /^[a-zA-Z][0-9a-zA-Z_]{5,17}$/;
	var pwd = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
	
	
	function exciseUser(){
		$(".zm_pwd-user input").change(function(){
			if (email.test($(this).val()) || mobil.test($(this).val()) || use.test($(this).val())) {
				return true;
				
			}else{
				$("<span>").text("请输入正确的手机号").css({
					color:"red",
					font:"12px serif",
				}).appendTo($(".zm_pwd-user"));
			}
		});
		
	}
	exciseUser()
	function excisePwd(){
		$(".zm_pwd-in input").change(function(){
			if (pwd.test($(this).val())) {
				return true;
			}else{
				$("<span>").text("请输入正确的密码").css({
					color:"red",
					font:"12px serif",
				}).appendTo($(".zm_pwd-in"));
			}
		})
	}
	excisePwd()
	function excisePh(){
		$(".zm_number").change(function(){
			if (mobil.test($(this).val())) {
				return true;
			}else{
				$("<span>").text("请输入正确的手机号").css({
					color:"red",
					font:"12px serif",
				}).appendTo($(".zm_number1"));
			}
		})
	}
	excisePh()
	
		$(".zm_login-bottom-e input").eq(0).click(function(){
			if (pwd.test($(".zm_pwd-in").val())==false && pwd.test($(".zm_pwd-user input").val())==false) {
				console.log($(".zm_remeber span").eq(0).attr("check"));
				console.log($(".zm_remeber span").eq(1).attr("check"));
				if($(".zm_remeber span").eq(0).attr("check")=="checked"){
					$.cookie("user", $(".zm_username").val());
					$.cookie("pwd", $(".zm_password").val());
					console.log($.cookie("user"));
				}else{
					$.cookie("user",null);
					$.cookie("pwd",null);
					console.log($.cookie("user"));
				}
				if($(".zm_remeber span").eq(1).attr("check")=="checked" ){
					$.cookie("autologin",true,{ expires: 14 });
					$.cookie("user", $(".zm_username").val(),{ expires: 14 , path: '/'});
					$.cookie("pwd", $(".zm_password").val(),{ expires: 14 , path: '/'});
				}else{
					$.cookie("autologin",null);
				}
				$.ajax({
					type:"get",
					dataType:"json",
					url:"http://localhost:8080/user/login",
					data:{
						user: $(".zm_pwd-user input").val(),
						"password":$(".zm_pwd-in input").val(),
					},
					 success:function(res){
					 	console.log(res)
					 	if(res.errorcode == 0 ){
					 		alert("登陆成功");
				 		    window.location.href = "index.html";	
					 	}
					 	
					 },
					
				})
			}
			

		});
		
//		$(".zm_number2 .zm_code").submit(function(){
//			$.ajax({
//				type: "get",
//				url:"http://10.80.13.90:8080/user/sendCode",
//				data:{
//					phone:$(".zm_ph input").val(),
//				},
//				success
//				
//			})
//		})
	$(".zm_number1 input").change(function(){
		
		console.log(mobil.test($(this).val()))
		if (mobil.test($(this).val())) {
			$(".zm_number2 input").eq(1).click(function(){
				
				
				var num = 120;

	
				var timer = setInterval(function(){
					num--;
					console.log(num)
					$(".zm_number2 input").eq(1).val(num+"s后重发");
					if (num == 0) {
						$(".zm_number2 input").eq(1).val("重新发送");
						clearInterval(timer);
					};
				},1000);
				
				
					var check;
					$.ajax({
						type:"get",
						url:"http://10.80.13.90:8080/user/sendCodeForPhoneLogin",
						data:{
							phone:$(".zm_number1 input").val(),
						},
						dataType:"json",
						success:function(res){
							var result5 = res;
							$(".zm_login-bottom-r input").click(function(){
								console.log(result5.data)
								if (result5.data == $(".zm_number2 input").val()) {
									$.ajax({
										type:"get",
										async:false,
										url:"http://10.80.13.90:8080/user/loginByPhone",
										data:{
											userPhone:$(".zm_number1 input").val(),
										},
										success:function(res){
											if(res.errorcode == 0 ){
					 						alert("登陆成功");
				 		    					window.location.href = "index.html";	
					 						}
										}
							
									})
									
								}
							})
							
						}
					})
//					if(check == "登陆成功"){
//						window.location.href = "index.html"; 
//					}
				
//				addCookie(User,$(".zm_pwd-user").val(),1209600)
//				addCookie(Pwd,$(".zm_pwd-in").val(),1209600)
			});
		}else{
			alert("输入正确的手机号");
		}
		})
		
		
//		if (hasCookieWithKey(User) && hasCookieWithKey(Pwd)) {
//			$(".zm_pwd-user").val(getCookieWithKey(User))
//			$(".zm_pwd-in").val(getCookieWithKey(Pwd))
			
			
//		}
	
});
$(function(){
	if($.cookie("user")!="null"){
		$(".zm_username").val($.cookie("user"));
		$(".zm_pwd-user p").css({
				top:"-6px",
				color: "#E35939",
				backgroundColor:"white"
		})
	}else if($.cookie("user")=="null"){
			$(".zm_username").val("");
		}
})

$(function(){
	$(".passport-btn-close").click(function(){
			console.log("1");
			$(".passport-container").css("display","none");
			$(".ljq_shadow2").css("display","none");
		})
})
