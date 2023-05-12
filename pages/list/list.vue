<template>
	<view>
		<MyLine></MyLine>
		<view class="main">
			
			<scroll-view scroll-y="true" :style="'height: '+ mainHeigth +'px;'" class="left-scroll" >
				<view 
				:class="currentIndex == item.id-1 ? 'left-item selected' : 'left-item'" 
				@tap="currentIndex = item.id-1"
				v-for="item in listData" :key="item.id">{{item.name}}</view>
			</scroll-view>
			
			
			<scroll-view scroll-y="true"  v-if="listData[currentIndex]" :style="'height: '+ mainHeigth +'px;'" class="right-scroll">
				<view class="main-item"  v-for="it,index in listData[currentIndex].data" :key="index">
					<view class="main-title">{{it.name}}</view>
					<view class="r-content">
						<view class="r-item" v-for="i,index in it.list" :key="it.id">
							<image class="r-item-img" :src="i.imgurl.slice(1)" mode='widthFix'></image>
							<view class="r-item-name f-color">{{i.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>		
				
		</view>
		
		<tabbar currentPage="list"></tabbar>
	</view>
</template>

<script>
	import $http from '../../common/api/request.js'
	import MyLine from '@/components/common/myLine.vue'
	import tabbar from '../../components/common/tabbar.vue'
	export default {
		components:{
			MyLine,
			tabbar
		},
		data() {
			return {
				listData: '',
				currentIndex: 0,
				mainHeigth: 0,
			};
		},
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:'/pages/search/search'
			})
		},
		onLoad() {
			$http.request({url: '/goods/list'}).then(res => {
				this.listData = res.data.data
				// console.log(this.listData[0].data);
			}).catch(err => {
				console.log(err);
			}),
			
			// 获取手机屏幕高度
			uni.getSystemInfo({
				success: (res) => {
					// 获得手机屏幕能够使用的高（uni除去了状态栏和导航栏） 再减去固定的头部
					// 问题1： 安卓有状态栏，貌似没有舍去
					this.mainHeigth = res.windowHeight
					// this.mainHeigth = '300px'
				}
			})
			
		}
	}
</script>

<style scoped>
	.main {
		display: flex;
	}
	.left-scroll {
		margin-right: 40rpx;
		text-align: center;
		
		width: 180rpx;
		background-color: #f7f7f7;
	}
	.right-scroll {
		flex: 1;
	}
	.left-item {
		height: 100rpx;
		border: #fff 1px solid;
		line-height: 100rpx;
		font-weight: bold;
	}
	.right-scroll {
		flex: 1;
	}
	.main-title {
		font-weight: bold;
		font-size: 36rpx;
		padding: 30rpx 0;
	}
	.r-content {
		display: flex;
		flex-wrap: wrap;
	}
	.r-item {
		width: 33%;
		
	}
	.r-item-img {
		width: 100%;
	}
	.r-item-name {
		font-size: 28rpx;
		text-align: center;
		padding: 30rpx 0;
		line-height: 30rpx;
	}
	.selected {
		background-color: #fff;
		border-left: 8rpx solid #49BDFB;
	}
</style>
