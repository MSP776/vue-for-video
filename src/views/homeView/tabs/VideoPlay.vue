<template>
	<div class="videoPlay" ref="refsDom">
		<!-- 视频播放 -->
		<div class="play">
			<video :src="url" controls muted autoplay style=""></video>
		</div>

		<div class="content-des">
			<van-tabs color='#e94a3a' border>
				<van-tab title="简介">
					<div class="introduction">
						<!-- 标题 -->
						<div class="title">{{content.title}}</div>

						<!-- 发布时间 播放次数 -->
						<div class="addtime-view-count">
							<span v-for="(item,index) in content.categories">{{ item.category_name }}-
								{{ item.sub.category_name }}</span>
							<!-- <span>古风</span> -->
							<span>{{content.publish_time}}</span>
							<span>{{countNum.count_view}}次播放</span>
						</div>

						<!-- 描述 -->
						<div class="des">
							{{description}}
						</div>

						<!-- 点赞 分享 收藏 -->
						<div class="like-collect-share">
							<div class="like">
								<van-icon name="like-o" />
								<span>{{countNum.count_like}}</span>
							</div>
							<div class="collect">
								<van-icon name="star-o" />
								<span>{{countNum.count_collect}}</span>
							</div>
							<div class="share">
								<van-icon name="share-o" />
								<span>{{countNum.count_share}}</span>
							</div>

						</div>



					</div>
					<!-- 涉及的类型 -->
					<div class="tags">
						<span v-for="(item,index) in content.tags" :key="item.id">
							{{item.name}}
						</span>
						<!-- 	<span>哈哈</span>
						<span>哈哈</span> -->
					</div>

					<h2>创作人</h2>
					<div class="top">

						<div class="cover">
							<!-- <van-image lazy-load :src="item.list.images" /> -->
							<van-image lazy-load :src="Author.avatar" />
						</div>
						<div class="middle-box">
							<div class="name-time">
								<div class="text">{{Author.username}}</div>
								<div class="time">{{Occupation}}</div>
							</div>

							<div class="icon-watch">
								<div class="watch">关注</div>
							</div>
						</div>
					</div>



					<div class="same-video">
						<h2>相似视频</h2>
						<div class="item-box" v-for="(item,index) in list" :key="index" @click="reQuest(item.id)">
							<div class="videobox">
								<van-image lazy-load :src="list[index].cover" />
								<div class="time">{{time(list[index].duration)}}</div>
								<!-- <video :src="list.cover" controls muted autoplay></video> -->
							</div>
							<div class="right-box">
								<div class="text">
									<span
										style="font-size: 15px; font-weight: 600;">{{list[index].share_info.title}}</span>
									<div style="margin-top: 5px; font-size: 1px; color: #a5a5a5;"><span>播放量
											{{count(list[index].count.count_view)}} · 喜欢
											{{count(list[index].count.count_like)}}</span></div>
								</div>
								<div class="image-name">
									<van-image lazy-load :src="list[index].author.userinfo.avatar"
										style="width: 20px; height: 20px; border-radius: 50%;" />
									<span
										style="color: #7a7a7a; margin-left: 8px;">{{list[index].author.userinfo.username}}</span>
								</div>
							</div>
						</div>
					</div>

				</van-tab>


				<van-tab title="评论">
					<div class="total">{{total}}</div>
					<div class="comment-bigbox" v-for="(item,indexs) in comment" :key="indexs">
						<div class="commentbox">
							<van-image lazy-load :src="item.userInfo.avatar" />

							<div class="middle-bigbox">
								<div class="middle-box">
									<div class="name" style="color: #5f5f5f;">{{item.userInfo.username}}</div>
									<div class="comment" style="margin-top: 6px; font-size: 15px;">{{item.content}}
									</div>
								</div>
								<div class="icon-right">
									<van-icon name="ellipsis" color="#686868" />
								</div>
							</div>
						</div>
						<div class="time-address">
							<span class="text">08-12 · {{item.ip_location}}</span>
							<div class="icon">
								<van-icon class="icon-comment" name="comment-o" color="#686868" size="15" />
								<van-icon name="good-job-o" color="#686868" size="15" />
								<span>{{item.userInfo.count.count_liked}}</span>
							</div>
						</div>
					</div>

					<van-sticky :offset-bottom="5" position="bottom">
						<div class="bottombox">
							<input class="search" type="text" placeholder="我有话要说">
						</div>
					</van-sticky>


				</van-tab>
			</van-tabs>
		</div>

	</div>

</template>

<script>
	import {
		useRoute,
		useRouter
	} from 'vue-router'

	import {
		onMounted,
		reactive,
		toRefs,
		ref
	} from 'vue';

	import {
		hanlderCount,
		hanlderTime
	} from "@/common/handle"

	//请求推荐页面的数据
	import {
		getDetail,
		getSame,
		getComment
	} from '@/api/request.js'
	import router from '@/router';

	export default {
		setup() {
			// useRoute 用来接收路径的参数  useRouter用来跳转
			let Route = useRoute();
			let Router = useRouter();

			console.log('Route', Route.query);

			//去请求数据

			let data = reactive({
				//视频播放路径
				url: "",
				countNum: {},
				content: {},
				description: "",
				Author: {},
				Occupation: {},
				list: [],
				comment: [],
				total: []

			})

			let getData = () => {

				getDetail(Route.query.id).then(res => {
					console.log('res', res)
					data.url = res.data.data.video.content.progressive[0].url
					data.countNum = res.data.data.count;
					data.content = res.data.data;
					data.Author = res.data.data.author.userinfo;
					data.Occupation = res.data.data.author.role;
					data.description = res.data.data.share_info.description
				}).catch(err => {
					console.log('err', err);
				})

				getSame(Route.query.id).then(res => {
					console.log('res相似', res)
					data.list = res.data.data.list;
				}).catch(err => {
					console.log('err相似', err);
				})

				getComment(Route.query.id).then(res => {
					console.log('res评论', res)
					data.comment = res.data.data.list;
					data.total = res.data.data.total;
				}).catch(err => {
					console.log('err评论', err);
				})
			}

			let refsDom = ref(null)

			let reQuest = (id) => {
				refsDom.value.scrollTop = 0;

				Router.push({
					path: "/videoplay",
					query: {
						id
					}
				})

				getData();
			}

			let count = (value) => {
				return hanlderCount(value);
			}

			let time = (value) => {
				return hanlderTime(value)
			}


			// 生命周期请求数据
			onMounted(() => {
				getData()

			})

			return {
				// template才可以用我们data里面的数据
				...toRefs(data),
				reQuest,
				refsDom,
				count,
				time
			}

		}
	}
</script>

<style lang="scss">
	.videoPlay {
		padding: 10px;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: scroll;

		video {
			width: 100%;
			height: auto;
		}

		.introduction {
			padding: 12px;
			margin-top: 10px;


			.title {
				width: 324px;
				font-size: 18px;
				font-weight: 600;
				// background: pink;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

			}

			.addtime-view-count {
				color: #a0a0a0;
				margin: 15px 0;

				span {
					margin-right: 13px;
				}
			}

			.des {
				color: #5c5c5c;
				font-size: 14px;
			}

			.like-collect-share {
				display: flex;
				justify-content: space-around;
				font-size: 22px;
				margin: 15px 0;

				div {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				span {
					font-size: 16px;
					font-weight: 600;
				}
			}
		}

		.top {
			position: relative;
			height: 50px;
			/* background: pink; */
			display: flex;
			align-items: center;
			margin-top: 10px;
			// margin-left: 10px;
			// padding-bottom: 10px;
			width: 75%;
			height: 70px;
			box-shadow: 0 0 12px -8px;
			border-radius: 10px;
			background: white;
			// border-bottom: 1px solid red;

			.cover {
				margin-left: 4px;

				.van-image__img {
					border-radius: 50%;
					width: 45px;
					height: 45px;


				}
			}





			.middle-box {
				width: 100%;
				margin-left: 4px;
				display: flex;
				justify-content: space-between;

				.name-time {
					margin-left: 9px;

					.text {
						font-size: 15px;
						font-weight: 600;
					}

					.time {
						margin-top: 2px;
						color: #a4a7ae;
						display: -webkit-box;
						overflow: hidden;
						-webkit-box-orient: vertical;
						line-clamp: 2;
						-webkit-line-clamp: 1; //显示几行
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
					background: #fdeeeb;
					width: 78px;
					border-radius: 34px;


					.watch {
						font-size: 15px;
						font-weight: 600;
						margin-left: 3px;
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

		.tags {
			border-top: 1px solid #a79f9f85;
			border-bottom: 1px solid #a79f9f85;
			padding: 15px 0;
			// margin-top: 15px;


			span {
				display: inline-block;
				padding: 5px 15px;
				background: #f7f7f7;
				border-radius: 5px;
				margin: 5px 10px;
			}
		}

		.same-video {
			margin-top: 30px;

			.item-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 20px 0;
				border-bottom: 1px solid #f1f1f1;

				.videobox {
					position: relative;

					.time {
						color: white;
						position: absolute;
						right: 7px;
						top: 91px;
					}

					.van-image__img {
						// width: 47%;
						width: 170px;
						height: 110px;
						border-radius: 10px;
					}
				}

				.right-box {
					margin-left: 15px;
					// position: absolute;
					// left: 20px;

					.image-name {
						margin-top: 10px;
						display: flex;
						flex-direction: row;
						align-items: center;

						.van-image__img {
							border-radius: 50%;
						}

					}
				}
			}
		}

		.comment-bigbox {
			border-bottom: 1px solid #a79f9f85;
			padding: 15px 0;

			.commentbox {
				display: flex;

				.middle-bigbox {
					display: flex;
					justify-content: space-between;
					width: 100%;

					.middle-box {
						margin-left: 10px;
						margin-top: 3px;
					}

					.van-icon-ellipsis {
						rotate: 90deg;
					}
				}


				.van-image__img {
					height: 40px;
					width: 40px;
					border-radius: 50%;
				}
			}

			.time-address {
				margin-top: 12px;
				margin-left: 50px;
				display: flex;
				justify-content: space-between;

				.icon {
					margin-right: 10px;

					.icon-comment {
						margin-right: 20px;
					}
				}

				.text {
					color: #9c9c9c;
				}
			}
		}

		.bottombox {
			// position: absolute;
			// bottom: 0;
			width: 100%;
			// width: 150px;
			background: #f0f0f0;
			// bottom: -310px;
			// float: right;

			.search {
				height: 0.8rem;
				border: none;
				background: #f0f0f0;
				margin-left: 10px;

			}
		}

		.total {
			color: #e15146;
			font-weight: 600;
			top: 14.5px;
			right: 56px;
			position: absolute;
		}

	}
</style>
