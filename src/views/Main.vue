<template>
	<div class="main">
		<!-- 放置tabbar的页面 -->

		<!-- 二级路由要显示 需要在这个页面放置一个 router-view -->

		<router-view></router-view>

		<!-- 自带一个属性给我们 去跳转路由 to你想要去的页面 -->
		<!-- 开启路由模式 -->

		<van-tabbar v-model="active" route>
			<!-- 自定义的 -->
			<van-tabbar-item v-for="(item,index) in routesData" :key="index" :to="item.path">
				<!-- 文字 -->
				<span>{{item.text}}</span>
				<template #icon="props">
					<img :src="props.active ? item.active : item.inactive" />
				</template>
			</van-tabbar-item>
			<!-- 	  这两个是默认的
		  <van-tabbar-item icon="search" to="/home">首页</van-tabbar-item>
		  <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item> -->
		</van-tabbar>


	</div>
</template>

<script>
	import {
		reactive,
		ref,
		toRefs
	} from 'vue';

	export default {
		setup() {
			const active = ref(0);
			const icon = {
				active: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
				inactive: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png',
			};

			//自定义一个数据 存放我们的路由数据 一个对象表示我们的路由
			let data = reactive({
				routesData: [{
						path: "/home", //路径
						text: '首页', //文字
						active: require("@/assets/icons/home_active.png"), //表示选中的图片  d\图片引入的时候加上一个@
						inactive: require("@/assets/icons/home.png") //表示未选中的图片
					},
					{
						path: "/handwriting", //路径
						text: '手记', //文字
						active: require("@/assets/icons/book_active.png"), //表示选中的图片  d\图片引入的时候加上一个@
						inactive: require("@/assets/icons/book.png") //表示未选中的图片
					},
					{
						path: "/search", //路径
						text: '搜索', //文字
						active: require("@/assets/icons/search_active.png"), //表示选中的图片  d\图片引入的时候加上一个@
						inactive: require("@/assets/icons/search.png") //表示未选中的图片
					},
					{
						path: "/class", //路径
						text: '课堂', //文字
						active: require("@/assets/icons/class_active.png"), //表示选中的图片  d\图片引入的时候加上一个@
						inactive: require("@/assets/icons/class.png") //表示未选中的图片
					},
					{
						path: "/my", //路径
						text: '我的', //文字
						active: require("@/assets/icons/my_active.png"), //表示选中的图片  d\图片引入的时候加上一个@
						inactive: require("@/assets/icons/my.png") //表示未选中的图片
					}
				]
			})


			return {
				...toRefs(data),
				icon,
				active,
			};
		},
	};
</script>

<style>
</style>
