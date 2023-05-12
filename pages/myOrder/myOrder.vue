<template>
	<view class="mainPage">
		<view  class="top">
			<myLine></myLine>
			<view class="header" >
				<view 
				:class="'header-item '+(index==currentIndex ? 'active' : '')" 
				@tap="changeIndex(index)"
				v-for="item,index in headers" :key="index">{{item}}</view>
			</view>
		</view>
		
		<view class="main"  v-if="OrderData[currentIndex]">
			<!-- 一个店铺 -->
			<!-- <h3>{{ OrderData[0].shopList}}</h3> -->
			<view class="shop"
			 v-for="item,index in OrderData[currentIndex].shopList" :key="index">
				<!-- 头部 -->
				<view class="shop-header">
					<view class="shop-header-left">{{item.shop}}</view>
					<view class="shop-header-right f-active-color">{{item.status}}</view>
				</view>
				<!-- 商品列表 -->
				<view class="goods-list">
					<!-- 单个商品 -->
					<view class="goods-item" v-for="it,idx in item.shopData" :key="idx">
						<image :src="it.imgUrl" mode=""></image>
						<!-- 单个商品信息 -->
						<view class="goods-info">
							<view class="goods-title">{{it.title}}</view>
							<view class="goods-options">
								<view class="goods-color">颜色分类：<text>{{it.color}}</text> </view>
								<view class="goods-size">尺码：<text>{{it.size}}</text> </view>
							</view>
							<view class="goods-ensure f-active-color">{{it.ensure}}</view>
						</view>
						<!-- 价格 -->
						<view class="goods-price">
							<view class="price">￥{{it.price}}</view>
							<view class="amount">x{{it.amount}}</view>
						</view>
					</view>
					
								
				</view>
				<!-- 订单尾部 -->
				<view class="total-price">合计：<text class="f-active-color">￥{{item.totalPrice}}</text>(含运费：<text>￥0.00</text>)</view>
				<!-- 一个店铺尾部 -->
				<myLine></myLine>
				<view class="payment">
					<view class="btn">支付</view>
				</view>
			</view>

		</view>
		
		<view class="noData" v-else :style="'height:'+windowHeight">
			<text>你还没有订单</text>
			<view class="btn">去首页逛逛</view>
		</view>
	</view>
</template>

<script>
	import myLine from "../../components/common/myLine.vue"
	export default {
		data() {
			return {
				windowHeight:'',
				windowTop: '',
				headers:['首页', '待付款', '待发货', '待收货', '待评价'],
				currentIndex: 0,
				OrderData:[
					{
						index: 0,
						shopList:[
							{
								shop: '百年奥莱旗舰店',
								status:'待买家支付',
								shopData:[
									{
										imgUrl : '../../static/imgs/hot3.jpg',
										title: '(c)NIKE/耐克XXXXXXX',
										color: '灰色',
										size: 'M',
										ensure: '七天无理由',
										price: '168.00',
										amount: '1',
									},
									{
										imgUrl : '../../static/imgs/hot2.jpg',
										title: '(c)NIKE/耐克XXXXXXX',
										color: '灰色',
										size: 'S',
										ensure: '七天无理由',
										price: '168.00',
										amount: '1',
									}
								],
								totalPrice: '336.00'
							},
							{
								shop: '百年奥莱专卖店',
								status:'买家超时未支付，系统已取消',
								shopData:[
									{
										imgUrl : '../../static/imgs/hot3.jpg',
										title: '(c)NIKE/耐克XXXXXXX',
										color: '灰色',
										size: 'M',
										ensure: '无',
										price: '168.00',
										amount: '1',
									},
									{
										imgUrl : '../../static/imgs/hot2.jpg',
										title: '(c)NIKE/耐克XXXXXXX',
										color: '灰色',
										size: 'S',
										ensure: '无',
										price: '168.00',
										amount: '1',
									}
								],
								totalPrice: '336.00'
							}
						]
					}
				]
			}
		},
		components:{myLine},
		methods: {
			changeIndex(index){
				this.currentIndex = index
				console.log(index);
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success(res) {
					this.windowHeight = res.windowHeight + 'px'
					this.windowTop = res.windowTop +  'px'
					
					console.log(res);
				}
			})
		}
	}
</script>

<style lang="less" scoped>
page {
	background-color :#f6f6f6;
}
.top {
	position: fixed;
	z-index: 999;
	width: 100%;
}
.header {
	background-color: #fff;
	display: flex;
	width: 100%;

	.header-item{
		height: 100rpx;
		width: 100/5%;
		text-align: center;
		font-size:32rpx;
		line-height: 100rpx;
	}
	.active {
		border-bottom: 6rpx solid #42a2d8;
	}
}
.main {
	padding-top: 100rpx;
	.shop {
		width: 100%;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		.shop-header {
			padding: 0 20rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.goods-list {
			display: flex;
			flex-wrap: wrap;
			.goods-item {
				padding: 0 20rpx;
				margin-bottom: 4rpx;
				background-color: #f6f6f6;
				display: flex;
				width: 100%;
				justify-content: space-between;
				image {
					width: 200rpx;
					height: 200rpx;
				}
				.goods-info {
					display: flex;
					flex-direction: column;
					.goods-title {
						
					}
					.goods-options {
						color: #ccc;
						
					}
					.goods-ensure {
						
					}
				}
				.goods-price {
					display: flex;
					flex-direction: column;
					text-align: end;
					.amount {
						color: #ccc;
					}
				}
			}
		}
		.total-price {
			padding: 0 20rpx;
			width: 100%;
			height: 80rpx;
			align-items: center;
			display: flex;
			justify-content: flex-end;
			
		}
		.payment {
			padding: 0 20rpx;
			width: 100%;
			height: 80rpx;
			align-items: center;
			.btn {
				float: right;
				padding: 10rpx 30rpx;
				border-radius: 30rpx;
				border: #42a2d8 2rpx solid;
				color: #42a2d8;
			}
		}
	}
}


.noData {
	width: 100%;
	height: 900rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.btn {
		margin-top: 20rpx;
		padding: 0 20rpx ;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 60rpx;
		border: #42a2d8 2rpx solid;
		color: #42a2d8;
	}
}
</style>
