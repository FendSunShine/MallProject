// 编写用户登录相关sql语句
const jwt = require('jsonwebtoken')
var User = {
	// 查询用户名
	//  普通形式 params.userName
	// 第三方数据形式 {provider, openId}
	queryUserName( params ){
		// phone = 后面加userNmae 是方便搜集一个数据好操作
		if (params.provider){
			return `select * from user where provider='${params.provider}' and openId='${params.openId}'`
		} else{
			return `select * from user where userName='${params.userName}'or phone='${params.userName}'`
		}
	},
	// 验证用户名以及密码
	queryUserPwd( params ){
		return `select * from user where (userName='${params.userName}' or
		phone='${params.userName}') and UserPwd='${params.userPwd}'`
	},
	// 增加一条数据
	// 新注册数据形式   	phone: user,  userPwd: password
	// 第三方注册形式	{provider, nickName, avatarUrl, openId}
	insertData( params ){
		// token
		
		if (params.openId) {
			payload = {userName:params.openId}
		} else {
			payload = {userName: params.phone }
		}
		// console.log(payload);
		let scretKey = 'lsynipphaoqiao'
		let token = jwt.sign(payload, scretKey)
		
		return `insert into user (userName, userPwd, phone, imgUrl, nickName, token, provider, openId)
		values (
		"", 
		"${params.userPwd ? params.userPwd : '123456'}", 
		"${params.phone ? params.phone : null}", 
		"${params.avatarUrl ? params.avatarUrl: null}", 
		"${params.nickName ? params.nickName: '默认昵称'}", 
		"${token}", 
		"${params.provider ? params.provider : null}" ,
		"${params.openId ? params.openId: null}")` 
		
		
	}
}


exports = module.exports = User