$(function() {
	//签到挣积分
	$(".user-bar>.user-head>.sign-in").click(function(){
		$.ajax({
			type:"get",
			url:"http://localhost:8080/userTotal/userTotal",
			dataType:"json",
			async:true,
			success:function(res){
				console.log(res);
				alert("签到成功");
				$(this).css("background","lightgray").text("今日已签到");
				var a = Number($(".myorder-msg").find(".point-count").text());
				$(".myorder-msg").find(".point-count").text(a+5);
			}
		});
	});
	var len = $(".list-tabbar>li").length;
	$(".user_img").click(showTop);
	$(".number").click(showTop);

	function showTop() {
		$(".list-con").hide();
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(".cash_out_wrap").hide();
		for(var i = 0; i < len; i++) {
			$(".list-con>li").hide();
		}
		$(".user-msg").show();
	}
	//点击设置用户名跳到个人信息页
	$(".hello-wrap .set-name").click(function(){
		$(".user-msg").hide();
		$(".list-con").show();
		$(".list-con>li").hide();
		$(".list-con>li").eq(6).show();
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(".list-tabbar>li").eq(6).find("a span").eq(0).addClass("bgColor");
		$(".list-tabbar>li").eq(6).find("a span").eq(1).addClass("textColor");

	});
	//点击设置用户名跳到个人信息页
	$(".hello-wrap .set-level").click(function(){
		$(".user-msg").hide();
		$(".list-con").show();
		$(".list-con>li").hide();
		$(".list-con>li").eq(7).show();
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(".list-tabbar>li").eq(7).find("a span").eq(0).addClass("bgColor");
		$(".list-tabbar>li").eq(7).find("a span").eq(1).addClass("textColor");


	});
	//四个logo点击跳转到对应页
	$(".myorder-msg").find(".unpaid-btn").click(function(){
		$(".user-msg").hide();
		$(".list-con").show();
		$(".list-con>li").hide();
		$(".list-con>li").eq(0).show();
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(".list-tabbar>li").eq(0).find("a span").eq(0).addClass("bgColor");
		$(".list-tabbar>li").eq(0).find("a span").eq(1).addClass("textColor");
		$(".order-list-class>li").removeClass("selected-active");
		$(".order-list-class>li").eq(1).addClass("selected-active");
		$(".order-list-content>li").hide();
		$(".order-list-content>li").eq(1).show();
		
	});
	$(".myorder-msg").find(".voucher-btn").click(function(){
		$(".user-msg").hide();
		$(".list-con").show();
		$(".list-con>li").hide();
		$(".list-con>li").eq(2).show();
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(".list-tabbar>li").eq(2).find("a span").eq(0).addClass("bgColor");
		$(".list-tabbar>li").eq(2).find("a span").eq(1).addClass("textColor");
		
	});
	$(".myorder-msg").find(".point-btn").click(function(){
		$(".user-msg").hide();
		$(".list-con").show();
		$(".list-con>li").hide();
		$(".list-con>li").eq(3).show();
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(".list-tabbar>li").eq(3).find("a span").eq(0).addClass("bgColor");
		$(".list-tabbar>li").eq(3).find("a span").eq(1).addClass("textColor");
		
	});
	$(".list-tabbar>li").click(showDiv);

	function showDiv() {
		$(".list-tabbar li").find("a span").removeClass("bgColor textColor");
		$(this).find("a span").eq(0).addClass("bgColor");
		$(this).find("a span").eq(1).addClass("textColor");
		$(".user-msg").hide();
		$(".cash_out_wrap").hide();
		$(".modify_pwd_wrap").hide();
		$(".modify_phonenum_wrap").hide();
		$(".ID-card-uploading_wrap").hide();
		$(".list-con").show();
		var index = $(this).index();
		
			$(".list-con>li").hide();
		
		$(".list-con>li:eq(" + index + ")").show();
		/*如果安全中心显示，则发送ajax请求获取所有用户信息*/
		var n;
		var safePassWord;
		if($(".list-con>li").eq(7).css("display") == "list-item") {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "http://localhost:8080/user/findUser",
				success: function(res) {
					// 用户手机
					var n = res.data.userPhone; //t.substr(0,3)+ "****" + t.substr(7,4)
					//用户密码
					var p = res.data.password;
					safePassWord = res.data.safePassword;
					if(safePassWord == "") {
						$("#set-security-pwd").click(showSafePwd);
					} else {
						$(".setSafePwd").html("建议您定期更换新的二级密码，提高安全性。").sibling().find("i").removeClass("icon-gantanhao").addClass("icon-right-1");
						$("#set-security-pwd").html("修改密码");
					}
					console.log(t);
					$("#yourConfirmNumber").html(n.substr(0, 3) + "****" + n.substr(7, 4));
					$("#identity-number").html(n.substr(0, 3) + "****" + n.substr(7, 4));
				}
			});
		}
	}
	$("#set-security-pwd").click(showSafePwd);
	//出现修改安全密码第一页
	var ee;

	function showSafePwd() {
		$(".setSafePwdStepWrap").show().find(".setSafePwdStep1").show();
		//模拟修改安全密码第二页出现
		$(".setSafePwdStep1").hide().next().show();
		$("#close2").click(function() {
			$(".setSafePwdStepWrap").hide();
		});
		$("#receiveCode").click(function() {
			//按钮倒计时
			var time = 60;
			$(this).attr("disabled", "true");
			$(this).addClass("receive-disabled");
			var that = this;
			var t = setInterval(function() {
				time--;
				$(that).html("重发验证码(" + time + "秒)");
				if(time == 0) {
					//清除计时器
					clearInterval(t);
					$("that").attr("disabled", "true");
					$("that").removeClass("receive-disabled").addClass("receive-normal");
					$("that").html("重发验证码");
				}
			}, 1000);
		});
		$("#close1").click(function() {
			$(".setSafePwdStepWrap").hide();
		});
		//安全密码获取验证码
		$.ajax({
			type: "get",
			url: "http://localhost:8080/user/sendCodeForFindPwd",
			dataType: "json",
			async: true,
			data: {
				phone: $("#yourConfirmNumber").val()
			},
			success: function(res) {
				ee = res.data;
			}
		});
		$(".setSafePwdStep1 .confirm-btn").click(function() {
			if($(".setSafePwdStep1 input").val() != ee) {
				$(".receivedCodeHint").show();
			} else {
				//验证码填写正确跳到第二页
				$(".setSafePwdStep1").hide().next().show();
				$(".setSafePwdStep2 .confirm-btn").click(ToStep3);
				$("#close2").click(function() {
					$(".setSafePwdStepWrap").hide();
				});
			}
		});
		var reg3 = /^%d{6}$/;

		function ToStep3() {
			if($("#sixSafePwd1").val().length < 6 || $("#sixSafePwd2").val().length < 6 || reg3.test($("#sixSafePwd2").val()) == false) {
				$(".setSafePwdStep2>.errorHint>div").eq(1).html("请设置6位数字密码!").parent().show().delay(2000).hide(0);
			} else if($("#sixSafePwd1").val() != $("#sixSafePwd2").val()) {
				$(".setSafePwdStep2>.errorHint>div").eq(1).html("前后输入密码不一致").parent().show().delay(2000).hide(0);
			} else {
				$(".setSafePwdStep2").hide();
				$(".setRightHint").show().delay(2000).hide(0).parent().delay(2000).hide(0);
				//安全密码修改成功发送ajax请求
				$.ajax({
					type: "get",
					url: "",
					async: true,
					dataType: "json",
					data: {
						safePassword: $("#sixSafePwd1").val
					},
					success: function(res) {
						console.log(res);
					}
				});
			}
		}
		$(".setSafePwdStep2 .confirm-btn").click(ToStep3);

	}
	$(".myorder-msg>li").hover(colorChange, colorBefore);

	function colorChange() {
		$(".myorder-msg>li>a>span:first-child").css("border", "1px solid #9b9b9b").find("i").css("color", "#9b9b9b");
		$(this).find("a>span:first-child").css("border", "1px solid #eb5a41").find("i").css("color", "#eb5a41");
		$(".myorder-msg>li>a").find(".list-name").css("text-decoration", "none");
		$(this).find("a").find(".list-name").css("text-decoration", "underline");
	}

	function colorBefore() {
		$(".myorder-msg>li>a>span:first-child").css("border", "1px solid #9b9b9b").find("i").css("color", "#9b9b9b");
		$(this).find("a").find(".list-name").css("text-decoration", "none");
	}
	$(".recent-order").find(".order-status").hover(function() {
		$(".recent-order").find(".order-status-dropdown").show().animate({
			height: 182
		}, 500);
		$(".recent-order").find(".order-status .arrow").css("transform", "rotateZ(" + 180 + "deg) translateY(" + 4 + "px)");
	}, function() {
		$(".recent-order").find(".order-status-dropdown").animate({
			height: 0
		}, 500).hide();
	});
	$(".recent-order").find(".order-status-dropdown>li").hover(function() {
		$(this).css("background", "lightgray");
	}, function() {
		$(this).css("background", "white");
	});
	$(".recent-order").find(".order-status-dropdown>li").click(showOrderStus);

	function showOrderStus() {
		$(".recent-order").find(".status-con").text($(this).find("a").text()).next().hide();
		$("<span></span>").addClass("arrow").appendTo($(".recent-order").find(".status-con"));
	}

	$(".order-list-class>li").click(showOrderClass);

	function showOrderClass() {
		$(".order-list-class>li").removeClass("selected-active");
		$(this).addClass("selected-active");
		$(".order-list-content>li").hide();
		$(".order-list-content>li").eq($(this).index()).show();
	}
	console.log($(".order-list-content>li").length);
	//遍历
	$(".order-list-content>li").each(function(i) {
		var flag1 = true;
		var that = this;
		$(this).find(".classify-con").click(showClassify);

		function showClassify() {
			if(flag1 == true) {
				$(that).find(".classify-con .arrow").css("transform", "rotateZ(" + 180 + "deg) translateY(" + 4 + "px)");
				$(that).find(".classify-method").slideDown();
			} else {
				$(that).find(".classify-con .arrow").css("transform", "translateY(-" + 1 + "px) rotateZ(" + 0 + "deg)");
				$(that).find(".classify-method").slideUp();
			}
			flag1 = !flag1;
		}
		$(this).find(".classify-method li").click(showClassifyCon);

		function showClassifyCon() {
			$(that).find(".classify-con").text($(this).text());
			$("<span></span>").addClass("arrow").appendTo($(that).find(".classify-con"));
			$(that).find(".classify-method li").css("background", "#f2f2f2");
			$(this).css("background", "lightgrey").parent().slideUp();
		}
		$(that).find(".classify-method li").mouseout(function() {
			setTimeout(function() {
				$(that).find(".classify-method").slideUp();
			}, 3000);
		});
		var flag2 = true;
		$(that).find(".advanced-filter").click(showAdFilter);

		function showAdFilter() {
			if(flag2 == true) {
				$(that).find(".order-time-wrap").show();
				$(that).find(".advanced-filter .arrow").css("transform", "rotateZ(" + 180 + "deg) translateY(" + 4 + "px)");
				var flag3 = true; //true点击下拉出现 false上拉隐藏
				$(that).find(".order-time-con").click(showOrderTime);
				var i = 0;

				function showOrderTime() {
					if(flag3 == true) {
						$(that).find(".order-time").slideDown();
						flag3 = false;
						$(that).find(".order-time-con .arrow").css("transform", "rotateZ(" + 180 + "deg) translateY(" + 4 + "px)");
						$(that).find(".order-time li").eq(i).css("background", "lightgray").siblings().css("background", "white");
						$(that).find(".order-time li").hover(function() {
							if($(this).index() == i) {
								return;
							}
							$(this).css("background", "#f2f2f2");
						}, function() {
							if($(this).index() == i) {
								return;
							}
							$(this).css("background", "white");
						}).click(function() {
							$(that).find(".order-time-con").text($(this).text());
							$("<span></span>").addClass("arrow").appendTo($(that).find(".order-time-con"));
							$(this).css("background", "lightgray").parent().slideUp();
							i = $(this).index();
							$(that).find(".order-time-con .arrow").css("transform", "translateY(-" + 1 + "px) rotateZ(" + 0 + "deg)");
							flag3 = true;
						});

					} else {
						console.log(flag3);
						$(that).find(".order-time").slideUp();
						$(that).find(".order-time-con .arrow").css("transform", "translateY(-" + 1 + "px) rotateZ(" + 0 + "deg)");
						flag3 = true;
					}
				}
			} else {
				$(that).find(".order-time-wrap").hide();
				$(that).find(".advanced-filter .arrow").css("transform", "translateY(-" + 1 + "px) rotateZ(" + 0 + "deg)");
			}
			flag2 = !flag2;
		};
		$(that).find(".order-status").hover(function() {
			$(that).find(".order-status-dropdown").show().animate({
				height: 182
			}, 500);
			$(that).find(".order-status .arrow").css("transform", "rotateZ(" + 180 + "deg) translateY(" + 4 + "px)");
		}, function() {
			$(that).find(".order-status-dropdown").animate({
				height: 0
			}, 500).hide();
		});
		$(that).find(".order-status-dropdown>li").hover(function() {
			$(this).css("background", "lightgray");
		}, function() {
			$(this).css("background", "white");
		});
		$(that).find(".order-status-dropdown>li").click(showOrderStus);

		function showOrderStus() {
			$(that).find(".status-con").text($(this).find("a").text()).next().hide();
			$("<span></span>").addClass("arrow").appendTo($(that).find(".status-con"));
		}
	});

	//我的收益
	$(".explain").each(function(i) {
		$(this).hover(function() {
			$("#explain" + (i + 1)).show();
		}, function() {
			$("#explain" + (i + 1)).hide();
		});
	});
	//点击去提现跳转到去提现
	$("#goto_cash_out_wrap").click(showCashOut);

	function showCashOut() {
		$(".cash_out_wrap").show();
		$(".list-con").hide();
		$(".user-msg").hide();
	}
	//我的代金券部分
	$(".my-voucher>.topbar>li").click(showVoucherClass);

	function showVoucherClass() {
		$(".my-voucher>.topbar>li").removeClass("selected_active");
		$(this).addClass("selected_active");
		$(".my-voucher>div").hide();
		$(".my-voucher>div").eq($(this).index()).show();
	}
	//售后服务部分
	$(".my-afterService>.topbar>li").click(showAfterClass);

	function showAfterClass() {
		$(".my-afterService>.topbar>li").removeClass("selected_active");
		$(this).addClass("selected_active");
		$(".my-afterService>div").hide();
		$(".my-afterService>div").eq($(this).index()).show();
	}
	//我的消息部分
	$(".my-message>.topbar>li").click(showMessageClass);

	function showMessageClass() {
		$(".my-message>.topbar>li").removeClass("selected_active");
		$(this).addClass("selected_active");
		$(".my-message>div").hide();
		$(".my-message>div").eq($(this).index()).show();
	}
	//安全中心页面
	//点击修改密码跳到修改密码页
	$("#modify-pwd").click(showModifyPwd);

	function showModifyPwd() {
		$(".modify_pwd_wrap").show();
		$(".list-con").hide();
		$(".user-msg").hide();
	}
	//判断旧密码格式是否正确，如果为空提示请输入密码，不为空判断是否与原密码相同
	function oldPwdIsCorrrect() {
		if($("#oldPassword").val() == "") {
			$(".old_pwd_wrap .oldPwdHint").html("请填写旧密码").show();
		} else {
			$(".old_pwd_wrap .oldPwdHint").hide();
			return true;
		}
	}
	var reg1 = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
	//判断新密码格式是否正确，如果为空则提示请填写新密码，由6-20个字母、数字和符号至少两种的组合，如果小于6,提示小于6，大于6判断格式是否正确
	function newPwdIsCorrect() {
		if($("#newPassword").val() == "") {
			$(".new_pwd_wrap .newPwdHint").html("请填写新密码，由6-20个字母、数字和符号至少两种的组合").show();
		} else if($("#newPassword").val().length < 6) {
			$(".new_pwd_wrap .newPwdHint").html("输入不正确，最少6个字符").show();
		} else if(reg1.test($("#newPassword").val()) == false) {
			$(".new_pwd_wrap .newPwdHint").html("密码仅能为6-20个字母、数字和符号至少两种的组合").show();
		} else {
			$(".new_pwd_wrap .newPwdHint").hide();
			return true;
		}
	}
	//判断两次输入密码是否相同
	function isPwdDifferent() {
		if($("#confirmNewPassword").val() != $("#newPassword").val()) {
			$(".same_pwd_wrap .samePwdHint").html("两次密码输入不相符，请重新输入").show();
		} else {
			$(".same_pwd_wrap .samePwdHint").hide();
			return true;
		}
	}
	//ajax修改密码
	$("#modify-btn").click(modifyOldpwd);

	function modifyOldpwd() {
		var x = oldPwdIsCorrrect();
		var y = newPwdIsCorrect();
		var z = isPwdDifferent();
		console.log(x, y, z);
		if(x && y && z) {
			$.ajax({
				type: "get",
				url: "http://localhost:8080/user/updatePasswordFor",
				data: {
					oldPassword: $("#oldPassword").val(),
					newPassword: $("#newPassword").val()
				},
				success: function(res) {
					console.log(res);
				}
			});
		}
	}
	//点击修改手机号跳转到修改手机号页
	$("#modify-num").click(showModifyNum);

	function showModifyNum() {
		$(".modify_phonenum_wrap").show();
		$(".list-con").hide();
		$(".user-msg").hide();
	}
	//身份验证页面点击按钮
	var aa, bb;
	$("#identity-send-btn1").click(function() {
		//按钮倒计时
		var time = 120;
		$(this).attr("disabled", "true");
		$(this).addClass("identity-disabled");
		var that = this;
		var t = setInterval(function() {
			time--;
			$(that).html("重发验证码(" + time + "秒)");
			if(time == 0) {
				//清除计时器
				clearInterval(t);
				$("that").attr("disabled", "true");
				$("that").removeClass("identity-disabled").addClass("identity-normal");
				$("that").html("重发验证码");
			}
		}, 1000);
		//发送ajax请求获取短信验证码
		$.ajax({
			type: "get",
			url: "http://localhost:8080/user/sendCodeForFindPwd",
			async: true,
			dataType: "json",
			data: {
				"phone": $("#identity-number").val()
			},
			success: function(res) {
				aa = res.errorcode;
				bb = res.data; //后台发送过来的短信验证码
			}
		});
	});
	//跳到身份验证页面
	$(".identity-submit").click(function() {
		if($("#confirmCode1").val() == "" && $("#confirmCode1").val() != bb) {
			$(".confirmCodeHint").show();
		} else {
			$(".confirmCodeHint").hide();
			$(".identity-confirm").hide().next().show();
			$(".modify_phonenum_wrap>h3").html("手机验证");
			$(".process-con>li").eq(1).addClass("text-color").siblings().removeClass("text-color");
			$("#circle2").addClass("border_color_active");
			$("#circle1").removeClass("border_color_active");
		}
	});
	//	//假设身份验证页面已出现
	//	$(".confirmCodeHint").hide();
	//	$(".identity-confirm").hide().next().show();
	//	$(".modify_phonenum_wrap>h3").html("手机验证");
	//	$(".process-con>li").eq(1).addClass("text-color").siblings().removeClass("text-color");
	//	$("#circle2").addClass("border_color_active");
	//	$("#circle1").removeClass("border_color_active");
	//身份验证页面点击发送验证码
	var reg2 = /^1[3-9]\d{9}$/;
	var cc;
	/*判断新手机号码格式是否正确*/
	function afterIdentityNumRight() {
		if($("#newIdentityNum").val() == "") {
			$(".number-after .afterNumHint").show();
		} else if(reg2.test($("#newIdentityNum").val()) == false) {
			$(".number-after .afterNumHint").html("请填写正确的手机号码").show();
		} else {
			$(".number-after .afterNumHint").hide();
			return true;
		}
	}
	$("#identity-send-btn2").click(function() {
		var afterFlag = afterIdentityNumRight();
		if(afterFlag == true) {
			//当手机号格式正确后按钮才倒计时并且发送ajax请求
			$(".number-after .afterNumHint").hide();
			//按钮倒计时
			var time = 120;
			$(this).attr("disabled", "true");
			$(this).addClass("identity-disabled");
			var that = this;
			var t = setInterval(function() {
				time--;
				$(that).html("重发验证码(" + time + "秒)");
				if(time == 0) {
					//清除计时器
					clearInterval(t);
					$("that").attr("disabled", "true");
					$("that").removeClass("identity-disabled").addClass("identity-normal");
					$("that").html("重发验证码");
				}
			}, 1000);
			//发送ajax请求获取短信验证码
			$.ajax({
				type: "get",
				url: "http://localhost:8080/user/sendCodeForFindPwd",
				async: true,
				dataType: "json",
				data: {
					"newPhone": $("#newIdentityNum").val()
				},
				success: function(res) {
					cc = res.data;
				}
			});
		}

	});
	$(".newIdentity-submit").click(function() {
		var afterFlag = afterIdentityNumRight();
		if($("#confirmCode2").val() == "" && $("#confirmCode2").val() != cc) {
			$(".confirmCodeHint2").show();
		} else if(afterFlag == false) {
			return false;
		} else {
			$(".newIdentityNumConfirm").hide();
			$(".bindSuccessWrap").show();
			$(".process-con>li").eq(2).addClass("text-color").siblings().removeClass("text-color");
			$("#circle3").addClass("border_color_active");
			$("#circle2").removeClass("border_color_active");
		}

	});
	$("#add-IDCard").click(function(){
		$(".ID-card-uploading_wrap").show();
		$(".list-con").hide();
		$(".user-msg").hide();
	});
	$("#header").load("header.html",function(){
		$.getScript("js/header.js",function() {});
		$.getScript("js/cookie.js",function() {});
		$.getScript("js/jquery.cookie.js",function() {});
	});
	$("#footer").load("footer.html",function(){});
});