<template>
	<view class='login-other'>
		<view class='other-text'>
			<view>或者用以下方式登录</view>
		</view>
		<view class='other'>
			<view class='other-item'>
				<image src="../../static/imgs/wx.png" mode="" @tap="otherLogin('weixin')"></image>
				<view>微信登录</view>
			</view>
			<view class='other-item'>
				<image src="../../static/imgs/wb.png" mode="" @tap="otherLogin('sinaweibo')"></image>
				<view>微博登录</view>
			</view>
			<view class='other-item'>
				<image src="../../static/imgs/qq.png" mode="" @tap="otherLogin('qq')"></image>
				<view>QQ登录</view>
			</view>
		</view>
	</view>
</template>

<script>
    import {mapMutations} from 'vuex'
    import $http from '../../common/api/request.js'
	export default {
		methods:{
			...mapMutations(['loginData']),
			// 第三方登录
			otherLogin(provider){
				uni.login({
					provider,
					// 成功授权
					success: (res) => {
						// 已授权才运行
						console.log('res:', res)
						uni.getUserInfo({
							provider,
							success: (res1) => {
								// wx oRrdQt_OM6J2P9T1JB7v7Od7Ok6s
								// openId 是一种身份认证
								console.log('res1:', res1)
								let openId = res1.userInfo.openId || res1.userInfo.openid
								// 向后端发送登录的信息
								this.sendLoginData(provider, openId, res1.userInfo)
							},
							fail: (err) => {
								console.log('err:',err);
							}
						})
					}
				})
			},
			// 向后端发送登录的信息
			sendLoginData(provider, openId, {nickName, avatarUrl}){
				$http.request({
					url: '/loginOther',
					method: 'POST',
					data: {provider, nickName, avatarUrl, openId}
				}).then(res => {
					console.log(res, '后端传来的注册数据');
					// 保存数据入store,并登录
					// 登录的得到的数据进行状态管理，到时候会放到各个页面去
					    this.loginData(res.data)
					    uni.navigateTo({
					        url:'/pages/index/index'
					        // url:'/pages/my/my'
					    })
					}
				).catch(err => {
					console.log('err:', err);
				})
			},
			
		}
	}
</script>

<style scoped>
/*  其他登录方式  */
.login-other{
	padding: 100rpx 0;
}
/* .other-text{
	display: flex;
	padding:50rpx 0;
}
.other-text view{
	line-height: 0rpx;
	padding:0 10rpx;
}
.other-text:after{
	flex:1;
	content: '';
	height: 2rpx;
	background-color: #CCCCCC;
}
.other-text::before{
	flex:1;
	content: '';
	height: 2rpx;
	background-color: #CCCCCC;
} */

.other-text {
	display: flex;
	justify-content: center;
	padding: 40rpx 10rpx;
}
.other-text view {
	padding: 0 20rpx;
	line-height: 0;
}
.other-text::after, .other-text::before {
	content: '';
	height: 2rpx;
	background-color: #ccc;
	flex: 1;
	/* transform: translateY(20rpx); */
}



.other{
	display: flex;
	justify-content: space-around;
}
.other-item{
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
}
.other-item image{
	width:80rpx;
	height: 80rpx;
}
/*  其他登录方式  end  */
</style>
