<template>
	<view>
		<view class="icons">
			<view class="icon" v-for="item,index in data" :key="index">
				<image class="icon-img" :src="item.img.slice(4)" mode=""></image>
				<text class="f-color">{{item.img_t}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['data'],

		}
	
</script>

<style lang="less">
	.icons {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 365rpx;
		overflow: hidden;
	}
	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		width: 25%;
	}
	.icon-img {
		width: 110rpx;
		height: 110rpx;
	}
</style>
