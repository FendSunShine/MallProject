import Vuex from 'vuex'

export default {
	state: {
		// 是否全选
		CheckAll: false,
		// 存放选中的id
		CheckedId: [],
		shopList: []
	},

	actions:{	
		// 全选点击触发
		CheckAllFn({commit, getters}){
			// 如果全选，这清空选中ID， 否则存满选中ID
			getters.isCheckFn ? commit('unCheckedAll') : commit('CheckedAll')
		},
		// 点击单个商品选择
		tapItemCheck({state,getters}, id){
			let temp = state.CheckedId.indexOf(id);
			if (temp != -1){
				state.CheckedId.splice(temp,1)
			} else {
				state.CheckedId.push(id)
			}
			// 如果选满了，这触发下面全选
			state.CheckAll = getters.isCheckFn ? true : false
		},
		// 点击删除按钮
		delShopGoodsFn({commit}){
			commit('delDoods')
		}
		
	},
	mutations: {
		// 全不选，清空ID
		unCheckedAll(state){
			state.CheckAll = false
			state.CheckedId = []
		},
		// 全选，存满ID
		CheckedAll(state){
			state.CheckAll = true
			// 先清空再赋值满
			state.CheckedId = []
			state.shopList.forEach(val => {
				state.CheckedId.push(val.id)
			})
		},
		// 点击单个商品选择
		tapItemCheck(state, id){
			let temp = state.CheckedId.indexOf(id);
			if (temp != -1){
				state.CheckedId.splice(temp,1)
			} else {
				state.CheckedId.push(id)
			}
			
		},
		// 删除商品
		delDoods(state){
			state.shopList = state.shopList.filter((item) => {
				// 选择删除CheckId的商品
				return !state.CheckedId.includes(item.id)
			})
			// 删除知之后清空
			state.CheckedId = []
		},
		// 加入购物车
		addToShopCar(state, shopData){
			state.shopList.push(shopData)
		}
	},
	
	// 相当于计算属性
	getters: {
		// 判断是否全选
		isCheckFn(state){
			return state.CheckedId.length == state.shopList.length
		},
		// 返回合计价格与数量
		totalCount(state){
			let total = {
				price: 0,
				num: state.CheckedId.length
			}
			for(let id of state.CheckedId){
				// 找到商品信息里选择的ID
				state.shopList.map((item) => {
					if (item.id == id) {
						total.price += item.price * item.amount
					}
				})
			}
			return total
		}
	}



}