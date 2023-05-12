<template>
	<view>
		<view class="header">
			<view class="top">
				<image class="config-img" @tap="gotoConfig" src="../../static/imgs/config.png" mode=""></image>
				<image class="config-img" src="../../static/imgs/config.png" mode=""></image>
			</view>
			<view class="user">
				<image class="user-img"  :src="imgUrl" mode=""></image>
				<text class="user-name">{{nickName}}</text>
			</view>
		</view>
		<!--  -->
		<view class="order f-color">
			<view class="top">
				<view class="top-l" @tap="gotoMyOrder">我的订单</view>
				<view class="top-r">全部订单 ></view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image src="../../static/imgs/order1.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="order-item">
					<image src="../../static/imgs/order2.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="order-item">
					<image src="../../static/imgs/order3.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="order-item">
					<image src="../../static/imgs/order4.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="order-item">
					<image src="../../static/imgs/order5.png" mode=""></image>
					<text>待付款</text>
				</view>
			</view>
		</view>
		
		
		<!--  -->
		<view class="funcList">
			<view class="func-item">
				<text>我的收藏</text>
				<text>></text>
			</view>
			
			<view class="func-item">
				<text>我的收藏</text>
				<text>></text>
			</view>
			
			<view class="func-item">
				<text>我的收藏</text>
				<text>></text>
			</view>
		</view>
		
		
		<tabber currentPage="my"></tabber>
	</view>
</template>

<script>
	import tabber from "../../components/common/tabbar.vue"
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		components:{tabber},
		computed:{
			...mapState({
				imgUrl: state => state.login.userInfo.imgUrl,
				nickName: state => state.login.userInfo.nickName,
			})
		},
		methods: {
			gotoConfig(){
				uni.navigateTo({
					url:"/pages/config/config"
				})
			},
			// 跳转我的订单
			gotoMyOrder(){
				uni.navigateTo({
					url:'/pages/myOrder/myOrder'
				})
			},
			gotoLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ccc;
	}
	.header {
		padding-top: 100rpx;
		background: url('../../static/imgs/mybg.png') no-repeat;
		height: 400rpx;
		.top {
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			.config-img {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.user {
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.user-img {
				width: 200rpx;
				height: 200rpx;
				border: 4rpx solid #ccc;
				border-radius: 50%;

			}
			.user-name {
				margin-top: 20rpx;
				color: #838383;
				font-size: 40rpx;
				font-weight: bold;
				
			}
		}
	}

	.order {
		background-color: #fff;
		width: 100%;
		.top {
			width: 100%;
			height: 100rpx;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			align-items: center;
			display: flex;
			justify-content: space-between;
			
			
		}
		.order-list {
			display: flex;
			justify-content: space-around;
			padding-bottom: 10rpx;
			.order-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 28rpx;
				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
	}

	.funcList {
		margin-top: 20rpx;
		background-color: #fff;
		width: 100%;
		font-size: 28rpx;
		.func-item {
			padding: 10rpx 20rpx;
			border-bottom: 4rpx solid #ccc;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	
</style>
