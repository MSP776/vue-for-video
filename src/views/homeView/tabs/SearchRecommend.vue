<template>
	<div class="searchBox">
		<!-- 搜索框开始 -->
		<div class="searchbox">
			<div class="icon">
				<van-icon name="search" color="#a8a8a8" size="18" />
			</div>
			<input class="search" type="text" placeholder=' 新增 "专业搜索" ,筛作品超快 !'>
		</div>
		<!-- 搜索框结束 -->

		<!-- 关键词开始 -->
		<div class="keyBox">
			<div class="twentyone-item" v-for="(item,index) in keyData" :key="index">
				<a href="">{{index+1}}:{{item.name}}</a>
			</div>
		</div>

		<!-- 关键词结束 -->
	</div>
</template>

<script>
	// 去请求数据
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';

	//请求搜索推荐页面的数据
	import {
		sendCode,
	} from '../../../api/request.js'

	export default {
		setup() {

			let data = reactive({
				keyData: []
			})

			//写一个方法本地存储
			let getSearchData = () => {
				//这里判断是否存在本地存储 如果有 那么就不用再次请求
				let value = JSON.parse(localStorage.getItem('SearchRecommendData'))
				//判断value是否存在

				if (value) {
					console.log('终止');
					data.keyData = value.list.splice(0);
					console.log('data.keyData', data.keyData);
					return
				}
				//请求
				sendCode().then(res => {
					console.log('res', res)
					//本地存储
					localStorage.setItem('SearchRecommendData', JSON.stringify(res.data.data))
				}).catch((err) => {
					console.log('err', err);
				})
			}

			//生命周期里面请求
			onMounted(() => {
				getSearchData();
			})

			return {
				...toRefs(data)
			};
		},
	};
</script>

<style>
	.searchBox {
		box-sizing: border-box;
		padding: 10px;

		.keyBox {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.twentyone-item {
				font-size: 24px;
				font-weight: 600;
				display: flex;
				justify-content: center;
				align-items: center;
				/* color: skyblue; */
				margin-top: 10px;
				/* background: pink; */
				height: 40px;
				/* width: 100px; */
				width: calc(50vw - 15px);
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
	}
</style>
