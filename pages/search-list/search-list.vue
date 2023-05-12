<template>
	<view>
		<view class="sort-list">
			<view class="sort-item" v-for="item,index in searchItem" :key="index" >
				<view @tap="selected(index)" :class="currentIndex == index ? 'f-active-color': 'f-color'">{{item.text}}</view>
				<view class="icons" @click.stop="sortSelect(index)">
					<view :class="setIconClass(index, true) + 'iconfont  icon-xiangshangjiantou'"></view>
					<view :class="setIconClass(index, false) + 'iconfont  icon-xiangxiajiantou'"></view>
				</view>
			</view>
		
		</view>
		<myLine></myLine>
		<CommodityList :data='data'></CommodityList>
		
	</view>
</template>

<script>
	import myLine from "../../components/common/myLine.vue"
	import CommodityList from '../../components/common/CommodityList.vue'
	import $http from '@/common/api/request.js'
	export default {
		components:{
			myLine,
			CommodityList
		},
		data(){
			return {
					data:{
						data:[]		
						}
					,
					searchItem: [
						{'text': '价格', 'status': true},
						{'text': '折扣', 'status': true},
						{'text': '品牌', 'status': true},
						],
					currentIndex: 0,
					searchKey : ''	,
					}
				},
				
		methods:{
			selected(index){
				console.log('你点击了select');
				this.currentIndex = index
				// 点击价格时，按价格排序 0是价格排序，1是折扣排序，3先不写
				if (index==0){
					this.getSearchData(this.searchKey)
				}
				if (index == 1){
					this.getSearchData(this.searchKey, 'discount')
				}
			},
			sortSelect(index){
				this.searchItem[index].status = !this.searchItem[index].status
				// 第一次点击或第二次点击
				let temp = ['newprice', 'discount', null]
				console.log(index, '排序的', temp[index])
				if (this.searchItem[index].status) {
					this.getSearchData(this.searchKey, temp[index], 'asc')
				} else {
					this.getSearchData(this.searchKey, temp[index], 'desc')
				}
			},
			setIconClass(index, fangxiang){
	
				return this.currentIndex == index && this.searchItem[index].status == fangxiang ? 
				'f-active-color ' : ''
				
			},
			getSearchData(searchKey,sortKey='newprice',isAsc='asc'){
				// searchKey = searchKey ? searchKey : this.searchKey
				console.log(sortKey, '收到的sortkey');
				console.log(isAsc, '收到的isAsc');
				$http.request({
					url:'/goods/search',
					data:{
						name: searchKey,
						// 第一次默认的排序
						[sortKey]: isAsc
					}
				}).then(res => {
					// console.log(this.data.data, '长度');
					this.data.data.splice(0,this.data.data.length, ...res.data)
					// this.data.data.push(...res.data)
					// this.data.data = res.data
					// console.log(this.data.data, '请求成功');
				})
			}
		},
		onLoad(e) {
			// console.log(e, this);
			// #ifdef APP
			console.log('onload又加载了');
			var webView = this.$mp.page.$getAppWebview();  
			// 设置 searchInput的 text  
			
			webView.setTitleNViewSearchInputText(e.key)  
			
			// #endif
			
			// 搜索页面跳转在这里就可以用searchKey来得到数据了
			this.searchKey = e.key
			this.getSearchData(e.key)
			
		}
	}
	
</script>

<style scoped>
	.selected {
		color: ;
	}
	.sort-list {
		height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.sort-item {
		display: flex;
	}
	.icons {
		
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.icons .iconfont{
		transform: translateY(4rpx);
		height: 14rpx;
		line-height: 14rpx;
		font-size: 12rpx;
	}
	
</style>
