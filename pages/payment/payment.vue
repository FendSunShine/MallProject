<template>
	<view>
		<uni-nav-bar title="支付界面" leftText="关闭" @clickLeft="goback"></uni-nav-bar>
		<myLine></myLine>
		
		<view class='pay-main'>
					<label for="">
						<view class="pay-item">
							<image class='pay-img' src='../../static/imgs/zfb.png' mode=""></image>
							<view>
								<view>支付宝支付</view>
								<view class='pay-txt'>推荐支付宝用户使用</view>
							</view>
							<label class="radio">
								<radio value="" color='#FF3333'/><text></text>
							</label>
						</view>
					</label>
					<label for="">
						<view class="pay-item">
							<image class='pay-img' src='../../static/imgs/wx.png' mode=""></image>
							<view>
								<view>微信支付</view>
								<view class='pay-txt'>推荐微信用户使用</view>
							</view>
							<label class="radio">
								<radio value="" color='#FF3333'/><text></text>
							</label>
						</view>
					</label>
				</view>
				<!--去支付-->
				<view class='pay-foot'>
					<view class='total'>
						<text class="f-color">合计:</text>
						<text class='total-price'>¥259.00</text>
					</view>
					<view class="go-pay" @tap="gotoPayDone">去支付</view>
				</view>
	</view>
</template>

<script>
	import myLine from '../../components/common/myLine.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			myLine
		},
		methods: {
			goback(){
				uni.navigateBack()
			},
			gotoPayDone(){
				uni.navigateTo({
					url: '/pages/payDone/payDone'
				})
			}
		}
	}
</script>

<style scoped>
.pay-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:20rpx;
	border-bottom: 2rpx solid #CCCCCC;
}
.pay-img{
	width: 100rpx;
	height: 100rpx;
}
.pay-txt{
	color:#CCCCCC;
}
.pay-foot{
	width:100%;
	position: fixed;
	left:0;
	bottom:0;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.total{
	padding-left:100rpx;
	flex:1;
	background-color:#000000;
	line-height: 100rpx;
}
.go-pay{
	color:#FFFFFF;
	background-color: #49BDFB;
	line-height: 100rpx;
	text-align: center;
	width:220rpx;
}
.total-price{
	color:#FFFFFF;
}
</style>
