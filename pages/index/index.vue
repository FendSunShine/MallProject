<template>
	<view>
		<scroll-view class="topNavgation"  scroll-x="true" 	:scroll-into-view = "'top' + tabIndex"
		>
			<view class="topNavgation-item"
			v-for="(item,index) in topNav" :key="item.name"
			@click="setTabIndex(index)"
			:id = "'top'+ index"
			>
				<text :class=" index == tabIndex ? 'selected ': 'unselected'">{{item.name}}</text>
			</view>
		</scroll-view>
		
		
		<swiper   :style="'height:' +  mainHeigth + 'px'"  :current=tabIndex @change='swiperChange'>
		<!-- <swiper  style="height: 300px" :current=tabIndex @change='swiperChange'> -->
			<swiper-item class="swiper" v-for="data,index in NavData" :key="index">
				<!-- <view class="swiper-item">{{it.name}}</view> -->
				
				<template v-if="index == 0">
					<scroll-view scroll-y="true"  :style="'height:' +  mainHeigth + 'px'" @scrolltolower='onloadMore(index)'>
							<view class="main-data" v-for="item,index in data" :key="index">
								<!-- 首页 -->
								<IndexSwiper v-if="item.type=='indexSwiper'" :data='item'></IndexSwiper>
								<block v-if="item.type=='recommend' ">
									<recommend  :data='item'></recommend>
									<Card name="猜你喜欢"></Card>
								</block>
								<CommodityList  v-if="item.type=='CommodityList'" :data='item'></CommodityList>
							</view>
					</scroll-view>
				</template>
				<template v-if="index == 1">
					<!-- <h1>item: {{item}}</h1> -->
					<scroll-view scroll-y="true"  :style="'height:' +  mainHeigth + 'px'" @scrolltolower='onloadMore(index)' >
							<view class="main-data" v-for="item,index in data" :key="index">
								<Banner v-if="item.type == 'banner'" :imgurl='item.imgurl'></Banner>
								
								<template  v-if="item.type == 'icons'" >
									<icons :data='item.data'></icons>
									<Card name="热销爆品"></Card>
								</template>
								<template v-if="item.type == 'hotList'" >
									<Hot :data='item.HotList'></Hot>
									<Card name="推荐店铺"></Card>
								</template>
								<template v-if="item.type == 'shopList'" >
									<Shop :data='item'></Shop>
									<Card name="为您推荐"></Card>
								</template>
								<CommodityList v-if="item.type=='CommodityList'" :data='item'></CommodityList>
							</view>
							<view class="load-more f-active-color">
								下拉加载数据
							</view>
					</scroll-view>
				</template>
				<template v-if="index == 2">
					<!-- <h1>item: {{item}}</h1> -->
					<scroll-view scroll-y="true"  :style="'height:' +  mainHeigth + 'px'" >
							<view class="main-data" v-for="item,index in data" :key="index">
								<Banner v-if="item.type == 'banner'" :imgurl='item.imgurl'></Banner>
								
								<template  v-if="item.type == 'icons'" >
									<icons :data='item.data'></icons>
									<Card name="热销爆品"></Card>
								</template>
								<template v-if="item.type == 'hotList'" >
									<Hot :data='item.HotList'></Hot>
									<Card name="推荐店铺"></Card>
								</template>
								<template v-if="item.type == 'shopList'" >
									<Shop :data='item'></Shop>
									<Card name="为您推荐"></Card>
								</template>
								
								<CommodityList v-if="item.type=='CommodityList'" :data='item'></CommodityList>
								
							</view>
					</scroll-view>
				</template>
							
			</swiper-item>
		</swiper>
		
		<tabbar currentPage='index'></tabbar >
		<!-- 推荐模板 -->
		<!-- <IndexSwiper></IndexSwiper> -->
<!-- 		<recommend></recommend>
		<Card name="猜你喜欢"></Card>
		<CommodityList></CommodityList>
		<Card name="运动户外"></Card> -->
		
		
		<!-- 其它模板 -->
<!-- 		<banner></banner>
		<icons></icons>
		<Card name="热销爆品"></Card>
		<Hot></Hot>
		<Card name="推荐店铺"></Card>
		<Shop></Shop>
		<Card name="为您推荐"></Card>
		<CommodityList></CommodityList> -->
	</view>
</template>

<script>
	import $http from '../../common/api/request.js'
	import IndexSwiper from '@/components/index/indexSwiper.vue'
	import Recommend from '@/components/index/Recommend.vue'
	import Card from '@/components/common/card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import Banner from '@/components/index/Banner.vue'
	import Icons from '@/components/index/Icons.vue'
	import Hot from '@/components/index/Hot.vue'
	import Shop from '@/components/index/Shop.vue'
	import tabbar from "../../components/common/tabbar.vue"
	export default {
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop,
			tabbar
		},
		data() {
			return {
				list: [1,2,3,4,5,6,7],
				title: 'Hello',
				tabIndex: 0, //目前流转的索引
				mainHeigth: '400px',
				topNav:null,
				NavData: [],
				// 判断第一屏数据是否首次加载（只需要加载一次）
				isFirst: [0,0,0,0,0,0,0], // 0表示否 
				refleshIdx : [1,1,1,1,1,1,1], // 用来记录每一个是第几次loadmore刷新
			}
		},
		methods: {
			setTabIndex(index){
				this.tabIndex = index
				// 发起数据请求
				if (index==0) return 
				if (!this.isFirst[index]){
					$http.request({
						url: `/index_list/${index}/data/1`
					}).then(res => {
						if (res.statusCode == 200){
							// this.NavData[index].push(...res.data.data.data)
							// 加载时清空之前的数据
							this.NavData[index].splice(0, this.NavData[index].length, ...res.data.data.data)
							
							this.isFirst[index] = 1
							
							console.log(this.NavData[2], 'tabData@', index);
					}})
					}},
					
				
				
				
			
			swiperChange(e){
				// console.log(e.target.current)
				this.tabIndex = e.target.current
			},
			initVavData(data){
				let val = []
				for(let i=0; i<this.topNav.length; i++){
					val.push([])
				}
				val[0] = data
				
				// console.log(val, 'val', val.length)
				return val				
			},
			onloadMore(index){
				console.log(index);
				$http.request({url: `/index_list/${index}/data/${this.refleshIdx[index]+1}`}).
				then(res => {
					// 下拉加载主要是加载商品推荐部分，故得到商品推荐部分并push
					this.NavData[index][4].data.push(...res.data.data.data)
					console.log(this.NavData[index][4].data, `第${this.refleshIdx[index]}次增加`);
					// 刷新一次就增加，接受下一次的数据
					this.refleshIdx[index]++
				}).catch((err) => {
					uni.showToast({
						title:'加载失败'
					})
				})
				
			}
		},
		onReady() {
			// const query = uni.createSelectorQuery().in(this);
			// query.select('.main-data').boundingClientRect(data => {
			//   // console.log("得到布局位置信息" + JSON.stringify(data));
			// 	this.mainHeigth =  data.height +  'px'
			// }).exec();

			
			
			
			
			uni.getSystemInfo({
				success: (res) => {
					// 获得手机屏幕能够使用的高（uni除去了状态栏和导航栏） 再减去固定的头部
					// 问题1： 安卓有状态栏，貌似没有舍去
					this.mainHeigth = res.windowHeight - uni.upx2px(70) 
					// this.mainHeigth = '300px'
				}
			})
			
		}
		,
		onLoad() {
			$http.request({url: '/index_list/data'}).then(res => {
					this.topNav = res.data.data.data.topNav
					// navdata是个包含7个队列的数据，代表着7个页面
					// res.data.data.data.data是单个页面的数据
					this.NavData = this.initVavData(res.data.data.data.data)
					// this.NavData.push(res.data.data.data.data)
					// this.NavData = (res.data.data.data.data)
			}).catch(err => {
				console.log('请求错误:', err);
			})
		},
		// 点击进入搜索
		onNavigationBarButtonTap(e){
			// console.log(e, '标题');
			if(e.float === 'left'){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style scoped>
	.demo {
		background-color: pink;
	}
	.selected {
		color:#49BDFB;
		padding: 10rpx 0;
		border-bottom: #49BDFB 4rpx solid;
	}
	.unselected {
		color:#636263;
	}
	
	.topNavgation {
		white-space: nowrap;
		/* padding: 10rpx 20rpx; */
	}
	.topNavgation-item {
		display: inline-block;
		height: 50rpx;
		font-size: 28rpx;
		padding: 10rpx 20rpx;
	}
	.swiper {
		background-color: skyblue;
	}
	.load-more {
		background-color: pink;
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 36rpx;
		
	 }
</style>
