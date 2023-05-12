<template>
	<view class="shops">
		<view class="shop" v-for="item,index in this.data.data" :key="index">
			<image class="shop-img" :src="item.shopimg[0]" mode=""></image>
			<scroll-view class="shop-items" scroll-x="true" >
				<Commondity  :dataList="item.shopList" :columns='3' isWrap="nowrap"></Commondity>	
			</scroll-view>
		</view>
	</view>
</template>

<script>
import Commondity from '../common/Commodity.vue'
export default {
	props:['data'],
	components:{
		Commondity
	},
}
</script>

<style scoped>
		.shop {
			width: 100%;
		}
		.shop-img {
			width: 100%;
			height: 480rpx;
		}
		.shop-items {
			transform: translateY(-18rpx);
			/* width: 100%; */
			white-space: nowrap ; // 强制不换行
		}
		.shop-item {
			display: inline-block;
			margin-right: 20px;
			width: 100px;
			height: 100px;
			background-color: pink;
		}
		
</style>