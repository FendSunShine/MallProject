import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import shopcar from '@/store/modules/shopcar.js'
import path from "@/store/modules/path.js"
import login from '@/store/modules/login.js'
export default new Vuex.Store({
	modules:{
		shopcar,
		path,
		login
	}
})