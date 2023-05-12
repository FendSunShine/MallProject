<script>
	export default {
		onLaunch: function() {
			console.log('App开始展示了')
			// 这里可以执行登录用户数据刷新
			this.$store.commit('initUser')
			
		},
		// onShow: function() {
		// 	console.log('App Show')
		// },
		// onHide: function() {
		// 	console.log('App Hide')
		// }
	}
</script>

<style>
	/*每个页面公共css */
	@import 'common/uni.css';
	@import 'common/iconfont.css';
	@import  'common/common.css';
	
</style>
