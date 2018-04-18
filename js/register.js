$(function() {
	/*标记箭头是否已经点击 true 没有点击*/
	var arrow_flag = true;
	$(".arrow").click(function() {
		/*没有点击时*/
		if(arrow_flag == true) {
			/*下拉菜单向下滑动出现*/
			$(".dropdown").slideDown().css({
				"border": "1px solid #eb5a41",
				"border-top": "none",
				"border-bottom": "none",
				"background": "white"
			}).next().css("transform", "rotateZ(" + 180 + "deg) translateY(-" + 5 + "px)").parent().css({
				"border": "1px solid #eb5a41",
				"border-bottom": "none"
			});
			/*选择所在国家字体颜色变红*/
			$(".choose").css("color", "#eb5a41");
			arrow_flag = false;
		} else {
			$(".dropdown").slideUp().next().css("transform", "translateY(" + 0 + "px) rotateZ(" + 0 + "deg)").parent().css("border", "1px solid #e4e4e4");
			$(".choose").css("color", "#a3a3a5");
			arrow_flag = true;
		}
	});
	var phone_flag;
	/*下拉菜单hover时背景颜色改变 点击时颜色与hover颜色不同*/
	$(".dropdown>li").hover(function() {
		$(this).css("background", "#f4f4f4").siblings().css("background", "white");
	}).click(function() {
		$(this).addClass("grey");
		$(".con").html($(this).html()).next().slideUp().next().css("transform", "translateY(" + 0 + "px) rotateZ(" + 0 + "deg)").parent().css("border", "1px solid #e4e4e4");
		$(".choose").css("color", "#a3a3a5");
		arrow_flag = true;
		if($(this).index() > 0) {
			$(".num-holder").html("请输入邮箱");
			$(".isCorrect").hide();
			$(".message").hide();
			phone_flag = 0;
		} else {
			$(".num-holder").html("请输入手机号");
			$(".isCorrect").hide();
			$(".message").show();
			phone_flag = 1;
		}
	});

	$(".phone-wrap").click(function() {
		$(".num-holder").addClass("active-holder").animate({
			left: "16px",
			top: "-8px"
		}, 200);
		document.getElementById("num").focus();
		$(this).addClass("active-border");
	});

	$("#num").blur(function() {
		if(phone_flag == 0) {
			isMailNo();
		} else {
			isPhoneNo();
		}
		if($("#num").val() == "") {
			$(".num-holder").removeClass("active-holder").animate({
				left: "16px",
				top: "15px"
			}, 200).parent().removeClass("active-border");
		}
	});
	
	var reg1 = /^1[3-9]\d{9}$/;
	function isPhoneNo() {
		if($("#num").val() != "" && reg1.test($("#num").val()) == false) {
			$(".isCorrect").show().html("请正确输入手机号");
		} else {
			$(".isCorrect").hide();
		}
	}
	
	var reg2 = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z])+$/;
	function isMailNo() {
		if($("#num").val() != "" && reg2.test($("#num").val()) == false) {
			$(".isCorrect").show().html("请正确输入 邮箱地址");
		} else {
			$(".isCorrect").hide();
		}
	}

	$(".msg-wrap").click(function() {
		$(".msg-holder").addClass("active-holder").animate({
			left: "16px",
			top: "-8px"
		}, 200);
		document.getElementById("msg").focus();
		$(this).addClass("active-border");
	});
	$("#msg").blur(function() {
		if($("#msg").val() == "") {
			$(".msg-holder").removeClass("active-holder").animate({
				left: "16px",
				top: "15px"
			}, 200).parent().removeClass("active-border");
		}
	});
	$(".confirm").click(function() {
		if($("#num").val() == "") {
			$(".isCorrect").show().html("请输入手机号");
		} else if(reg1.test($("#num").val()) == false) {
			$(".isCorrect").html("请正确输入手机号");
		} else {
			$(".isCorrect").hide();
			var time = 120;
			$(this).attr("disabled", "true");
			$(this).addClass("confirm-disabled");
			var t = setInterval(function() {
				time--;
				$(".confirm").html("获取短信验证码(" + time + "秒)");
				if(time == 0) {
					//清除计时器
					clearInterval(t);
					$(".confirm").attr("disabled", "true");
					$(".confirm").addClass("confirm-normal");
					$(".confirm").html("重新获取短信验证码");
				}
			}, 1000);
		}

	});
	$(".pwd-wrap").click(function() {
		$(".pwd-holder").addClass("active-holder").animate({
			left: "16px",
			top: "-8px"
		}, 200);
		document.getElementById("pwd").focus();
		$(this).addClass("active-border");
	});
	$("#pwd").blur(function() {
		if($("#pwd").val() == "") {
			$(".pwd-holder").removeClass("active-holder").animate({
				left: "16px",
				top: "15px"
			}, 200).parent().removeClass("active-border");
		} else {
			isPwdNo();
		}

	});
	var reg3 = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;

	function isPwdNo() {
		if($("#pwd").val() != "" && $("#pwd").val().length <= 6) {
			$(".isLong").show();
		} else {
			$(".isLong").hide();
			if(reg3.test($("#pwd").val()) == false) {
				$(".isLong").hide();
				$(".isPwd").show();
				setTimeout(function() {
					$(".isPwd").hide();
				}, 3000);
			}
		}
	}
	var agree_flag = true;
	$("#agree").click(function() {
		if(agree_flag == true) {
			$(this).css({
				backgroundPosition: "-59px -262px"
			});
			agree_flag = false;
		} else {
			$(this).css({
				backgroundPosition: "-78px -262px"
			});
			agree_flag = true;
		}
	});
	/*获取验证码*/
	$(".confirm").click(function() {
		$.ajax({
			type: "get",
			url: "http://localhost:8080/user/sendCodeForRegister",
			async: true,
			dataType:"json",
			data: {
				"phone": $("#num").val()
			},
			success:function(res){
				console.log(res);
				console.log(res.data);
			}
			
		});
	});
	/*提交*/
	$("#register").click(function() {
		/*判断是输入手机号还是邮箱并判断是空还是格式不正确*/
		 function phone_right() {
			if(phone_flag == 0) {
				if($("#num").val() == "") {
					$(".isCorrect").show().html("请填写邮箱地址");
				} else if(reg2.test($("#num").val()) == false) {
					$(".isCorrect").show().html("请正确输入邮箱地址");
				} else {
					return true;
				}
			} else {
				if($("#num").val() == "") {
					$(".isCorrect").show().html("请输入手机号，11个字符");
				} else if(reg1.test($("#num").val()) == false) {
					$(".isCorrect").show().html("请正确输入手机号");
				} else {
					return true;
				}
			}
		}

		 function pwd_right() {
			/*判断密码是否为空并检查格式是否正确*/
			if($("#pwd").val() == "") {
				$(".isLong").show().html("请填写密码，6-20个字符");
			} else if($("#pwd").val().length <= 6) {
				$(".isLong").show().html("输入不正确，最少6个字符");
			} else {
				$(".isLong").hide();
				if(reg3.test($("#pwd").val()) == false) {
					$(".isLong").hide();
					$(".isPwd").show();
					setTimeout(function() {
						$(".isPwd").hide();
					}, 3000);
				} else {
					return true;
				}
			}
		}
		function agree_right() {
			if(agree_flag == false) {
				$(".isAgree").show();
			} else {
				return true;
			}
		}
		var a = phone_right();
		var b = pwd_right();
		var c = agree_right();
		if(a && b && c) {
			$.ajax({
				type: "post",
				url: "http://localhost:8080/user/register",
				async: true,
				data: {
					userPhone: $("#num").val(),
					code: $("#msg").val(),
					"password": $("#pwd").val()
				},
				success: function(res) {
					console.log(res);
					window.location.href = "index.html";
				}
			});
		}
		return false;
	});
});