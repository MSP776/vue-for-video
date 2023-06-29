<template>
	<!-- 触摸 手指点击屏幕触发touchstart 手指按住屏幕拖动触发touchmove 手指松开触发touchend -->
	<div class="home" @touchstart="sreenStart" @touchmove="sreenMove" @touchend="sreenEnd">
		<!-- 首页 -->
		<!-- 上面搞一个tab页面 -->
		<van-tabs v-model:active="active">
			<van-tab v-for="(item,index) in threeRoutes" :key="index" :title="item.text" :to="item.path">
				<!-- <template #title>{{item.text}}</template> -->

			</van-tab>

		</van-tabs>
		<div class="remain">
			<router-view v-slot="{ Component }">
				<transition :name="$router.transitionName">
					<keep-alive>
						<component :is="Component" :key="$route.name" />
					</keep-alive>
				</transition>
			</router-view>
		</div>


	</div>

</template>

<script>
	import {
		ref,
		reactive,
		toRefs
	} from 'vue';
	
	import {
		useRouter
	} from 'vue-router';
	
	import {
		getTab
	} from "../../api/request.js"

	export default {
		setup() {

			let Router = useRouter();

			let getData = () => {
				getTab().then((res) => { // res后面请求回来的一个结果
						//获取文章视频
						console.log('res', res)
					})
					.catch((err) => {}) //请失败后的处理结果
			}
			//直接先尝试调用
			// getData();
			let data = reactive({
				threeRoutes: [{
						path: "/recommend",
						text: "推荐"
					},
					{
						path: "/selection",
						text: "每日精选"
					},
					{
						path: "/hot",
						text: "热门"
					},
				],
				
				start:0,
				end:0,
				ispass:false
			})


			const active = ref(0);

			let sreenStart = (e) => {
				// console.log('开始', e);
				data.start = e.touches[0].pageX;
			}

			let sreenMove = (e) => {
				// console.log('移动中', e);
				data.end = e.touches[0].pageX;
				
				data.ispass = true;
			}

			let sreenEnd = () => {
				console.log('结束', data.start, data.end);
				
				if(!data.ispass){
					
					return
				}

				//判断它是左滑动还是右滑动
				if (data.start > data.end && data.start-data.end>150) {
					console.log("右边滑动，但是路由是右边的");

					if (active.value == data.threeRoutes.length - 1) {
						return
					}

					//索引得++
					active.value = active.value + 1
					//跳转页面
					Router.push(data.threeRoutes[active.value].path)
					//让他跳转
					
				} else if (data.start < data.end && data.end-data.start>150) {
					console.log("左边滑动，但是路由是左边的");
					//索引得--
					if (active.value == 0) {
						return
					}
					active.value = active.value - 1
					
					Router.push(data.threeRoutes[active.value].path)
				}
			}


			return {
				active,
				...toRefs(data),
				sreenStart,
				sreenMove,
				sreenEnd
			};
		},

	};
</script>

<style>
	.remain {
		position: absolute;
		left: 0;
		right: 0;
		top: 46px;
		bottom: 50px;
		overflow: scroll;
	}


	.slide_left-enter-active,
	.slide_left-leave-active,
	.slide_right-enter-active,
	.slide_right-leave-active {
		transition: all 0.5s;
		position: absolute !important;
		background-color: white;
		width: 100%;
		height: 100%;
		/* z-index: 1; */
	}

	.slide_left-enter-from,
	.slide_right-leave-to {
		opacity: 1;

		transform: translateX(100%);
	}

	.slide_right-enter-from,
	.slide_left-leave-to {
		opacity: 1;

		transform: translateX(-100%);
	}

	.slide_left-leave-to,
	.slide_right-leave-to {
		opacity: 0.3;
	}
</style>
