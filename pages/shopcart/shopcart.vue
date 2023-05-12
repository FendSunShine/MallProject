<template >
	<view class="main">
		<view>
			<uni-nav-bar 
			title="购物车"
			statusBar="true"
			:rightText="isEdit ? '编辑': '完成'"
			@clickRight	="isEdit = !isEdit"
			>
			</uni-nav-bar>
			
			<!-- 店铺 -->
			<view  v-if="shopList.length" class="shop-list">
				<view class="shop-name">
					<label class="radio">
						<radio value="" color="red"  style="transform:scale(0.7)"/><text></text>
					</label>
					<text>奥斯陆他旗舰店</text>
					<view class="iconfont icon-xiaoxi"></view>
				</view>
				<!-- 进入的商品还未作合计，故key先用index -->
				<view class="shop-item" v-for="item,index in shopList" :key="index">
					<label class="radio">
						<radio color="red" :checked="isChecked(item.id)" 
						@tap="tapItemCheck(item.id)"
						style="transform:scale(0.7)"/><text></text>
					</label>
					<image class="img" :src="item.img" mode="widthFix"></image>
					<view class="info">
						<text class="title">{{item.name}}</text>
						<view class="color-size">{{item.size}}</view>
						<view class="price-amount">
							<view class="price">￥{{item.price}}</view>
							
							
							<view v-if="isEdit" class="amount">x {{item.amount}}</view>
							
							<view v-else class="amount">
								<uni-number-box v-model="item.amount" :min="1"></uni-number-box>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			
			<view v-else class="noShopList" :style="'height:' + windowHeight  + 'px'">
				没有商品
			</view>
			
		</view>

		
		<!-- 购物页面底部 -->
		<view class="footer">
			<view class="check-all">
				<label class="radio" >
					<radio :checked="CheckAll" @tap="CheckAllFn"/><text></text>
				</label>
				<text class="f-color" >全选</text>
			</view>
			
			<template v-if="isEdit">
				<view  class="right">
					<view class=" f-color ">合计：</view>
					<view class="price f-active-color">
						￥{{totalCount.price}}
					</view>
					<view class="f-color  settlement" @tap="gotoConfirmOrder">结算（<text>{{totalCount.num}}</text>）</view>
				</view>
			</template>
			
			<template v-else>
				<view  class="right">
					<view class="remove">移入收藏夹</view>
					<view class="f-color  settlement" @tap="delShopGoodsFn">删除（<text>{{totalCount.num}}</text>）</view>
				</view>
			</template>
			
		</view>
		
		<!--  -->
		<tabbar currentPage="shopcart"></tabbar>
	</view>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
	import tabbar from '../../components/common/tabbar.vue'
	export default {
		data() {
			return {
				isEdit: true,
				// 可用视口高度
				windowHeight: 0,
			}
		},
		components: {
			tabbar
		},
		methods: {
			...mapActions({
				CheckAllFn: 'CheckAllFn',
				tapItemCheck: 'tapItemCheck',
				delShopGoodsFn: 'delShopGoodsFn'
			}),
			// 判断当前单个商品是否选中
			isChecked(id){
				return this.CheckedId.includes(id)
			},
			// 确认订单
			gotoConfirmOrder(){
				uni.navigateTo({
					url:'/pages/confirmOrder/confirmOrder'
				})
			}
		},
		computed : {
			...mapState({
				shopList: state => state.shopcar.shopList,
				// 是否全选
				CheckAll: state => state.shopcar.CheckAll,
				CheckedId: state => state.shopcar.CheckedId,
			}),
			...mapGetters(['totalCount'])
			

		},
		onLoad() {
			// console.log(this.$store.state, 'sss');
			// console.log(this.shopList);
			// console.log(this.totalCount, 'sss');
			uni.getSystemInfo({
				success: (res) => {
					// 50px是底部状态栏 uni.upx2px(100) 是悬浮的footer
					this.windowHeight = res.windowHeight - 50 - uni.upx2px(100)
				}
			})
		}
	}
</script>
 
<style scoped lang="less">
page {
	background-color: #ebebeb;
	color: #636263;
}
.noShopList {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.shop-list {
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 100rpx;
	.shop-name {
		padding-left: 20rpx;
		background-color: white;
		display: flex;
		align-items: center;
		text {
			padding: 0  20rpx 0 0;
		}
		height: 80rpx;
		.icon-xiaoxi {
			font-size: 40rpx;
		}
	}
	.shop-item{
		padding-left: 20rpx;
			background-color: rgb(244, 245, 245);
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			.img {
				width: 300rpx;
			}
		
			.info {
				display: flex;
				flex-direction: column;
				.title {
					font-size: 28rpx;
					color: #000;
					font-weight: bold;
				}
				.color-size {
					font-size: 28rpx;
					color: #bababa;
				}
				.price-amount {
					display: flex;
					justify-content: space-between;
					.amount {
						margin-right: 10rpx;
					}
				}
			
			}
	}
	

}
.footer {
	border-top: 2px solid #ccc;
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 120rpx;
	right: 0;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.right {
		display: flex;
		height: 100%;
		align-items: center;
		.price {
			margin-right: 10rpx;
		}
		.remove {
			height: 100%;
			width: 200rpx;
			background-color: #000;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.settlement {
			width: 200rpx;
			background-color: #38b8ff;
			color: #fff;
			text-align: center;
			line-height: 100rpx;
		}
	}
}
</style>
