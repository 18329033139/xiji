$(function() {
	var mobil = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
	var use = /^[a-zA-Z][0-9a-zA-Z_]{5,17}$/;
	$(".zm_rem input").click(function() {
		if(mobil.test($(".zm_name input").val()) == false) {
			alert("错误");
		} else {
			$.ajax({
				type: "get",
				url: "http://localhost:8080/user/findPassword",
				dataType:"json",
				data: {
					user_string: $(".zm_name input").val(),
				},
				success: function(res) {
					var result = res;
					console.log(result);
					console.log(result.errorcode);
					if(result.errorcode == 0) {
						if(mobil.test($(".zm_name input").val())) {
							$(".zm_Pwd").hide();
							$(".zm_identity").show();

							$(".zm_gress").css({
								width: "71%",
							});
							$(".zm_second-r").find("span").css({
								background: "#5B8E00"
							}).siblings().css({
								color: "#5B8E00",
							});

							$(".zm_method span").html("手机号验证");
							var arr = $(".zm_name input").val();

							$(".zm_phone-num span").html(arr.substr(0, 3) + "***" + arr.substr(7, 4));
						} else if(use.test($(".zm_name input").val())) {
							$(".zm_Pwd").hide();
							$(".zm_identity").show();

							$(".zm_gress").css({
								width: "71%",
							});
							$(".zm_second-r").find("span").css({
								background: "#5B8E00"
							}).siblings().css({
								color: "#5B8E00",
							});
							$(".zm_method span").html("用户名验证");
							var arr = $(".zm_name input").val();
							$(".zm_phone-num span").html(arr);
						}
						
						

						$(".zm_Code input").eq(1).click(function() {
							
							
							var num = 120;

	
							var timer = setInterval(function(){
								num--;
								console.log(num)
								$(".zm_Code input").eq(1).val(num+"s后重发");
								if (num == 0) {
									$(".zm_Code input").eq(1).val("重新发送");
									clearInterval(timer);
								};
							},1000);
								
							
							
							
							$.ajax({
								dataType:"json",
								type: "get",
								url: "http://localhost:8080/user/sendCodeForFindPwd",
								data: {
									phone: $(".zm_name input").val(),
								},
								success: function(res) {
									var result1 = res;
									console.log(result1)
									$(".zm_next a").click(function() {
										if(result1.data == $(".zm_Code input").val()){
											$(".zm_identity").hide();
											$(".zm_reset").show();
											$(".zm_gress").css({
												width: "83.5%",
											});
											$(".zm_third").find("span").css({
												background: "#5B8E00"
											}).siblings().css({
												color: "#5B8E00",
											});
											
											
											var reg1 = /^[0-9]{6,10}$/;
											var reg2 = /^[0-9a-z]{6,10}$/;
											var reg3 = /^[0-9A-Z]{6,10}$/;
											var reg4 = /^[0-9a-zA-Z]{6,10}$/;
											
											$(".zm_reset-wrap input").eq(0).focus(function(){
								//				alert("11")
												if (reg1.test($(".zm_reset-wrap input").eq(0).val()) == true) {
													$(".zm_pwd-level i").css({
														width:"40px",
														background:"red",
													})
												}
												if (reg2.test($(".zm_reset-wrap input").eq(0).val()) == true || reg3.test($(".zm_reset-wrap input").eq(0).val()) == true) {
													$(".zm_pwd-level i").css({
														width:"80px",
														background:"yelllow",
													});
													$(".zm_pwd-level p span").text("中");
												}
												if (reg4.test($(".zm_reset-wrap input").eq(0).val()) == true) {
													$(".zm_pwd-level i").css({
														width:"120px",
														background:"orange",
													});
													$(".zm_pwd-level p span").text("强");
												}
											})
											
											
											

													$(".zm_next-r a").click(function(){
														
														if ($(".zm_reset-wrap input").eq(1).val() == $(".zm_reset-wrap input").eq(0).val()) {
														$.ajax({
															type:"get",
															dataType:"json",
															url:"http://localhost:8080/user/updatePassword",
															data:{
																user_string:$(".test").val($(".zm_name input").val()).val(),
																newPassword:$(".zm_reset-wrap input").eq(0).val(),
															},
															success:function(res){
																
																var result2 = res;
																console.log(result2)
																if (result2.errorcode == 0) {
																	$(".zm_reset").hide();
																	$(".zm_complete").show();
																	$(".zm_gress").css({
																		width:"100%",
																	});
																	$(".zm_forth").find("span").css({
																		background:"#5B8E00",
																	}).siblings().css({
																		color:"#5B8E00",
																	});
																}
															}
														})
														}
												})
											
											
											
											
											
										}else{
											alert("请输入正确的验证码");
										}
									});

								},
							})
						})

					} else {
						alert("该号码未被注册")
					}
				}
			})
		}

	})

})

//			$.ajax({
//				type:"get",
//				url:"http://10.80.13.90:8080/user/findPassword",
//				data:{
//					user_string:$(".zm_name input").val(),
//				},
//				success:function(res){
//					console.log(res);
//					if (res.errorcode == 0 ) {
//						$(".zm_name input").change(function(){
//							
//							if (mobil.test($(".zm_name input").val())) {
//								$(".zm_Pwd").hide();
//								$(".zm_identity").show();
//								
//								$(".zm_gress").css({
//									width:"71%",
//								});
//								$(".zm_second-r").find("span").css({
//									background:"#5B8E00"
//								}).siblings().css({
//									color:"#5B8E00",
//								});
//								
//								$(".zm_method span").html("手机号验证");
//								var arr = $(".zm_name input").val();
//								
//								$(".zm_phone-num span").html(arr.substr(0,3)+"***"+arr.substr(7,4));
//							}else if(use.test($(".zm_name input").val())){
//								$(".zm_Pwd").hide();
//								$(".zm_identity").show();
//								
//								$(".zm_gress").css({
//									width:"71%",
//								});
//								$(".zm_second-r").find("span").css({
//									background:"#5B8E00"
//								}).siblings().css({
//									color:"#5B8E00",
//								});
//								$(".zm_method span").html("用户名验证");
//								var arr = $(".zm_name input").val();
//								$(".zm_phone-num span").html(arr);
//							}else{
//								alert("请输入正确的用户名和密码")
//							}
//						});
//						$(".zm_Code input").eq(1).click(function(){
//							$.ajax({
//								type:"get",
//								url:"http://111.231.121.164:8080/user/sendCode",
//								data:{
//									user_string:$(".zm_name input").val(),
//								},
//								success:function(data){
//								
//										$(".zm_next a").click(function(){
////											if(msg == $(".zm_Code input").val()){
//												$(".zm_identity").hide();
//												$(".zm_reset").show();
//												$(".zm_gress").css({
//													width:"83.5%",
//												});
//												$(".zm_third").find("span").css({
//													background:"#5B8E00"
//												}).siblings().css({
//													color:"#5B8E00",
//												});
////											}else{
////												alert("请输入正确的验证码");
////											}
//										});
//									
//								},
//							})
//						})
//					}
//						
//					
//				},
//				error:function(data){
//					$("<p>").text("该手机号未注册").css({
//						color:"red",
//						font:"12px serif",
//						float:"right",
//						marginTop:"10px",
//					}).appendTo($(".zm_name"));
//				},
//			})
//		})

//		$(".zm_next-r a").click(function(){
//			$.ajax({
//				type:"get",
//				url:"http://111.231.121.164:8080/user/updatePassword",
//				data:{
//					user_string:$(".zm_name input").val(),
//					newPassword:$(".zm_reset-wrap input").eq(0).val(),
//				},
//				success:function(res){
//					var result2 = JSON.parse(res);
//					if (result2.errorcode == 0 && $(".zm_reset-wrap input").eq(1).val() == $(".zm_reset-wrap input").eq(0).val()) {
//						$(".zm_reset").hide();
//						$(".zm_complete").show();
//						$(".zm_gress").css({
//							width:"100%",
//						});
//						$(".zm_forth").find("span").css({
//							background:"#5B8E00",
//						}).siblings().css({
//							color:"#5B8E00",
//						});
//					}
//				}
//			})
//		})
//		
//		
//		
////		if (use.test($(".zm_name input").val())) {
////			$(".zm_Pwd").hide();
////			$(".zm_identity").show();
////			
////			$(".zm_gress").css({
////				width:"71%",
////			});
////			$(".zm_second-r").find("span").css({
////				background:"#5B8E00"
////			}).siblings().css({
////				color:"#5B8E00",
////			});
////			
////			$(".zm_method span").html("用户名验证");
////			var arr = $(".zm_name input").val();
////			$(".zm_phone-num span").html(arr);
////		}else{
////			alert("请输入正确的用户名")
////		}
////		
////	});
//	
////	$(".zm_next a").click(function(){
////		$(".zm_identity").hide();
////		$(".zm_reset").show();
////		$(".zm_gress").css({
////			width:"83.5%",
////		});
////		$(".zm_third").find("span").css({
////			background:"#5B8E00"
////		}).siblings().css({
////			color:"#5B8E00",
////		});
////	});
//	
////	$(".zm_next-r a").click(function(){
////		$(".zm_reset").hide();
////		$(".zm_complete").show();
////		$(".zm_gress").css({
////			width:"100%",
////		});
////		$(".zm_forth").find("span").css({
////			background:"#5B8E00",
////		}).siblings().css({
////			color:"#5B8E00",
////		});
////	});
//	
//	
	var num = 120;
	
		
	$(".zm_Code input").eq(1).click(function(){
		var timer = setInterval(function(){
			num--;
			console.log(num)
			$(".zm_Code input").eq(1).val(num+"s后重发");
			if (num == 0) {
				$(".zm_Code input").eq(1).val("重新发送");
				clearInterval(timer);
			};
		},1000);
		
		$.ajax({
			type:"get",
			url:"http://localhost:8080/user/sendCode",
			data:{
				phone:$(".zm_name input").val(),
			}
		})
	});
//		
//	
//	
//	
//});