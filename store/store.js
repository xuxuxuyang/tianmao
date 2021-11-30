// vuex存放数据，数据仓库，数据管理中心
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 购物车的件数
const cartnum = {
	nums:''
}
// 收货地址数据
const addordr = {
	address:{}
}
const state = {
	cartnum,	// 购物车的件数
	addordr// 收货地址数据
}
export default new Vuex.Store({
	state,// 数据仓库中心
	// 传值
	// actions:异步传值。不能直接到达数据仓库state，store.dispath()
	// getters:计算属性，带有缓存，
	// mutations：同步传值：可以直接传给state,store.commit('mutacart',value)
	mutations:{
		mutacart(state,nums){// 加入购物车成功后传值的购物车条数
			state.cartnum = {nums}// 接收到组件传过来的值之后要存储到数据中心仓库
		},
		mutaadd(state,address){// 收货地址携带数据返回到订单页
			state.addordr = {address}
		}
	}
})