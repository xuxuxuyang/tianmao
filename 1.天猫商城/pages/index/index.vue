<template>
	<view>
		<!-- 搜索 -->
		<Search></Search>
		<!-- 轮播 -->
		<Swipers :bannerdata="bannerdata"></Swipers>
		<!-- 抢购-->
		<Purchase :recomdata="recomdata"></Purchase>
		<!-- 榜单 -->
		<List :billdata="billdata"></List>
		<!-- 卡片流 -->
		<Commodity :commdata="commdata"></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
		<!-- 页面loading -->
		<full-loading ref="fullload"></full-loading>
	</view>
</template>

<script>
// 搜索
import Search from './component/search.vue'
// 轮播
import Swipers from './component/swiper.vue'
// 抢购
import Purchase from './component/purchase.vue'
// 榜单
import List from './component/list.vue'
// 引入公用的组件：卡片流
import Commodity  from '../components/commodity.vue'
export default{
	// 注册进父组件
	components:{Search,Swipers,Purchase,List,Commodity},
	data() {
		return {
			bannerdata:[],
			recomdata:[],
			billdata:[],
			commdata:[],
			//卡片商品请求页数
			pageid:0
		}
	},
	methods:{
		async indexRequest(){
			let banner = new this.Request(this.Urls.m().bannerget).modeget()// 轮播
			let recomm = new this.Request(this.Urls.m().getrecommurl).modeget()// 推荐抢购商品
			let billboard = new this.Request(this.Urls.m().billboardurl).modeget()// 天猫榜单
			let commodcrad = new this.Request(this.Urls.m().commodcradurl + '?page=' + this.pageid).modeget()// 卡片流商品
			try{
				let res = await Promise.all([banner,recomm,billboard,commodcrad])	// 同时并发请求：Promise.all([])
				this.bannerdata = res[0].data// 轮播
				this.recomdata = res[1].data// 推荐抢购商品
				this.billdata = res[2].data// 天猫榜单
				this.commdata = res[3].data// 卡片流商品
				this.$refs.fullload.init()// 取消loading
			}catch(e){
				//TODO handle the exception
			}
		},
		// 上拉加载所得数据
		async pullUp(){
			try{
				// 卡片流商品
				let commodcrad = await new this.Request(this.Urls.m().commodcradurl + '?page=' + this.pageid).modeget()
				if(commodcrad.data.length == 0){
					this.$refs.loadon.loAd({whether:true, tips:'没有更多了',picture:false})
				}else{
					this.commdata = [...this.commdata,...commodcrad.data]// 把之前得到的数据和上拉之后得到的数据做一个数组合并
				}
			}catch(e){
				//TODO handle the exception
			}
		}
	},
	mounted() {
		this.indexRequest()
	},
	// 页面触底事件
	onReachBottom(){
		this.$refs.loadon.loAd({whether:true}) 
		this.pageid++
		this.pullUp() //上拉加载
	}
}
</script>

<style>
page{background-color: #f4f4f4;}
</style>
