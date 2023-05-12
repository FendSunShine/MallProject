<template>
	<view>
		<commodity :dataList='CommodityList'></commodity>

	</view>
</template>

<script>
	import Commodity from '@/components/common/Commodity.vue'
	export default {
		name: 'CommodityList',
		props:['data'],
		components:{
			Commodity
		},
		data() {
			
			return {
				CommodityList: []
			};
		}
		,mounted() {
			this.CommodityList = this.data.data
		}
		
	}
</script>

<style lang="less">
	.commodtyList {
		display: flex;
		
	}
</style>
