<template>
	<view class="add-list">
		<view class="add-item">
			<text>收件人</text>
			<input type="text" v-model="pathObj.name"  placeholder="收件人姓名"/>
		</view>
		<view class="add-item">
			<text>手机号</text>
			<input type="text" v-model="pathObj.phone"  placeholder="11位手机号"/>
		</view>
		<view class="add-item">
			<text>所在地区</text>
			<input type="text"  v-model="pathObj.address"   placeholder="请选择"/>
			<view class="icon" @tap="selectAddr" >></view>
			
		</view>
		<view class="add-item">
			<text>详细地址</text>
			<input type="text"  v-model="pathObj.detailedAddr" placeholder="5-60个字符"/>
		</view>
		<view class="add-item">
			<text>邮编</text>
			<input type="text" v-model="pathObj.postalCode"  placeholder="可选填"/>
		</view>
		<view class="add-item">
			<text>设为默认地址</text>
			<label class="radio" @tap="changeDefaultAddr">
				<radio :checked="pathObj.isdefaultAddr"	/><text></text>
			</label>
		</view>
		
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" 
		@onConfirm="onConfirm"></mpvue-city-picker>
			
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue';
	import {mapActions} from 'vuex'
	export default {
		components:{
			mpvueCityPicker,
		},
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
				pathObj: {
					name: '',
					phone: '',
					address: '',
					detailedAddr: '',
					postalCode: '',
					isdefaultAddr: false
				},
				// 是否在修改
				isRevise: false,
				// 目前的index, 修改时用
				index: null,
			};
		},
		methods:{
			...mapActions(['addfn', 'updataFn']),
			selectAddr(){
				   this.$refs.mpvueCityPicker.show();
			},
			
			// 
			showCityPicker() {
			  this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
			  this.pathObj.address = e.label
			},
			// 默认单选
			changeDefaultAddr(){
				this.pathObj.isdefaultAddr = !this.pathObj.isdefaultAddr
			}
		},
		onNavigationBarButtonTap() {
			if (this.isRevise){
				// 是修改
				let reviseData = {
					index: this.index,
					pathObj: this.pathObj
				}
				this.updataFn(reviseData)
			} else {
				// 不是修改
				this.addfn(this.pathObj)
			}
			
			uni.navigateBack()
		},
		onLoad(e) {
			let data = JSON.parse(e.data)
			// 如果是修改地址的点击
			if (data.pathList){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				// 改变状态为修改
				this.isRevise = true
				// 赋值数据
				this.pathObj = data.pathList
				this.index = data.index
			}
		}
		
	}
</script>

<style scoped lang="less">
.add-list {
	border-top: 2rpx solid #ccc;
	padding: 30rpx;
	.add-item {
		position: relative;
		width: 100%;
		padding: 20rpx 20rpx;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;
		display: flex;
		text {
			width: 200rpx;
			margin-right: 20rpx;
		}
		.icon {
			position: absolute;
			right: 0;
		}
		.radio {
			position: absolute;
			right: 0;
		}
	}
}
</style>
