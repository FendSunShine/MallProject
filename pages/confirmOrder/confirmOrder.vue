<template>
	<view>
	<!-- 收货人信息 -->
		<template v-if="defaultAddr">
			<view class="consignee-info" @tap="gotoAdress">
				<view class="left">?</view>
				<view class="main">
					<view class="head">
						<view class="name">收货人：{{defaultAddr.name}}</view>
						<view class="phone">{{defaultAddr.phone}}</view>
					</view>
					<view class="foot">收货地址：{{defaultAddr.address}}</view>
				</view>
				<view class="right">></view>
			</view>
		</template>
		
		<template v-else>
			<view class="NOconsignee-info f-color" @tap="gotoAdress">请选择默认地址</view>
		</template>
	<!-- 商品信息 -->
		<!-- 单个商店 -->
		<view class="shop">
			<view class="title">奥特莱斯旗舰店</view>
			<view class="goods-list">
				<!-- 单个商品 -->
				<view class="goods-item" v-for="it,idx in shopData" :key="idx">
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
		</view>
	
	
		
	<!-- 合计 -->
	<view class="total-pay">
		<view class="left">合计： <text class="f-active-color">￥1476.00</text> </view>
		<view class="right" @tap="gotoPayment">提交订单</view>
	</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				// 默认地址
				defaultAddr : false,
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
			};
		},
		computed:{
			...mapGetters(['getDeafaultAddr'])
		},
		onLoad(){
			this.defaultAddr = this.getDeafaultAddr[0]
			// 得到选择地址页传递的数据
			uni.$on('getAddr', (res) => {
				this.defaultAddr = res
			})
		},
		onUnload() {
			uni.$off('getAddr', ()=> {})
		},
		methods:{
			// 去往地址页选地址
			gotoAdress(){
				uni.navigateTo({
					url:'/pages/adress/adress?type=selectAddr'
				})
			},
			// 去支付
			gotoPayment(){
				uni.navigateTo({
					url:'/pages/payment/payment'
				})
			}
		}
		
	
	
	
	}
</script>

<style lang="less" scoped>
.NOconsignee-info {
	width: 100%;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	
}
.consignee-info {
	border: #ccc 2rpx solid;
	height: 140rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.left, .right {
		text-align: center;
		width: 15%;
		line-height: 140rpx;
	}
	.main {
		width: 70%;
		display: flex;
		flex-direction: column;

		.head {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;
		}
		.foot {
			width: 100%;
			
		}
	}
}
	
.goods-item {
	padding: 0 20rpx;
	box-sizing: border-box;
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

.total-pay {
	position: fixed;
	bottom: 0;
	height: 100rpx;
	width: 100%;
	display:flex;
	justify-content: flex-end;
	align-items: center;
	.right {
		margin-left: 20rpx;
		background-color: #3baffb;
		color: #fff;
		height: 100%;
		width: 30%;
		line-height: 100rpx;
		font-size: 36rpx;
		text-align: center;
		
	}
}

</style>
