<template>
	<div class="SearchBox">
		<!-- 搜索框开始 -->
		<van-sticky>
			<div class="searchbox">
				<div class="icon">
					<van-icon name="search" color="#a8a8a8" size="18" />
				</div>
				<input class="search" type="text" @click="goSearchRecommend" placeholder=' 新增 "专业搜索" ,筛作品超快 !'>
			</div>
		</van-sticky>
		<hr>
		<!-- 搜索框结束 -->

		<!-- 轮播图开始 -->
		<div class="banner">
			<van-swipe>
				<van-swipe-item v-for="(item,index) in bannerData" :key="index">
					<van-image lazy-load :src="item.cover" />

					<!-- 放置文字 -->

					<div class="text"> {{item.title}} </div>

				</van-swipe-item>
				<!-- 	<van-swipe-item>2</van-swipe-item>
				<van-swipe-item>3</van-swipe-item>
				<van-swipe-item>4</van-swipe-item> -->
				<template #indicator="{ active, total }">
					<div class="custom-indicator"><span>{{ active + 1 }}</span>/{{ total }}</div>
				</template>
			</van-swipe>
		</div>
		<!-- 轮播图结束 -->

		<!-- 中 -->
		<div class="MiddleBox">


			<div class="four-item" v-for="(items,index) in recommendData" :key="index">
				<van-image width="25" height="30" lazy-load :src="items.icon" />
				<div class="text">{{items.title}}</div>

			</div>

		</div>

		<!-- 中下 -->
		<div class="text">
			<div class="left">作品</div>
			<div class="right">全部作品</div>
		</div>

		<!-- 下 -->
		<div class="bottomBox">
			<div class="sixteen-item" v-for="(thing,index) in categoriesData" :key="index">
				<div class="bottom-box">
					<van-image width="45vw" height="35vw" lazy-load :src="thing.cover" />
					<div class="text">{{thing.category_name}}</div>
				</div>

			</div>
			<!-- 			<div class="sixteen-item">2</div>
			<div class="sixteen-item">3</div>
			<div class="sixteen-item">4</div>
			<div class="sixteen-item">5</div>
			<div class="sixteen-item">6</div> -->
		</div>

	</div>

</template>

<script>
	// 去请求数据
	// import router from '@/router/index.js';
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';
	
	import {useRouter} from 'vue-router'
	
	//请求搜索页面的数据
	import {
		getSe
	} from '../../../api/request.js'

	export default {
		setup() {

			let data = reactive({
				// keyData: [],
				bannerData: [],
				categoriesData: [],
				recommendData: []
			})

			let router = useRouter();
			
			let goSearchRecommend = () => {
				console.log("我他妈来啦！");
				router.push("/searchRecommend");
			}

			let getSearchData = () => {
				//这里判断是否存在本地存储 如果有 那么就不用再次请求
				let value = JSON.parse(localStorage.getItem('allDatas'))
				//判断value是否存在

				if (value) {
					console.log('终止');
					//把轮播图数据单独抽离出来
					data.bannerData = value.banners.splice(0);
					console.log('data.bannerData', data.bannerData);

					//抽离第二个数组
					data.categoriesData = value.categories.splice(0);
					console.log("data.categoriesData", data.categoriesData);

					//抽离第三个数组
					data.recommendData = value.recommended_position.splice(0);
					console.log("data.recommendData", data.recommendData);
					return
				}
				//请求
				getSe().then(res => {
					console.log('res', res)
					//本地存储
					localStorage.setItem('allDatas', JSON.stringify(res.data.data))
				}).catch((err) => {
					console.log('err', err);
				})
			}

			//生命周期里面请求
			onMounted(() => {
				getSearchData();
			})

			return {
				...toRefs(data),
				goSearchRecommend
			};
		},
	};
</script>

<style>
	.SearchBox {
		box-sizing: border-box;
		padding: 10px;
		/* background: #ffffff; */

		.text {
			margin-top: 56px;
			display: flex;
			justify-content: space-between;

			.left {
				font-size: 17px;
				font-weight: 600;
			}

			.right {
				color: #da4e41;
			}
		}

		.MiddleBox {
			box-sizing: border-box;
			margin-top: 30px;
			display: flex;
			justify-content: space-around;

			.four-item {
				/* background: white; */
				width: 50px;
				height: 50px;
				box-shadow: 0 0 20px -8px;
				position: relative;
				background: white;
				/* background:skyblue; */
				/* margin-left: 12px; */
				border-radius: 50%;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;


				.van-image__img {
					height: 30px;
					position: absolute;
					/* left: 13px; */
					top: 11px;
					/* border-radius: 10px; */
					/* left: 20px; */

				}

				.text {
					/* margin-left: 12px; */
					margin-top: 60px;

				}


			}
		}


		.searchbox {
			position: relative;
			margin-top: 10px;
			margin-left: 15px;
			margin-right: 15px;
			/* background: red; */
			background: #dfdfdf;
			border-radius: 5px;
			display: flex;
			justify-content: center;
			margin-bottom: 15px;

			.search {
				/* position: absolute; */
				margin-left: 30px;
				width: 87%;
				height: 30px;
				border: none;
				background: #dfdfdf;
				font-weight: 300;
			}

			.icon {
				position: absolute;
				top: 7px;
				left: 15px;
			}
		}

		.banner {
			margin-bottom: 10px;
			margin-top: 15px;

			/* 相对定位 */
			position: relative;

			.text {
				position: absolute;
				left: 11px;
				bottom: 16px;
				font-size: 16px;
				font-weight: 600;
			}


			.van-swipe-item {
				color: #fff;
				font-size: 20px;
				text-align: center;

				.van-image__img {
					border-radius: 10px;
				}
			}

			.custom-indicator {
				position: absolute;
				right: 5px;
				bottom: 5px;
				padding: 2px 5px;
				font-size: 12px;
				background: rgba(0, 0, 0, 0.1);
				color: white;
				font-size: 16px;
				font-weight: 600px;

				span {
					margin-right: 5px;
					font-size: 20px;
				}
			}
		}

		.bottomBox {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 25px;

			.sixteen-item {
				/* background: pink; */
				/* width: 50%; */
				height: 160px;
				margin-top: -10px;
				width: calc(50vw - 15px);
				/* border-radius: 10px; */

				.bottom-box {
					position: relative;

					.van-image__img {
						border-radius: 10px;
					}

					.text {
						position: absolute;
						top: -47px;
						left: 17px;
						/* margin-top: 15px; */
						/* margin-left: 15px; */
						color: white;
						font-size: 13px;
						/* font-weight: 600; */
					}
				}

			}
		}
	}
</style>
