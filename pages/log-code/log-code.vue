<template>
	<view>
		<myLine></myLine>
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>验证码</text>
						<input type="text" focus='true' v-model="inputCode"  placeholder="请输入验证码"/>
						<button plain="true" size="mini" :disabled="isDisabled" @tap="sendCode">{{btnTxt}}</button>
					</view>
				</view>
				<view class='tel' @tap='gotoIndex'>下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
    import {mapMutations} from 'vuex'
    import $http from '../../common/api/request.js'
    import myLine from '@/components/common/myLine.vue'
    export default {
        data() {
            return {
                
                    isDisabled: false,
                    // 按钮文字
                    btnTxt: '重新发送',
                    // 倒计时
                    sendTime: 5,
                    phone: '',
                    inputCode: '', // 输入的验证码
                    receiveCode: '', 
                    
                }
        },
        components:{
            myLine
        },

        onLoad(e) {
            // 存起来以便下次发送验证码
            this.phone = e.phone
            console.log(e.phone, 'phone');
            // 第一次进入发送
            this.sendCode()
        },
        methods: {
            ...mapMutations(['loginData']),
            // 发送验证码
            sendCode(){
                // 锁定按钮并开始倒计时
                this.isDisabled = true
                let timer = setInterval(()=> {
                    this.sendTime--
                    this.btnTxt = `重新发送(${this.sendTime})`
                    if (this.sendTime <= 0) {
                        // console.log(this.sendTime);
                        clearInterval(timer)
                        this.sendTime = 5
                        this.isDisabled = false
                        this.btnTxt = `重新发送`
                    }
                }, 1000)
                // 拿到手机号之后传入后端，得到验证码
                $http.request({
                    url:'/code',
                    method: 'POST',
                    data: {
                        phone: this.phone
                    }
                }).then(res => {
                        this.receiveCode = res.data
                    }
                )
                
            
            },
            // 点击下一步
            // 返回首页之前验证验证码是否一致
            gotoIndex(){
                // 判断验证码与输入的验证码是否一致
                if (this.receiveCode == this.inputCode) {
                    // 传给后端新增的数据
                    let params = {
                        phone: this.phone,
                        inputCode: this.inputCode
                    }
                    this.addUser(params)
                    // 注册成功之后直接登录
                    // 重新读去改手机信息
                    // 123456为后端的默认密码
					uni.showToast({
						title:'注册成功',
						icon:'none'
					})
					setTimeout(() => {
						uni.showLoading({
							title:'正在登录'
						})
					}, 500)
					setTimeout(() => {
						uni.hideLoading()
						this.newLogin(this.phone, '123456')
						
					}, 1000)
                    // uni.switchTab({
                    // 	url:'/pages/index/index'
                    // })
                
                }
            },
            // 传给后端新增的数据
            addUser(params){
                $http.request({
                    url:'/addUser',
                    method: 'POST',
                    data: params
                }).then(res => {
                    // console.log('qd', res);
                })
            },
            // 新注册登录
            newLogin(user, password){
                // 数据库验证
                    $http.request({
                        url: '/login',
                        method: 'POST',
                        data: {
                            userName: user,
                            userPwd: password
                        }
                    }).then(res => {
                        
                        uni.showToast({
                            title:res.data.data.msg,
                            icon:'none'
                        })
                        if (res.data.data.success) {
                            // 登录的得到的数据进行状态管理，到时候会放到各个页面去
                            this.loginData(res.data.data.data)
                            uni.navigateTo({
                                url:'/pages/index/index'
                                // url:'/pages/my/my'
                            })
                        }
                    }).catch(err => {
                        uni.showToast({
                            title:err,
                            icon:'none'
                        })
                    })
                }
            }
        }
	
</script>

<style scoped lang="less">
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.login-from{
	padding:30rpx 0;
}
.login-user{
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
	button {
		
	}
}
.user-text{
	padding-right:10rpx;
}
.tel{
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
</style>
