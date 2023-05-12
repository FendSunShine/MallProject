<template>
	<view>
		<myLine></myLine>
		<view class="search-item">
			<view class="top">
				<view class="f-color">
					最近搜索
				</view>
				<view @click="clearSearch"  class="iconfont icon-lajitong"></view>
			</view>
			<view v-if="recentSearch.length>0" class="content">
				<view class="c-name f-color" @click="recentSearchTO(item)" v-for="item,i in recentSearch" :key="i">{{item}}</view>
			</view>
			<view v-else class="noHistory f-color">暂无历史</view>
		</view>
		<view class="search-item">
			<view class="top">
				<view class="f-color">
					热门搜索
				</view>
				<!-- <view class="iconfont icon-lajitong"></view> -->
			</view>
			<view class="content">
				<view class="c-name f-color">四件</view>
				<view class="c-name f-color">四dfdfa件套</view>
				<view class="c-name f-color">四f套</view>
				<view class="c-name f-color">四f件套</view>
				<view class="c-name f-color">四件套</view>
			</view>
	</view>
		
		
		
	</view>
</template>

<script>
	import myLine from '../../components/common/myLine.vue'
	export default {
		components: {myLine},
		data() {
			return {
				searchKey: ''	,
				recentSearch: []
			};
		},
		methods:{
			search(){
				let searchK = this.searchKey.trim()
				if (searchK){
					uni.navigateTo({
						// 将搜索词传递过去
						url:`/pages/search-list/search-list?key=${searchK}`,
						success: () => {
							// 搜索成功后加入最近搜索
							// 如果重复则放到第一位
							let repeatIndex = this.recentSearch.findIndex(it => it==searchK)
							if (repeatIndex != -1){
								console.log('重复', repeatIndex);
								// 方法一， 删除原来的，并增加第一个（相当于换位）
								// this.recentSearch.splice(repeatIndex, 1)
								// this.recentSearch.unshift(searchK)
								this.recentSearch.unshift(...this.recentSearch.splice(repeatIndex, 1))
								
								// 方法二, 直接换, 不可行，md Vue检测不到
								// let temp = this.recentSearch[repeatIndex]
								// this.recentSearch[repeatIndex] = this.recentSearch[0]
								// this.recentSearch[0] = temp
								
							} else {
								this.recentSearch.unshift(searchK)
							}
							
							// 成功后存在本地
							uni.setStorage({
								data:this.recentSearch,
								key:'recentSearch'
							})
						}
					})
				} else {				// 搜索词为空，提示并退出
					uni.showToast({
						title:'搜索词不能为空',
						icon:'none'	
					})
				}
			},
			clearSearch(){
				uni.showModal({
					title: '提示',
					content: '是否要清除搜索记录',
					success:  (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.removeStorage({
								key:'recentSearch',
								success: () => {
									console.log('ok');
								}
							})
							this.recentSearch = []
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			recentSearchTO(item){
				uni.navigateTo({
					url:`/pages/search-list/search-list?key=${item}`
				})
			}
		},
		// 点击进入搜索
		onNavigationBarButtonTap(e){
			if(e.float === 'right'){
				this.search()
			}
		},
		// 监听原生搜索框文字
		onNavigationBarSearchInputChanged(e) {
			this.searchKey = e.text
		},
		// 软键盘搜索
		onNavigationBarSearchInputConfirmed(e){
			this.search()
		},
		onLoad() {
			uni.getStorage({
				key:'recentSearch',
				success: (res) => {
					// console.log(res, 'storage');
					this.recentSearch = res.data
				}
			})
		}
	}
</script>

<style lang="less">
.search-item {
	padding: 20rpx;
}
.top {
	font-size: 26rpx;
	display: flex;
	justify-content: space-between;
	padding-bottom: 10rpx;
}
.content {
	display: flex;
	flex-wrap: wrap;
}
.c-name {
	background-color: #eeeeee;
	height: 50rpx;
	line-height: 50rpx;
	border-radius: 40rpx;
	padding: 0 30rpx;
	margin: 10rpx;
	font-size: 28rpx;
	font-weight: 500;
	
}
.noHistory {
	height: 30rpx;
	text-align: center;
	font-size: 24rpx;
	
}
</style>
