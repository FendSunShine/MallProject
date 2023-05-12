<template>
	<view class="commodityList" :style="'flex-wrap:'+isWrap+';'">
		<view class="commodity-item" @tap='gotoDetails(item.id)' :style="{width:getWidth()}" v-for="item,index in dataList" :key="index">
			<image class="img" :style="{height:getWidth()}" :src="item.img" mode=""></image>
			<view class="info">
				<text class="name">{{item.name}}</text>
				<view class="price">
					<text class="new-p">￥{{item.newprice}}</text>
					<text class="old-p">￥{{item.oldprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>		
	</view>
	
	
</template>

<script>
	export default {
		props:{
			dataList: {
				type: Array
			},
			columns:{
				type:  Number,
				default: 2,
			},
			isWrap:{
				type: String,
				default: 'wrap'
			}
		},
		data() {
			return {
				width: null
			};
		},
		methods: {
			getWidth(){
				return `${750/this.columns}rpx`
			},
			gotoDetails(id){
				uni.navigateTo({
					url:'/pages/details/details?id=' + id
				})
			}
		},
		mounted(){
			// console.log(this.isWrap, 'this.wrap')
			
		}
	}
</script>

<style lang="less" scoped>
	.commodityList {
		display: flex;
		// flex-wrap: wrap;
	}
	.commodity-item {
		// width: 250rpx;
		padding-bottom: 4rpx;
		.img {
			width: 100%;
			// height: 250rpx;
		}
		.info {
			text-align: center;
			.name {
				
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box; // 类似于flex 与下面3搭配
				-webkit-line-clamp:2;
				-webkit-box-orient:vertical;
			}
			.price {
				
				padding: 10rpx 0;
				text-align: center;
				.old-p {
					color: #333;
					font-size: 24rpx;
					text-decoration: line-through;
				}
			}
			.discount {
				font-size: 24rpx;
				border-radius: 4rpx;
				color: red;
				border: 1px solid red;
			}
		}
	}
</style>
