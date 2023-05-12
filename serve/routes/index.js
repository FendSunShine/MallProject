var express = require('express');
var router = express.Router();
var connection = require('../db/sql')
var user = require('../db/userSql')
const jwt = require('jsonwebtoken')
//设置跨域访问
// router.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

// 请求地址数据
router.post('/api/getAddress',  function(req, res) {
	console.log('token', req.headers.token)
	let mark = jwt.decode(req.headers.token)
	if (mark.userName){
		// 在user表找出用户ID
		connection.query(`select * from user where phone=${mark.userName}`, function(error,results,fields){
			let id = results[0].id
			// 拿到id,在地址表找到用户地址信息
			connection.query(`select * from address where userId=${id}`, (err2, res2) => {
				res.send(res2[0])
				console.log(res2[0])
			})
		}) 
	} else {
		
	}
})

// 测试token
router.post('/api/abc', function(req, res) {
	console.log('444');
	res.send('666')
})


// 新增用户
router.post('/api/addUser', function(req, res) {
	let params = req.body
	let userData = {
		userPwd: '123456',
		phone: params.phone,
		nickName: '默认昵称' + String( Math.trunc(( Math.random() * 8999 + 1000)))
	}
	connection.query(user.insertData(userData), function(error,results,fields){
		console.log(results, 'res');
		if (results.affectedRows>0){
			res.send({
				msg: '加入成功',
			})
		} else {
			res.send({
				msg: '加入失败',
			})
		}

	})
})


// 第三方登录接口
router.post('/api/loginOther', function(req, res){
	let {provider, nickName, avatarUrl, openId} = req.body
	// console.log(provider, nickName,openId);
	// 先查询QQ或者微信有没有注册过
	connection.query(user.queryUserName({provider, openId}), function(error,results,fields){
		console.log('results:', results);
		if (!(results && results.length > 0)){
			// 没注册过，。增加=》查询=》登录
			// 增加
			connection.query(user.insertData({provider, nickName, avatarUrl, openId}), function(error,results1,fields){
				// 查询， 主要是登录前端需要数据imgurl, nickName, password
				connection.query(user.queryUserName({provider, openId}), function(error,results2,fields){
					res.send(results2[0])
				})
			})
		} else {
			// 注册过，查询=》登录
			// 查询， 主要是登录前端需要数据imgurl, nickName, password
			connection.query(user.queryUserName({provider, openId}), function(error,results2,fields){
				res.send(results2[0])
				})
				}
				
	})






})

// 得到验证码
router.post('/api/code', function(req, res) {
	let phone = req.body.phone && req.body.phone
	// 接入SDK
	// 模仿SDK。验证码为手机号后4位

	res.send(phone.slice(-4))
	
	} )


// 判断手机号是否注册
router.post('/api/register', function(req, res){
	 
	let params = {
		userName: req.body.phone
	}
	connection.query(user.queryUserName(params), function(error,results,fields){
		if (results && results.length > 0){
			res.send({
				success: false,
				msg: '改手机号已被注册'
			})
		} else {
			res.send({
				success: true,
				
			})
		}
	})
})

// 用户登录接口
router.post('/api/login', function(req, res){
	let params = {
		userName: req.body.userName,
		userPwd : req.body.userPwd,
		}
	// 查询用户名或者手机号存不存在
	connection.query(user.queryUserName(params), function(error,results,fields){
		if (results && results.length > 0){
			// 存在， 查询其密码是否正确
			connection.query(user.queryUserPwd(params), function(error1, results1){
				if(error1) throw error1
				if(results1.length > 0){
					// 存在用户
						res.send({
									data:
										{
											msg: '登录成功',
											success: true,
											data:results1[0]
										}
								})
				} else {
					res.send({
						data:
							{
								msg: '密码错误',
								success: false
							}
					})
				}
			})
			
		} else {
			res.send({
				data:
					{
						msg: '该用户名或手机号不存在',
						success: false
					}
			})
		}
	})
})





router.get('/api/goods/id', function(req, res){
	let id = req.query.id
	connection.query(`select * from goods where id=${id}`, function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results);
	  res.send(results)
	});
})



router.get('/api/goods/search', function(req, res){
	// 接收前端的数据
	// console.log(req.query, 'qianduan???');
	// asc 正序 desc 倒叙
	// 遇到的问题（已解决） name得到的是字符串， 已req.query.name的形式是不可行的
	let [Name, orderName] = Object.keys(req.query)
	// console.log(typeof(name), typeof(orderName), '格式');
	// console.log(name, orderName, 'name, orderName');
	// console.log(req.query[orderName], 'what 1');
	// console.log(req.query[name], 'what 2');
	// console.log(`select * from goods where name like "%${req.query.name}%" order by ${orderName} ${req.query[orderName]}`, 'yuju');
	// console.log(req.query.Name);
	connection.query(`select * from goods where name like "%${req.query[Name]}%" order by ${orderName} ${req.query[orderName]}`, function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results);
	  res.send(results)
	});
	

})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/index_list/data',function(req, res, next){
	res.send({
		data:{
			code: 200,
			data: {
				topNav:[
				{name:'推荐'},
				{name:'运动户外'},
				{name:'服饰内衣'},
				{name:'鞋靴箱包'},
				{name:'美妆个护'},
				{name:'家居数码'},
				{name:'食品母婴'}
				],
				data:
					[
						{
							type: 'indexSwiper',
							data:[
								{imgUrl: '/static/imgs/swiper1.jpg'},
								{imgUrl: '/static/imgs/swiper2.jpg'},
								{imgUrl: '/static/imgs/swiper3.jpg'}
							]

						},
						{
							type: 'recommend',
							data:[
								{
									Bigurl: '/static/imgs/Children.jpg',
									SmUrl: ['/static/imgs/Children1.jpg',
											 '/static/imgs/Children2.jpg',
											'/static/imgs/Children3.jpg']
								},
								{
									Bigurl: '/static/imgs/Furnishing.jpg' ,
									SmUrl: ['/static/imgs/Furnishing1.jpg',
											 '/static/imgs/Furnishing2.jpg',
											'/static/imgs/Furnishing3.jpg']
								},
							]
						},
						{
							type: 'card',
							data: '猜你喜欢'
						},
						{
							type: 'CommodityList',
							data: 	[
								{
								id: 0,
								img :'/static/imgs/commodity1.jpg',
								name: 'BALENCIAGA巴黎世家BALENCIAGA / adidas 男士运动夹克外套',
								newprice: '199',
								oldprice:'599',
								discount: '5.1',
								},
								{
								id: 1,
								img :'/static/imgs/commodity2.jpg',
								name: '小款Hualun秋冬季男士外套学生宽松夹棉棒球服男款ins潮痞帅百搭夹克',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								id: 2,
								img :'/static/imgs/commodity1.jpg',
								name: '大款外套男春秋款夹克男士新款潮牌男生秋冬季仿麂皮绒棒球服秋装上衣',
								newprice: '269',
								oldprice:'599',
								discount: '5.1',
								},
								{
								id: 3,
								img :'/static/imgs/commodity2.jpg',
								name: '小小款华夫格卫衣男春秋季潮美式纯色男士高级感圆领打底衫长袖加绒外套',
								newprice: '788',
								oldprice:'599',
								discount: '5.1',
								},
								{
								id: 4,
								img :'/static/imgs/commodity1.jpg',
								name: '大小款条纹华夫格卫衣男春秋美式宽松圆领长袖打底衫四条杠加绒外套男士',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								id: 5,
								img :'/static/imgs/commodity2.jpg',
								name: '中【丝绒内里】雅戈尔夹克秋季新款男士官方商务时尚立领外套9621',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
						}
					]
					
				}
			}
		})})















// 地址/api/index_list/栏目的id/data/分页

// 运动户外

// 运动户外 1







// 运动户外
router.get('/api/index_list/1/data/1', function(req, res){
	res.send({
		data:{
			code:200,
			data:[
				{
					type: 'banner',
					imgurl: '@/static/imgs/banner1.jpg'
				},
				{
					type: 'icons',
					data: [
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋1'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋2'
						},
	
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋3'
						},
				
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋4'
						},
						
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋5'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋6'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋5'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '跑步鞋5'
						}
					]
					
				},
				{
					type: 'hotList',
					HotList: [
						{
						img :'/static/imgs/hot1.jpg',
						name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg',
						name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg',
						name: '爆款疯狂 GG008 大姨绒毛大款 2020 年必须 买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot1.jpg',
						name: '大姨绒毛大款 2020 年必须买,不 买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg', 
						name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂  GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg',
						name: '爆款疯狂 GG008 大姨绒毛大款 2020 年 必须买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						}
					]
				},
				{
					type: 'shopList',
					data:[
						{
							shopimg:[
								'../../static/imgs/shop.jpg',
							]
							,
							shopList:
								[
									{
									img :'/static/imgs/shop1.jpg',
									name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop2.jpg',
									name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop3.jpg',
									name: '爆款疯狂 GG008 大姨绒毛大款 2020 年必须 买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									}
							
							
								]},
						{
							shopimg:[
								'../../static/imgs/shop.jpg',
							]
							,
							shopList:
								[
									{
									img :'/static/imgs/shop2.jpg',
									name: '大姨绒毛大款 2020 年必须买,不买你就不行 了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop3.jpg',
									name: '大姨绒毛大款 2020 年必须买 ,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop1.jpg',
									name: '爆款疯狂 GG008 大姨 绒毛大款 2020 年必须 买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									}
							]
						}
					]
				},
				{
					type: 'CommodityList',
					data: 	[
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
				}
			]
		}
	})
})
// 运动户外2,3,4
router.get('/api/index_list/1/data/2', function(req, res){
	res.send({
		code: '200',
		data: {
					type: 'CommodityList',
					data: 	[
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
				}
	})
})
router.get('/api/index_list/1/data/3', function(req, res){
	res.send({
		code: '200',
		data: {
					type: 'CommodityList',
					data: 	[
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
				}
	})
})
router.get('/api/index_list/1/data/4', function(req, res){
	res.send({
		code: '200',
		data: {
					type: 'CommodityList',
					data: 	[
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
				}
	})
})
router.get('/api/index_list/2/data/1', function(req, res){
	res.send({
		data:{
			code:200,
			data:[
				{
					type: 'banner',
					imgurl: '@/static/imgs/banner1.jpg'
				},
				{
					type: 'icons',
					data: [
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰1'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰2'
						},
	
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰3'
						},
				
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰4'
						},
						
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰5'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰6'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰5'
						},
						{
							img: './../static/imgs/icons1.png',
							img_t: '服饰5'
						}
					]
					
				},
				{
					type: 'hotList',
					HotList: [
						{
						img :'/static/imgs/hot1.jpg',
						name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg',
						name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg',
						name: '爆款疯狂 GG008 大姨绒毛大款 2020 年必须 买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot1.jpg',
						name: '大姨绒毛大款 2020 年必须买,不 买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg', 
						name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂  GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						},
						{
						img :'/static/imgs/hot2.jpg',
						name: '爆款疯狂 GG008 大姨绒毛大款 2020 年 必须买,爆款疯狂 GG008',
						newprice: '299',
						oldprice:'599',
						discount: '5.1',
						}
					]
				},
				{
					type: 'shopList',
					data:[
						{
							shopimg:[
								'../../static/imgs/shop.jpg',
							]
							,
							shopList:
								[
									{
									img :'/static/imgs/shop1.jpg',
									name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop2.jpg',
									name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop3.jpg',
									name: '爆款疯狂 GG008 大姨绒毛大款 2020 年必须 买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									}
							
							
								]},
						{
							shopimg:[
								'../../static/imgs/shop.jpg',
							]
							,
							shopList:
								[
									{
									img :'/static/imgs/shop2.jpg',
									name: '大姨绒毛大款 2020 年必须买,不买你就不行 了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop3.jpg',
									name: '大姨绒毛大款 2020 年必须买 ,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									},
									{
									img :'/static/imgs/shop1.jpg',
									name: '爆款疯狂 GG008 大姨 绒毛大款 2020 年必须 买,爆款疯狂 GG008',
									newprice: '299',
									oldprice:'599',
									discount: '5.1',
									}
							]
						}
					]
				},
				{
					type: 'CommodityList',
					data: 	[
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款s疯狂 GG008 大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必 须买,不买你就不行了,爆款疯狂s GG008 大姨绒s毛大款 2020 年必须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity1.jpg',
								name: '大姨绒毛大款 2020 年必须买 ,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必须d买,不买你就不行了,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								},
								{
								img :'/static/imgs/commodity2.jpg',
								name: '大姨绒毛大款 2020 年必须买,不买你就不行了,爆款疯狂 GG008 大姨绒毛大款 2020 年必d须买,爆款疯狂 GG008',
								newprice: '299',
								oldprice:'599',
								discount: '5.1',
								}
							]
				}
			]
		}
	})
})

router.get('/api/goods/list', function(req, res){
	res.send({
		'code': 0,
		data:[
			{
				id: 1,
				name: '服饰',
				data: [
					{
						name: '上衣',
						list: [
							{id: 1, name: '夹克1', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '夹克2', imgurl: '@/static/imgs/hot1.jpg'},
							{id: 1, name: '夹克3', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '夹克4', imgurl: '@/static/imgs/hot2.jpg'},
						]
					},
					{
						name: '鞋子',
						list: [
							{id: 1, name: '鞋子1', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '鞋子2', imgurl: '@/static/imgs/hot1.jpg'},
							{id: 1, name: '鞋子3', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '鞋子4', imgurl: '@/static/imgs/hot2.jpg'},
						]
					}
				]
			},
			{
				id: 2,
				name: '家具家纺',
				data: [
					{
						name: '板凳',
						list: [
							{id: 1, name: '板凳1', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '板凳1', imgurl: '@/static/imgs/hot1.jpg'},
							{id: 1, name: '板凳1', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '板凳1', imgurl: '@/static/imgs/hot2.jpg'},
						]
					},
					{
						name: '桌子',
						list: [
							{id: 1, name: '桌子1', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '桌子1', imgurl: '@/static/imgs/hot1.jpg'},
							{id: 1, name: '桌子1', imgurl: '@/static/imgs/hot3.jpg'},
							{id: 1, name: '桌子1', imgurl: '@/static/imgs/hot2.jpg'},
						]
					}
				]
			}
		]
	
	
	})
})

















































module.exports = router;