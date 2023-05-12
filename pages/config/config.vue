<template>
	<view>
		<view class="config-list">
			<view class="config-item" @tap="gotoAdress">
				<view class="left">地址管理</view>
				<view class="right">></view>
			</view>
			<view class="config-item">
				<view class="left">地址管理</view>
				<view class="right">></view>
			</view>
			<view class="config-item">
				<view class="left">地址管理</view>
				<view class="right">></view>
			</view>
			<view class="config-item">
				<view class="left">地址管理</view>
				<view class="right">></view>
			</view>
		</view>
		
		
		
		
		
		<view class="config-pause" @tap="Out">退出</view>
	</view>
	
	
	
	
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			...mapMutations(['OutLogin']),
			gotoAdress(){
				uni.navigateTo({
					url:'/pages/adress/adress'
				})
			},
			// 退出登录
			Out(){
				uni.showToast({
					title:'退出成功',
					icon:'none'
				})
				this.OutLogin()
				setTimeout(() => {
					uni.reLaunch({
						url:'/pages/index/index'
					})
				},800)
			}
		}
	}
</script>

<style lang="less" scoped>
.config-list {
	padding-left: 10rpx;
	.config-item {
		padding: 16rpx;
		border-bottom: 2rpx solid #ccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
.config-pause {
	padding: 20rpx;
	color: white;
	text-align: center;
	background-color: #3badfb;
}
</style>
