// 微信登录
import request from '../api/api.js'
import urls from '../api/request.js'
import toast from '../public/toast.js'
class wxLogin{
	constructor(user,msg) {
	    this.user = user
		this.msg = msg
	}
	// 调用接口登录,async其实是返回一个promise
	async loGin(){
		// 登录失败
		if(this.msg != 'getUserProfile:ok'){
			throw ('登录失败')
		}
		// 获取code
		let userdata = await this.wxlogin()
		try{
			let user = await new request(urls.m().wxlogin,userdata).modepost()
			if(user.msg == 'SUCCESS'){
				uni.setStorageSync('wxuser', user.data);//存储用户信息到本地缓存
				new toast('登录成功').showtoast()
				return('SUCCESS')
			}
		}catch(e){
			return e
			// 500,501,502,
			//TODO handle the exception
		}
	}
	// 获取code
	wxlogin(){
		let {avatarUrl,nickName} = this.user
		return new Promise((resolve,reject)=>{
			wx.login({
				success: (res) => {
					let data = {
						appid:'wx9b7e0ec3d72a39a1',
						secret:'0f181cc0ac2055d251c618f945e0b764',
						nickName,
						avatarUrl,
						code:res.code
					}
					resolve(data)
				},
				fail: (err) => {
					reject('登录失败')
				}
			})
		})
	}
}

export default wxLogin