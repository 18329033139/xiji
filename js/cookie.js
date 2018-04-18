/* 封装 cookie操作的对应功能方法
 * 添加
 * 查看
 * 修改
 * 删除
 */

//添加 cookie_name 键名 cookie_value 值 cookie_time 失效时间 秒为单位
function addCookie(cookie_name,cookie_value,cookie_time){
	document.cookie = cookie_name + "=" + cookie_value + ";max-age=" + cookie_time;
}
//查看
function getCookie(cookie_name){
	if(hasCookieName(cookie_name)){
		var cookieArr =document.cookie.split("; ");
		for(var i = 0;i<cookieArr.length;i++){
			cookieArr[i] = cookieArr[i].split("=");
			if(cookieArr[i][0]==cookie_name){
				return cookieArr[i][1];
			}
		}return false;
	}else{
		return null;
	}
}
//修改
function setCookie(cookie_name,cookie_value,cookie_time){
	if(hasCookieName(cookie_name)){
		addCookie(cookie_name,cookie_value,cookie_time);
	}
}

//删除
function deleteCookie(cookie_name){
	addCookie(cookie_name,"",-1);
}
//是否含有某个键名
function hasCookieName(cookie_name){
	if(document.cookie.indexOf(cookie_name)>-1){
		return true;
	}else{
		return false;
	}
}
