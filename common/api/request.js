import store from '../../store/index.js'
export default {
	common: {
		baseUrl: 'http://192.168.56.1:3000/api',
		data: {},
		dataType: "json",
		header: {
			'Content-Type': 'application/json'
		},
		method: 'GET',
			
	},
	
	
	request( options={} ){
		options.url = this.common.baseUrl + options.url
		options.data = options.data || this.common.data		
		options.dataType = options.dataType || this.common.dataType		
		options.method = options.method || this.common.method	
		options.header || (options.header = {})
		options.header['Content-Type'] = 'application/json'
		
		// 如果传过来为T，这需要验证
		if (options.header.token){
			// 如果store里的token为null这跳转登录
			if(store.state.login.token) {
				options.header.token = store.state.login.token
				// console.log(options.header);
			} else {
				uni.showToast({
					title:'请登录',
					icon:'none'
				})
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
		return new Promise((res, rej)=> {
			// uni.showLoading({
			// 	title: '加载中'
			// });
			uni.request({
				...options,
				fail: (err) => {
					console.log('err:' ,err);
					rej(err)	
				},
				success: (val) => {
					// setTimeout(function () {
					// 	uni.hideLoading();
					// }, 200);
					res(val)
				},
			})	
		})
		
	}
	
	
	
	
	
	
	
}