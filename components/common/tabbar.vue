<template>
	<view class="items">
		<view class="item" v-for="it,idx in list" :key="idx" @tap="navTo(it.pagePath)">
			<image :src="currentPage == it.pagePath ? it.selectedIconPath : it.iconPath" mode=""></image>
			<text>{{it.text}}</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
			props:['currentPage'],
			data(){
				return {
					list: [{
						"pagePath": "index",
						"iconPath": "/static/tabber/index.png",
						"selectedIconPath": "/static/tabber/indexSelected.png",
						"text": "首页"
					}, {
						"pagePath": "list",
						"iconPath": "/static/tabber/list.png",
						"selectedIconPath": "/static/tabber/listSelected.png",
						"text": "商品列表"
					},
					{
						"pagePath": "shopcart",
						"iconPath": "/static/tabber/shop.png",
						"selectedIconPath": "/static/tabber/shopSelected.png",
						"text": "购物车"
					}, {
						"pagePath": "my",
						"iconPath": "/static/tabber/my.png",
						"selectedIconPath": "/static/tabber/mySelected.png",
						"text": "我的"
					}
					
					]
				}
			},
			computed:{
				...mapState({
					state: state => state
				})
			},
			methods:{
				navTo(page){
					if (page == 'shopcart' || page == 'my') {
						// 如果在登录状态，则直接跳，不在就显登录
						if (this.state.login.loginState){
							uni.redirectTo({
								url:`/pages/${page}/${page}`
							})
						} else {
							uni.showToast({
								title:'请登录',
								icon:'none'
							})
							
							uni.showModal({
								title: '提示',
								content: '是否登录',
								success: function (res) {
									if (res.confirm) {
										console.log('用户点击确定');
										// 去登录页
										uni.navigateTo({
											url:'/pages/login/login'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});

						}
					} else {
						uni.redirectTo({
							url:`/pages/${page}/${page}`
						})	
					}

				}
			}
			
		
	}
</script>

<style scoped>
	.items {
		z-index: 999;
		width: 100%;
		height: 120rpx;
		position: fixed;
		background-color: #fff;
		left: 0;
		bottom: 0;
		display: flex;
		
	}
	.item {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
	image {
		width: 50rpx;
		height: 50rpx;
	}
	text {
		font-size: 20rpx;
	}
</style>