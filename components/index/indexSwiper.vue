<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="item,index in data.data" :key="item.index">
			<view class="swiper-item">
				<image :src="item.imgUrl" mode="aspectFit"></image>
			</view>
		</swiper-item>
		<!-- <swiper-item>
			<view class="swiper-item">
				<image src="/static/imgs/swiper2.jpg" mode="aspectFit"></image>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item">
				<image src="/static/imgs/swiper3.jpg" mode="aspectFit"></image>
			</view>
		</swiper-item> -->
	</swiper>
</template>

<script>
	export default {
		name: 'indexSwiper',
		props:['data'],
		mounted() {
			// console.log(this.data.data, 'indexSwiper-data');
		}
	}
</script>

<style lang="less" scoped>
	uni-swiper {
			width: 100%;
			height: 332rpx;
	}
	.swiper-item  {
		uni-image {
			width: 750rpx;
			height: 332rpx;
			img {
				
			}
		}

	}
</style>