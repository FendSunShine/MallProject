<template>
	<view class="details">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-if="detailData[0]">
				<image class="s-img"  :src="detailData[0].img" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		
		
		<!-- 商品信息 -->
		<view class="goods-info" v-if="detailData[0]">
			<view class="new-p">￥{{detailData[0].newprice}}</view>
			<view class="old-p f-color" >￥{{detailData[0].oldprice}}</view>
			<view class="good-title">{{detailData[0].name}}</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-details">
			<image src="../../static/imgs/detail1.jpg" class= 'detail-img' mode="widthFix"></image>
			<image src="../../static/imgs/detail2.jpg" class= 'detail-img' mode="widthFix"></image>
			<image src="../../static/imgs/detail3.jpg" class= 'detail-img' mode="widthFix"></image>
			<image src="../../static/imgs/detail4.jpg" class= 'detail-img' mode="widthFix"></image>
			<image src="../../static/imgs/detail5.jpg" class= 'detail-img' mode="widthFix"></image>
		</view>
		
		<!-- 商品推荐 -->
		<Card name='看了又看'></Card>
		<CommodityList :data="CommodityList" ></CommodityList>
		
		<!-- 尾部加入购物车 -->
		<view class="footer" >
			<view class="iconfont icon-lajitong"></view>
			<view @tap="gotoShopCar" class="iconfont  icon-gouwugouwuchedinggou" ></view>
			<view class="shop-car" @tap="ShowPop">加入购物车</view>
			<view class="purchase">立即购买</view>
		</view>
		
		<!-- 购物车弹出层 -->
		<view class="pop" v-if="isShow"  @touchmove.stop.prevent=""> 
			<!--  整个弹出层移动就阻止默认行为，不移动后面的 -->
			<view class="mask" @tap="hiddenPop"></view>
			<view class="pop-purchase" :animation="animationData">
				<image class="pop-img" v-if="detailData[0]" :src="detailData[0].img" mode="widthFix"></image>
				<view class="shop-number">
					<text>购买数量</text>
					<uni-number-box v-model="purchaseNum" :min='1'/>
				</view>
				<view class="isBuy" @tap="addToShopCar">确认</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import Card from "../../components/common/card.vue"
import CommodityList from "../../components/common/CommodityList.vue"
import $http from '../../common/api/request.js'
import { setTimeout } from 'timers'
import { CLIENT_RENEG_LIMIT } from "tls"
	export default {
		data() {
			return {
				// 购买数量
				purchaseNum: 1,
				// 弹出层显示
				isShow: false,
				animationData: {},
				// 商品细节的数据
				detailData: {},
				// 商品详情的数据
				CommodityList: 	{
					data: [
								{
								img :'/static/imgs/commodity1.jpg',
								name: 'BALENCIAGA巴黎世家BALENCIAGA / adidas 男士运动夹克外套',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '小款Hualun秋冬季男士外套学生宽松夹棉棒球服男款ins潮痞帅百搭夹克',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大款外套男春秋款夹克男士新款潮牌男生秋冬季仿麂皮绒棒球服秋装上衣',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '小小款华夫格卫衣男春秋季潮美式纯色男士高级感圆领打底衫长袖加绒外套',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大小款条纹华夫格卫衣男春秋美式宽松圆领长袖打底衫四条杠加绒外套男士',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '中【丝绒内里】雅戈尔夹克秋季新款男士官方商务时尚立领外套9621',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
				}
			}
		},
		components:{CommodityList, Card},
		methods: {
			ShowPop(){
				// 在这里检验是否登录，用上token
				// $http.request({
				// 	url: '/abc',
				// 	method: 'POST',
				// 	header:{
				// 		token: true  // 表示需要验证
				// 	}
				// }).then(res => {
				// })
				
				this.isShow = true
				let animation = uni.createAnimation({
					duration: 200
				})
				animation.translateY(0).step()
				this.animationData = animation.export()
			},
			hiddenPop(){
				let animation = uni.createAnimation({
					duration: 200
				})
				animation.translateY(300).step()
				this.animationData = animation.export()
				setTimeout(()=> {
					this.isShow = false
				}, 200)
			},
			// 加入购物车
			addToShopCar(){
				// 加点购物车需要的属性
				let goods = this.detailData[0]
				goods.size = 'small'
				goods.amount = this.purchaseNum
				goods.price = goods.newprice
				// 传入store 
				this.$store.commit('addToShopCar', goods)
				this.hiddenPop()
			},
			// 去往购物车
			gotoShopCar(){
				uni.navigateTo({
					url:'/pages/shopcart/shopcart'
				})
			}
		},
		onBackPress(e){
			if (this.isShow){
				this.hiddenPop()
				return true
			}
		},
		onLoad(e) {
			let id = Number(e.id)
			if (!Number.isNaN(id)){
				$http.request({url: `/goods/id?id=${id+1}`}).then(res => {
					this.detailData = res.data
				
				})
			}

		},
		onNavigationBarButtonTap(e) {
			if (e.type == 'share'){
				uni.share({
					provider: "weixin",
					title:this.detailData[0].name,
					href:`http://192.168.137.1:8080/#/pages/details/details?id=${e.id}`
				})
			}
		}
	}
</script>

<style scoped lang="less">
swiper {
	width: 100%;
	height: 780rpx;
}
.s-img {
	width: 100%;
}
.details {
	height: 1000px;
}

.goods-info {
	box-sizing: border-box;
	padding: 26rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	color: #000;
	.new-p {
		margin-top: 10rpx
	}
	.old-p {
		margin-top: 10rpx;
		text-decoration-line: line-through;
	}
	.good-title {
		text-align: center;
		padding:  30rpx 60rpx;
	}
}

.details {
	width: 100%;
	.detail-img {
		width: 100%;
	}
}

.footer {
	position: fixed;
	background-color: #f7f7f7;
	display: flex;
	align-items: center;
	justify-content: space-evenly;	
	bottom: 0;
	width: 100%;
	padding: 20rpx 0;
	.iconfont {
		font-size: 50rpx;
		border-radius: 100%;
		background-color: #464646;
		color: #fff;
		
	}
	.purchase, .shop-car {
		padding: 10rpx 26rpx;
		border-radius: 36rpx;
		background-color: #464646;
		color: white;
	}
	.purchase {
		background-color: #49BDFB;
	}
}
// 弹出层
.pop {
	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
	.mask {
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.4;
		z-index: 99;
	}
	.pop-purchase {
		display: flex;
		flex-direction: column;
		justify-content: center;
		transform: translateY(300px);
		width: 100%;
		height: 300px;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		.pop-img {
			transform: translateY(-30rpx);
			width: 200rpx;
			
		}
		.shop-number {
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #ccc;
			border-top: 1rpx solid #ccc;
		}
		.isBuy {
			width: 100%;
			height: 60rpx;
			background-color: #49BDFB;
			text-align: center;
			line-height: 60rpx;
			
		}
	}
}
</style>
