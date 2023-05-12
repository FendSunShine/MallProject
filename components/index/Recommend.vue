<template>
	<view class="items bg-color">
		<view class="item" v-for="item,index in data.data" :key="index">
			<!-- <image class="m-img" :src="item.Bigurl"></image> -->
			<image class="m-img" src="/static/imgs/Children.jpg"></image>
				<!-- {{item.Bigurl}} -->
			<view class="s-imgs">
				<image class="s-img" v-for="it,index in item.SmUrl"  :key="it.index" :src="it"></image>
				
<!-- 				<image class="s-img" src="/static/imgs/Children2.jpg"></image>
				<image class="s-img" src="/static/imgs/Children3.jpg"></image> -->
			</view>
		</view>
<!-- 		<view class="item">
			<image class="m-img" src="/static/imgs/Furnishing.jpg" mode=""></image>
			<view class="s-imgs">
				<image class="s-img" src="/static/imgs/Furnishing1.jpg"></image>
				<image class="s-img" src="/static/imgs/Furnishing2.jpg"></image>
				<image class="s-img" src="/static/imgs/Furnishing3.jpg"></image>
			</view>
		</view>
		<view class="item">
			<image class="m-img" src="/static/imgs/Children.jpg" mode=""></image>
			<view class="s-imgs">
				<image class="s-img" src="/static/imgs/Children1.jpg"></image>
				<image class="s-img" src="/static/imgs/Children2.jpg"></image>
				<image class="s-img" src="/static/imgs/Children3.jpg"></image>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		name: 'Recommend',
		props:['data'],
		data() {
			return {
				
			};
		},
		mounted() {
			
			// console.log(this.data);
		}
	}
</script>

<style lang="less" scoped>
	.items {
		padding:  20rpx;
		.item {
			background-color: pink;
			width: 100%;
			height: 580rpx;
			margin: 20rpx 0;
			border-radius: 30rpx;
			border: 2rpx solid #ccc;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.m-img {
				width: 100%;
				height: 360rpx;
			}
			.s-imgs {
				width: 100%;
				height: 240rpx;
				// display: inline-block;
				display: flex;
				.s-img {
					width: 33.333%;
					height: 240rpx;
				}
			}
		}
	}
</style>
