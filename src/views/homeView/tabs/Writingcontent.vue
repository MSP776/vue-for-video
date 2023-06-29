<template class="body">
	<div class="Detail-box">
		<div class="image-box">
			<div class="image" v-for="(item,index) in Handimage" :key="index">
				<van-image lazy-load :src="item" />
			</div>
		</div>

		<div class="content-box">
			<div class="title-box">{{Handtitle}}</div>
			<div class="detail-box">{{Handcontent}}</div>
		</div>

		<div class="day">2022年2月23日 10:44:51</div>
		<hr>

		<div class="searchbox">
			<div class="icon">
				<van-icon name="user-circle-o" color="black" size="20" />
			</div>
			<input class="search" type="text" placeholder='说说你的看法吧~' color="#cacbcf">
		</div>

		<div class="commentbox" v-for="(items,index) in Handcomment" :key="index">

			<div class="image">
				<div class="image">
					<van-image lazy-load :src="items.userDetail.avatar_big" />
				</div>
			</div>

			<div class="name-comment-icon">
				<div class="name-comment">
					<div class="name">{{items.userDetail.nickname}}</div>
					<div class="comment">{{items.contentText}}</div>
				</div>

				<div class="icon-text">
					<van-icon name="good-job-o" color="#afafaf" size="20" />
					<div class="text">0</div>
				</div>

			</div>


		</div>

		<div class="mmm">
			<van-sticky :offset-bottom="-13" position="bottom">
				<div class="bottom-box">
					<div class="bottom-searchbox">
						<div class="icon">
							<van-icon name="edit" color="black" size="20" />
						</div>
						<input class="search" type="text" placeholder='说说你的看法吧~' color="#cacbcf">
					</div>

					<div class="right-box">
						<div class="goodjob">
							<van-icon name="good-job-o" color="#545454" size="25" />
							<!-- <div class="text">0</div> -->
							<van-icon name="ellipsis" color="#545454" size="20"
								style="position: absolute; top: 10px; left: 27px;" />
						</div>

						<div class="comMent">
							<van-icon name="chat-o" color="#545454" size="25" />
							<div class="text">{{HandSumcomment}}</div>
						</div>
					</div>
				</div>
			</van-sticky>
		</div>

	</div>
</template>

<script>
	import {
		useRoute
	} from 'vue-router'

	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';

	//请求推荐页面的数据
	import {
		getHandDetail,
		getHandComment
	} from '@/api/request.js'

	export default {
		setup() {
			// useRoute 用来接收路径的参数  useRouter用来跳转
			let Route = useRoute();

			console.log('Route', Route.query);

			//去请求数据

			let data = reactive({
				//内容详情
				Handtitle: [],
				Handcontent: [],
				Handimage: [],
				Handcomment: [],
				HandSumcomment: []
			})

			let getData = () => {

				getHandDetail(Route.query.id).then(res => {
					// console.log('res',res)
					data.Handtitle = res.data.data.title;
					data.Handcontent = res.data.data.content;
					data.Handimage = res.data.data.images;
					// localStorage.setItem('HandDetail', JSON.stringify(res.data.data))
				}).catch(err => {
					console.log('err', err);
				})


				getHandComment(Route.query.id).then(res => {
					console.log('res', res);
					data.Handcomment = res.data.data;
					data.HandSumcomment = res.data.total;
				}).catch(err => {
					console.log('err', err);
				})

			}



			// 生命周期请求数据
			onMounted(() => {
				getData()
			})

			return {
				// template才可以用我们data里面的数据
				...toRefs(data)
			}

		}
	}
</script>

<style>
	.Detail-box {
		position: relative;
		box-sizing: border-box;
		padding: 10px;
		/* height: 100%; */
		/* background: #f7f7f7; */

		.image-box {
			padding-top: 10px;
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 2px;


			.image {
				/* width: calc(50vw - 2px); */
				/* width: px; */


				.van-image__img {
					border-radius: 10px;
					height: 110px;
					width: 110px;
				}
			}
		}

		.content-box {

			.title-box {
				font-size: 18px;
				font-weight: 600;
				margin-top: 4px;
				margin-bottom: 4px;
			}

			.detail-box {
				font-size: 15px;
			}
		}

		.day {
			color: #adadad;
			margin-top: 5px;
		}

		.searchbox {
			position: relative;
			margin-top: 15px;
			/* margin-left: 5px; */
			/* margin-right: 20px; */
			/* background: red; */
			background: #f7f8fa;
			border-radius: 20px;
			display: flex;
			justify-content: center;
			margin-bottom: 15px;
			box-sizing: border-box;

			.search {
				/* position: absolute; */
				margin-left: 25px;
				width: 80%;
				height: 30px;
				border: none;
				background: #f7f8fa;
				/* color: #cacbcf; */
				font-weight: 300;
			}

			.icon {
				position: absolute;
				top: 6px;
				left: 15px;
			}
		}

		.commentbox {
			margin-top: 5px;
			display: flex;
			position: relative;
			height: 70px;
			width: auto;
			border-bottom: 1px solid #dddddd;



			.image {

				width: 35px;
				height: 35px;

				.van-image__img {
					border-radius: 50%;
				}
			}

			.name-comment-icon {
				display: flex;
				/* justify-content: space-between; */

				.name-comment {
					margin-left: 15px;
					margin-top: 2px;

					.name {
						font-size: 13px;
						color: #afafaf;
					}

					.comment {
						font-size: 13px;
						position: absolute;
						top: 22px;

					}
				}

				.icon-text {
					display: flex;
					align-items: center;
					position: absolute;
					right: 8px;
					top: 4px;


					.text {
						position: relative;
						right: -4px;
						color: #afafaf;
					}
				}
			}
		}



	}



	.bottom-box {
		display: flex;
		justify-content: space-between;
		position: relative;
		/* border-top: 1px solid #f1f1f3; */

		.right-box {
			display: flex;
			/* justify-content: space-around; */
			align-items: center;

			.goodjob {
				display: flex;
				position: absolute;
				/* left: 20px; */
				right: 110px;
			}

			.comMent {
				display: flex;
				flex-direction: row;
				align-items: center;
				position: absolute;
				right: 25px;

				.text {
					font-size: 24px;
					margin-left: 4px;
				}
			}
		}

		.bottom-searchbox {
			position: relative;
			margin-top: 15px;
			/* margin-left: 5px; */
			/* margin-right: 20px; */
			/* background: red; */
			background: #f7f8fa;
			border-radius: 20px;
			display: flex;
			justify-content: center;
			margin-bottom: 15px;
			box-sizing: border-box;
			width: 55%;

			.search {
				/* position: absolute; */
				/* margin-left: 5px; */
				width: 50%;
				height: 30px;
				border: none;
				background: #f7f8fa;
				/* color: #cacbcf; */
				font-weight: 300;
			}

			.icon {
				position: absolute;
				top: 6px;
				left: 15px;
			}
		}

	}
</style>
