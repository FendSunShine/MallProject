<template>
	
	
	
	
	<swiper vertical="true" style="height: 100vh;">
		<swiper-item>
			
			<view class='login' >
				<view class='login-tel'>
					<view class='tel-main'>
						<view class='close'>
							<image class='close-img' @tap="goback" src="../../static/imgs/close.png" mode=""></image>
						</view>
						<view class='logo'>
							<image class='logo-img' src="../../static/imgs/logo.jpg" mode=""></image>
						</view>
						<view class='tel' @tap="gotologDel">手机号注册</view>
						<LoginOther></LoginOther>
						<view class='login-go'>
							<view>已有账号，去登录</view>
							<image src="../../static/imgs/down.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
		</swiper-item>
		
		<swiper-item>
			<view class='login-tel'>
				<view class='tel-main'>
					<view class='close close-center'>
						<view>
							<image class='close-img' @tap="goback" src="../../static/imgs/close.png" mode=""></image>
						</view>
						<view class='login-go'>
							<image class='close-img' src="../../static/imgs/up.png" mode=""></image>
							<view>没有账号，去注册</view>
						</view>
						<view></view>
					</view>
					<view class='login-from'>
						<view class='login-user'>
							<text class='user-text'>账号</text>
							<input type="text" v-model="user" placeholder="请输入手机号/昵称"/>
						</view>
						<view class='login-user'>
							<text class='user-text'>密码</text>
							<input type="text" v-model="password" placeholder="6-16位字符"/>
						</view>
					</view>
					<view class='login-quick'>
						<view>忘记密码?</view>
						<view>免密登录</view>
					</view>
					<view class='tel' @tap="login" >登录</view>
					<view class='reminder'>温馨提示：您可以选择免密登录，更加方便</view>
					<LoginOther></LoginOther>
				</view>
			</view>
		</swiper-item>
	</swiper>

	

</template>

<script>
	import LoginOther from '../../components/login/login-other.vue'
	import $http from '../../common/api/request.js'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				user: '',
				password: '',
				rules:{
					user:{
						// 不能有空格
						rule: /\s/,
						msg: '不能带空格或为空'
					},
					password:{
						// rule:/^[a-zA-Z]\w{5,17}$/,
						rule: /\w/,
						msg:'以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
					}
				}
			}
		},
		components:{
			LoginOther
		},

		methods: {
			...mapMutations(['loginData']),
			// 点击退出
			goback(){
				uni.navigateBack(1)
			},
			// 点击登录
			login(){
				// 格式验证
				// 如果包含空格 
				if (this.vaildUser('user')) return 
				if (this.vaildYES('password')) return 
				
				// 数据库验证
				$http.request({
					url: '/login',
					method: 'POST',
					data: {
						userName: this.user,
						userPwd: this.password
					}
				}).then(res => {
					console.log('loginRes:', res.data)
					uni.showToast({
						title:res.data.data.msg,
						icon:'none'
					})
					if (res.data.data.success) {
						// 登录的得到的数据进行状态管理，到时候会放到各个页面去
						// console.log(res.data.data.data);
						this.loginData(res.data.data.data)
						uni.navigateTo({
							url:'/pages/index/index'
							// url:'/pages/my/my'
						})
					}
					
				}).catch(err => {
					uni.showToast({
						title:err,
						icon:'none'
					})
				})
			},
			// 验证
			vaildUser(key){
				if(this.rules[key].rule.test(this[key] ) || this[key]==''){
					uni.showToast({
						title:this.rules[key].msg,
						icon:'none'
					})
					return true
				}
			},
			vaildYES(key){
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:'none',
					})
					return true
				}
			},
			gotologDel(){
				uni.navigateTo({
					url:'/pages/log-del/log-del'
				})
			}
		}
	}
</script>

<style scoped>
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.close{
	padding-top: 40rpx;
}
.close-img{
	width:60rpx;
	height: 60rpx;
}
.logo{
	padding-bottom: 100rpx;
	display: flex;
	justify-content: center;
}
.tel{
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
.login-go{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.login-go image{
	width:60rpx;
	height: 60rpx;
}
/*第二*/
.close-center{
	display: flex;
}
.close-center >view{
	flex:1;
}
.login-from{
	padding-top:100rpx;
}
.login-user{
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
}
.user-text{
	padding-right:10rpx;
}
.login-quick{
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
.reminder{
	color:#CCCCCC;
	padding:20rpx 0;
	text-align: center;
}
</style>
