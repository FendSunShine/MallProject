<template>
	<view class="banner">
		<slot></slot>
		<image class="banner-img" :src="imgurl.slice(1)" mode=""></image>
	</view>
</template>

<script>
	export default {
		props:{
			imgurl: String
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		width: 100%;
		height: 300rpx;
	}
	.banner-img {
		width: 100%;
		height: 300rpx;
	}
</style>
