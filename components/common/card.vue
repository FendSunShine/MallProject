<template>
	<view class="">
		<view class="card">
			<view class="">-</view>
			<slot>
				<view class="card-name">{{name}}</view>
			</slot>
			<view class="">-</view>
		</view>
	</view>

	
</template>

<script>
	export default {
		props:['name'],
		name:'Card',
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
		}
	}
</script>

<style scoped lang="less">
	.card {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0;
		font-weight: 700;
		.card-name {
			margin: 0 10rpx;
			font-size: 32rpx;
		}
	}

</style>
