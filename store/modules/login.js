
export default {
	state:{
		// 登录状态
		loginState: false,
		// token
		token: '',
		userInfo:{}
		
	},
	getters: {},
	mutations: {
		// 每次刷新，进行读取并赋值在Store
		initUser(state){
			let obj = uni.getStorageSync('userInfo')
			if (Object.values(obj).length > 0){
				state.loginState = true
				state.token = obj.token
				state.userInfo = obj
			}
		},
		// 登录存入数据
		loginData(state, obj){
			state.loginState = true
			state.token = obj.token
			state.userInfo = obj
			// 持久化存储 ，用于刷新
			uni.setStorageSync('userInfo', obj)
			
		},
		// 退出登录
		async OutLogin(state){
			state.loginState = false
			state.token = null
			state.userInfo = {}
			// 删除持久化存储
			uni.removeStorageSync('userInfo')
			}
		
	},
	actives: {}
}