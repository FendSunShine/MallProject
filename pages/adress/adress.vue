<template>
	<view>
		<view class="adress-list ">
			<view  @tap="gotoAddAddress(index)" v-for="item,index in pathList" :key="index">
				<view class="adress-item" @tap="gobackConfirmOrder(item)">
					<view class="user-info">
						<view class="name">{{item.name}}</view>
						<view class="phone">{{item.phone}}</view>
					</view>
					<view class="address-it">
						<view class="left" v-if="item.isdefaultAddr">默认</view>
						<view class="adress">{{item.province + item.city + item.district + item.address}}</view>
					</view>
				</view>
			</view>
				
		</view>
		
		<view class="addAdress">
			<view class="btn" @tap="gotoAddAddress">新增地址</view>
		</view>
	</view>
</template>

<script>
	import $http from '../../common/api/request.js'
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				// 是否是选择地址页面传过来的
				isSelect: false
			}
		},
		methods: {
			...mapMutations(['initStore']),
			_init_address(){
				// 请求收货地址接口,得到收货地址并放入store
				$http.request({
					url:'/getAddress',
					method:'POST',
					header:{
						// 带入token，查询的时候解析tonken，token 包含用户数据，用它查数据表
						token:true 
					}
				}).then(res => {
					console.log('data, res:', res);
					// 得到数据放入store
					this.initStore(res.data)
					
				})
				
			},
			gotoAddAddress(index){
				let pathData = JSON.stringify({
					index,
					pathList: this.pathList[index]
				})
				uni.navigateTo({
					url:`/pages/add-address/add-address?data=${pathData}`
				})
			},
			gobackConfirmOrder(item){
				// console.log(item, 'gobackConfirmOrder');
				if (this.isSelect){
					uni.navigateBack()
				}
				// 发送数据
				uni.$emit('getAddr', item)
			}
		},
		computed: {
			...mapState({
				pathList: item => item.path.pathList
			})
		},
		onLoad(e){
			e.type && (this.isSelect = e.type)
			
			// 执行初始化
			this._init_address()
		}

	}
</script>

<style scoped lang="less">
	.adress-list {
		padding-left: 20rpx;
		border-top: 2rpx solid #ccc;
		.adress-item {
			border-bottom: 2rpx solid #ccc;
			display: flex;
			flex-direction: column;
			padding: 10rpx;
			.address-it {
				display: flex;
				margin-top: 10rpx;
				.left {
					margin-right: 10rpx;
					background-color: #7fd2f9;
					color: #fff;
					padding: 0 20rpx;
					font-size: 24rpx;
					line-height: 40rpx;
					border-radius: 24rpx;
				}
			}
			.user-info {
				display: flex;
				.name {
					margin-right: 10rpx;
				}
			}
		}
	}
	.addAdress {
		margin-top: 30rpx;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn {
			width: 250rpx;
			height: 60rpx;
			border: #7fd2f9 2rpx solid;
			border-radius: 60rpx;
			text-align: center;
			color: #7fd2f9;
			line-height: 60rpx;
		}
	}
	
</style>
