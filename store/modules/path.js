export default {
	state: {
		pathList: [
				// {
				// 	name: 'lx',
				// 	phone: '1910498349285',
				// 	address: '四川省仪陇县',
				// 	detailedAddr: 'rxxxxx',
				// 	postalCode: '000000 ',
				// 	isdefaultAddr: true
				// },
				// {
				// 	name: 'lsy',
				// 	phone: '1843249821943',
				// 	address: '陕西省乾县',
				// 	detailedAddr: 'xxxxxx',
				// 	postalCode: '000001',
				// 	isdefaultAddr: false
				// }
		]
	},
	mutations: {
		// 初始化地址
		initStore(state, val){
			state.pathList.push(val)
			console.log(state.pathList);
		},
		// 添加地址
		add(state, obj){
			state.pathList.unshift(obj)
		},
		// 修改数据
		updata(state, {index, pathObj}){

			for(let key in pathObj){
				state.pathList[index][key] = pathObj[key]
			}
		},
		// 去掉所有默认地址选择
		removeDefaultAddr(state){
			state.pathList.forEach(item => {
				item.isdefaultAddr = false
			})
		}
		
	},
	actions: {
		addfn({commit}, obj){
			if(obj.isdefaultAddr) commit('removeDefaultAddr')
			commit('add', obj)
		},
		// 修改
		updataFn({commit}, obj){
			if (obj.pathObj.isdefaultAddr) commit('removeDefaultAddr')
			commit('updata', obj)
		}
	},
	getters: {
		// 返回默认地址
		getDeafaultAddr(state){
			return state.pathList.filter(item => item.isdefaultAddr == true)
		}
	},
	
}