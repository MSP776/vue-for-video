<template>
	<!-- <div>{{content}}</div> -->

	<div class="handWriting-Box">
		<!-- 上 -->
		<div class="top-box">
			<div class="temple">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div>
			<div class="middle-top">手记</div>
			<div class="right-box">
				<van-icon name="records" size="18" />
				<div class="text">写一条</div>
			</div>
		</div>
		<!-- 上 结束 -->


		<div class="content-box" v-for="(item,index) in handData" :key="index">
			<div class="top">
				<div class="cover">
					<!-- <van-image lazy-load :src="item.list.images" /> -->
					<van-image lazy-load :src="item.user.avatar" />
				</div>
				<div class="middle-box">
					<div class="name-time">
						<div class="text">{{item.user.username}}</div>
						<div class="time">22小时前 发布</div>
					</div>

					<div class="icon-watch">
						<van-icon name="plus" size="10" />
						<div class="watch">关注</div>
					</div>
				</div>

				<span class="icon">
					<van-icon name="ellipsis" color="#999a9f" size="18" />
				</span>

			</div>

			<div class="content" @click="toWritingcontent(item.id)">
				<div class="title">{{item.title}}</div>
				<!-- <div class="conTent">{{item.content}}</div> -->
				<p class="conTent"  v-if="item.content.length > 100 "><span class="conText" >全部</span>{{item.content}}</p>
				<p class="conTent-small" v-else="item.content.length < 100" >{{item.content}}</p>
				<!-- 	<span id="all">
					全部
				</span> -->
				<!-- <p id="openBtn">展开全部</p> -->
			</div>

			<div class="Images">

				<div class="image" v-for="(items,indexs) in item.images" :key="indexs" v-show="indexs<3">

					<van-image lazy-load :src="items" />
					<!-- <div class="image-number" v-if="indexs > 1">+{{Array(items).length}}</div> -->


				</div>




			</div>


			<div class="bottom">
				<div class="good">
					<van-icon name="good-job-o" color="#999a9f" size="18" />
					<div class="text">{{item.count.count_liked}}</div>
				</div>

				<div class="comment">
					<van-icon name="comment-circle-o" color="#999a9f" size="18" />
					<div class="text">{{item.count.count_commented}}</div>
				</div>

				<div class="share">
					<van-icon name="share-o" color="#999a9f" size="18" />
					<div class="text">分享</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';

	// 请求手记页面的数据
	import {
		getHand
	} from '../../../api/request.js'

	import {useRouter} from 'vue-router'

	export default {
		setup() {
			
			let Router = useRouter();

			let data = reactive({
				handData: [],
				// imageData: []
			})

			let getHandData = () => {
				//这里判断是否存在本地存储 如果有 那么就不用再次请求
				let value = JSON.parse(localStorage.getItem('handDatas'))
				//判断value是否存在

				if (value) {
					console.log('终止');
					//把手记数据单独抽离出来
					data.handData = value.list.splice(0);
					console.log('data.handData', data.handData);

					// data.imageData = value.list.images.splice(0);
					// console.log("data.imageData",data.imageData);
					return
				}
				//请求
				getHand().then(res => {
					console.log('res', res)
					//本地存储
					localStorage.setItem('handDatas', JSON.stringify(res.data.data))
				}).catch((err) => {
					console.log('err', err);
				})
			}
			//生命周期里面请求
			onMounted(() => {
				getHandData();
			})

			let toWritingcontent =(id)=>{
				Router.push({path:'/writingcontent',query:{id}})
			}
			
			return {
				...toRefs(data),
				toWritingcontent
			};
		}
	};
</script>

<style>
	.handWriting-Box {
		/* 怪异盒子模型 */
		box-sizing: border-box;
		/* padding: 10px; */
		padding: 10px 0;
		background: #f7f7f7;

		.top-box {
			height: 50px;
			display: flex;
			justify-content: space-between;
			background: white;
			align-items: center;
			margin-top: -10px;


			.middle-top {
				font-size: 20px;
				margin-left: 30px;
				font-weight: 600;
				/* align-items: center; */
			}

			.right-box {
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgb(253, 238, 235);
				width: 70px;
				height: 24px;
				border-radius: 10px;
				margin-right: 20px;
				color: #ea533e;
				font-weight: 600;

				/* .icon {} */

				.text {}

			}
		}

		.content-box {
			height: auto;
			margin-top: 10px;
			padding: 0 10px;
			background: white;

			.top {
				position: relative;
				height: 50px;
				/* background: pink; */
				display: flex;
				align-items: center;
				margin-top: 10px;

				.cover {

					.van-image__img {
						border-radius: 50%;
						width: 35px;
						height: 35px;


					}
				}





				.middle-box {
					width: 100%;
					margin-left: 9px;
					display: flex;
					justify-content: space-between;

					.name-time {
						.text {
							font-size: 15px;
							font-weight: 600;
						}

						.time {
							margin-top: 2px;
							color: #a4a7ae;
						}
					}

					.icon-watch {
						/* background: pink; */
						display: flex;
						align-items: center;
						justify-content: space-around;
						margin-right: 30px;
						width: 45px;
						color: #e8514a;


						.watch {
							font-size: 15px;
							font-weight: 600;
							margin-left: 3px;
						}

						.van-icon-plus {
							/* margin-right: 0px; */
							font-weight: 600;
							/* font-size: 0px; */
						}
					}

				}

				.van-icon-ellipsis {
					position: absolute;
					right: 0px;
					top: 17.5px;

					/* color: pink; */
					transform: rotateZ(90deg);
				}
			}

			.content {

				.title {
					font-weight: 600;
					font-size: 16px;
				}
				
				.conTent-small{
					font-size: 14px;
					margin-bottom: 15px;
					
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					/*省略几行写几*/
					-webkit-box-orient: vertical;
				}

				.conTent {
					font-size: 14px;
					margin-bottom: 15px;

					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					/*省略几行写几*/
					-webkit-box-orient: vertical;


				}

				.conTent::before {
					content: '';
					height: 37px;
					width: 0px;
					float: right;
				}

				.conText {
					float: right;
					/* font-weight: 600; */
					clear: both;
					color: #a8abb0;
				}

			}

			.Images {
				display: flex;
				/* display: flex; */
				position: relative;
				border-bottom: 1px solid #eeeeee;

				.image {

					/* width: 50px; */
					/* width: calc(34.5vw - 15px); */

				}


				.van-image__img {
					width: 118px;

					height: 123px;
					/* width: 30px; */
					border-radius: 10px;
					border: 1.5px solid #eeeeee;
				}
			}


			.bottom {
				display: flex;
				justify-content: space-around;
				/* flex-direction: ; */
				/* align-items: center; */
				padding: 10px;



				.good {
					display: flex;

					.text {
						margin-top: 4px;
						margin-left: 2px;
					}
				}

				.comment {
					display: flex;
					margin-left: 10px;

					.text {
						margin-top: 3.5px;
						margin-left: 3px;
					}
				}

				.share {


					display: flex;

					/* margin-right: -10px; */
					.text {
						margin-top: 2px;
						margin-left: 3px;
					}
				}

			}
		}
	}
</style>
