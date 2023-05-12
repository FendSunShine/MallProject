<!-- 主要是也要传显眼的数据 -->
<template>
	<Commondity :dataList="this.data" :columns="3"></Commondity>
</template>

<script>
	import Commondity from '../common/Commodity.vue'
	export default{
		props:['data'],

		name:'Hot',
		components:{
			Commondity
		},
	}
</script>
