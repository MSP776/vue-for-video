import {
	createRouter,
	createWebHistory
} from 'vue-router'


// 引入就马上加载 60个页面 1个页面要1s 我们要等60s
import Main from '../views/Main.vue'

const routes = [{
		path: '/', //自定义路径 想要跳转的路径
		name: 'Main', //自定名字
		redirect: "/home",
		component: Main, //指向你想要去的页面
		//二级路由
		children: [
			//也是同样的方式配置路由
			{
				path: '/home', //注意一个点 不要出现大写
				name: 'Home',
				redirect: "/recommend", //重定向 固定到recommend页面
				component: () => import( /* webpackChunkName: "about" */ '../views/homeView/Home.vue'),
				children: [{
						path: '/recommend', //注意一个点 不要出现大写
						name: 'Recommend',
						component: () => import( /* webpackChunkName: "about" */
							'../views/homeView/tabs/Recommend.vue'),
						//我们给他加一直 判断 是左滑动还是右滑动
						meta: {
							tree: 1
						}
					},
					{
						path: '/selection', //注意一个点 不要出现大写
						name: 'Selection',
						component: () => import( /* webpackChunkName: "about" */
							'../views/homeView/tabs/Selection.vue'),
						meta: {
							tree: 2
						}
					},
					{
						path: '/hot', //注意一个点 不要出现大写
						name: 'Hot',
						component: () => import( /* webpackChunkName: "about" */
							'../views/homeView/tabs/Hot.vue'),
						meta: {
							tree: 3
						}
					}
				]

			},
			{
				path: '/handwriting', //注意一个点 不要出现大写
				name: 'Handwriting',
				component: () => import( /* webpackChunkName: "about" */
					'../views/homeView/tabs/Handwriting.vue'),
			},
			{
				path: '/search', //注意一个点 不要出现大写
				name: 'Search',
				component: () => import( /* webpackChunkName: "about" */ '../views/homeView/tabs/Search.vue'),
			},
			{
				path: '/searchrecommend', //注意一个点 不要出现大写
				name: 'SearchRecommend',
				component: () => import( /* webpackChunkName: "about" */
					'../views/homeView/tabs/SearchRecommend.vue'),
				//我们给他加一直 判断 是左滑动还是右滑动
				meta: {
					tree: 1
				}
			},
			{
				path: '/class', //注意一个点 不要出现大写
				name: 'Class',
				component: () => import( /* webpackChunkName: "about" */ '../views/homeView/tabs/Class.vue')
			},
			{
				path: '/my', //注意一个点 不要出现大写
				name: 'My',
				component: () => import( /* webpackChunkName: "about" */ '../views/My.vue')
			}
		]
	},
	{
		path: '/videoplay', //注意一个点 不要出现大写
		name: 'VideoPlay',
		component: () => import( /* webpackChunkName: "about" */ '../views/homeView/tabs/VideoPlay.vue'),
	},
	{
		path: '/writingcontent', //注意一个点 不要出现大写
		name: 'Writingcontent',
		component: () => import( /* webpackChunkName: "about" */ '../views/homeView/tabs/Writingcontent.vue'),
	}

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {

	router.transitionName = 'slide-none';
	if (from.meta.tree > to.meta.tree) {
		// 后退,想右滑动
		router.transitionName = 'slide_right';

	} else if (from.meta.tree < to.meta.tree) {
		// 前进,想左滑动
		router.transitionName = 'slide_left';

	} else {
		// 同一层级,无动画
		router.transitionName = 'slide-none';

	}


	next();
})


export default router
