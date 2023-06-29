<template>
	<div class="recommend">
		<!-- 轮播图开始 -->
		<div class="banner">
			<van-swipe>
				<van-swipe-item v-for="(item,index) in bannerData" :key="index">
					<van-image lazy-load :src="item.model.cover" />

					<!-- 放置文字 -->

					<div class="text"> {{item.model.title}} </div>

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

		<!-- 内容开始 -->
		<div class="content">

			<div class="fl" :class="{active:item.type!='uiMiddleCard'}" v-for="(item,index) in mainData" :key="index">

				<!-- 放置我们要的盒子 有大有小 然后通过判断进行显示那个盒子-->
				<div class="small-box" @click="toVideoPlay(item.children[0].model.resource.id)"
					v-if="item.type=='uiMiddleCard'">
					<div class="bg-box">
						<van-image width="100%" height="120" lazy-load :src="item.children[0].model.resource.cover" />

						<!-- 视频播放数量 点赞 视频播放时长 -->

						<div class="count_like">
							<div class="view-like">
								<div class="view">
									<van-icon name="eye-o" />
									<span>{{count(item.children[0].model.resource.count.count_view)}}</span>
								</div>
								<div class="view">
									<van-icon name="good-job-o" />
									<span>{{count(item.children[0].model.resource.count.count_like)}}</span>
								</div>
							</div>
							<div class="time"><span>{{time(item.children[0].model.resource.duration)}}</span></div>
						</div>

					</div>
					<div class="title">
						<span>{{item.children[0].model.resource.title}}</span>
					</div>
					<div class="author">
						<span>{{item.children[0].model.resource.author.userinfo.username}}</span>
						<span class="icon">
							<van-icon name="ellipsis" />
						</span>
					</div>

				</div>

				<div class="big-box" v-else-if="item.type=='uiBigCardTop'">
					<!-- 上 -->
					<div class="video-bg">
						<!-- 放置我们的图片 -->
						<van-image width="100%" height="220" lazy-load :src="item.children[0].model.resource.cover" />
						<!-- 评论的位置 -->
						<div class="comment-pos">
							<span>{{count(item.children[0].model.resource.count.count_comment)}}&nbsp;评论&nbsp;|</span>
							<span>&nbsp;{{count(item.children[0].model.resource.count.count_view)}}&nbsp;观看&nbsp;</span>
							<span>|&nbsp;{{time(item.children[0].model.resource.duration)}}</span>
						</div>

						<!--大家都在看的  -->
						<div class="all-look">
							<van-icon name="eye-o" />
							<span>大家都在看</span>
						</div>

					</div>

					<!-- 中 -->
					<div class="title-goods">
						<div class="titles"><span>{{item.children[0].model.resource.title}}</span></div>
						<div class="goods">
							<van-icon name="good-job-o" size="22" color="#686868" />
							<span>{{item.children[0].model.resource.count.count_like}}</span>
						</div>
						<span class="icon">
							<van-icon name="ellipsis" color="#686868" size="18" />
						</span>

					</div>

					<!-- 下 -->
					<div class="author-type">
						<div class="avatar">
							<van-image lazy-load :src="item.children[0].model.resource.author.userinfo.avatar" />
						</div>
						<div class="right">
							<span class="edited">{{item.children[0].model.resource.author.userinfo.username}}</span>
							<span class="guanZhu">关注</span>
						</div>
					</div>

				</div>


				<div class="big-box" v-else-if="item.type=='uiBigCard'">
					<!-- 头像 标题 -->
					<div class="uiBigCard-title-box">
						<div class="touxiang">
							<div class="avatar">
								<van-image lazy-load :src="item.children[0].model.resource.creator.avatar" />
							</div>
						</div>

						<div class="biaoti">{{item.children[0].model.resource.creator.username}}</div>
						<span class="icon">
							<van-icon name="ellipsis" color="#686868" size="18" />
						</span>
					</div>

					<!-- 内容 -->
					<div class="uiBigCard-title-content">
						<div class="titles">
							<span>{{item.children[0].model.resource.title}}</span>
						</div>
					</div>

					<!-- 图片 -->
					<div class="uiBigCard-img">
						<van-image lazy-load :src="item.children[0].model.resource.cover" />
					</div>

					<!-- 立即查看 -->
					<div class="go-look">
						立即查看
					</div>

				</div>

				<div class="big-box" :class="{lightColor:item.type=='uiCollectionSlideOne'}"
					v-else-if="item.type=='uiCollectionSlideOne'">
					<div class="c-create-person">
						<div class="person">推荐创作人</div>
						<div class="look-more">查看更多
							<van-icon name="arrow" color="#686868" />
						</div>
					</div>

					<div class="ten-box">
						<div class="scroll-box">
							<div class="ten-item" v-for="(skey,index) in item.children" :key="index">
								<van-image width="60" height="60" round lazy-load :src="skey.model.resource.avatar" />
								<div class="author-name">{{skey.model.resource.username}}</div>
								<div class="article-follower">
									<span>{{skey.model.resource.count.count_article}}作品</span>
									<span>·</span>
									<span>{{skey.model.resource.count.count_follower}}粉丝</span>
								</div>

								<div class="type">{{skey.model.resource.occupation}}</div>

								<div class="btn">
									<van-icon name="plus" color="white" size="18" />
									<span>关注</span>
								</div>
							</div>
							<!-- 							<div class="ten-item">2</div>
							<div class="ten-item">3</div>
							<div class="ten-item">4</div>
							<div class="ten-item">5</div> -->
						</div>
					</div>
				</div>

			</div>
			<!-- 		<div class="f1">2</div>
		<div class="f1">3</div>
		<div class="f1">4</div>
		<div class="f1">5</div> -->


		</div>


		<!-- 内容结束 -->
	</div>
</template>

<script>
	// 去请求数据
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue';

	//请求推荐页面的数据
	import {
		getRe
	} from '../../../api/request.js'

	import {
		hanlderCount,
		hanlderTime
	} from "@/common/handle"

	import {
		useRouter
	} from 'vue-router'

	export default {
		setup() {

			let Router = useRouter();

			let data = reactive({
				//轮播图的数据
				bannerData: [],
				//剩下盒子的数据
				mainData: []
			})

			//定义一个方法 获取我们推荐的数据
			let getRecommendData = () => {
				//这里判断是否存在本地存储 如果有 那么就不用再次请求
				let value = JSON.parse(localStorage.getItem('allData'))
				//判断value是否存在

				if (value) {
					console.log('终止');
					//把轮播图数据单独抽离出来
					data.bannerData = value[0].children;

					//除了轮播图数据之外我们再获取一次
					data.mainData = value.splice(1);

					console.log('data.mainData', data.mainData);
					return
				}
				//请求
				getRe().then(res => {
					console.log('res', res)
					//本地存储
					localStorage.setItem('allData', JSON.stringify(res.data.data.children))
					//把轮播图数据单独抽离出来
					data.bannerData = res.data.data.children[0].children;

					//除了轮播图数据之外我们再获取一次
					data.mainData = res.data.data.children.splice(1);


				}).catch((err) => {
					console.log('err', err);
				})
			}

			let count = (value) => {
				return hanlderCount(value);
			}

			let time = (value) => {
				return hanlderTime(value)
			}
			//生命周期里面请求
			onMounted(() => {
				getRecommendData();
			})

			let toVideoPlay = (id) => {
				Router.push({
					path: '/videoplay',
					query: {
						id
					}
				})
			}

			return {
				...toRefs(data),
				count,
				time,
				toVideoPlay
			};
		},
	};
</script>

<style lang="scss">
	.recommend {
		//怪异盒子模型
		box-sizing: border-box;
		padding: 10px;
		background: #f7f7f7;


		.banner {


			//相对定位
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
				//line-height: 150px;
				text-align: center;
				//background-color: #39a9ed;

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

		.content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;


			.fl {}

			.active {
				width: 100%;
				box-sizing: border-box;
			}

			.small-box {
				margin-top: 10px;
				width: calc(50vw - 15px);
				height: 220px;
				background: white;
				border-radius: 10px;
				overflow: hidden;
			}

			.count_like {
				position: absolute;
				width: 100%;
				bottom: 5px;
				// height: 20px;
				box-sizing: border-box;
				padding: 0 5px;
				display: flex;
				justify-content: space-between;
				color: white;
				font-size: 14px;
				// background: rgba(0, 0, 0, 0.7);
			}

			.view {
				margin-right: 8px;
				display: flex;
				align-items: center;
			}

			.bg-box {
				position: relative;
			}

			.view-like {
				display: flex;
			}

			.title {
				font-weight: 600;
				font-size: 15px;
				padding: 8px;
				//超出两行省略号
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				line-clamp: 2;
				-webkit-line-clamp: 2; //显示几行
				height: 30px;
			}

			.author {
				padding: 8px;
				font-size: 16px;
				display: flex;
				justify-content: space-between;
				color: #a1a1a1;

				.icon {
					transform: rotateZ(90deg);
				}
			}

			.lightColor {
				background: none !important;
			}


			.big-box {
				margin-top: 15px;
				width: 100%;
				// height: 330px;
				// height: 400px;
				// background: skyblue;
				background: white;
				padding-bottom: 20px;
				border-radius: 10px;

				.go-look {
					// background: red;
					// height: 30px;
					margin-left: 10px;
					font-size: 14px;
					margin-top: 10px;
				}

				.c-create-person {
					display: flex;
					justify-content: space-between;
					padding: 10px;
					align-items: center;
				}

				.person {
					font-weight: 600;
					font-size: 18px;
				}

				.ten-box {
					width: calc(100vw - 10px);
					height: 300px;
					// background: pink;
					box-sizing: border-box;
					overflow: scroll;

					.ten-item {
						margin: 20px;
						width: 200px;
						height: 250px;
						background: white;
						border-radius: 10px;
						text-align: center;
						padding: 20px;
						box-sizing: border-box;
					}

					.type {
						color: #afafaf;
						margin: 5px 0;
					}

					.article-follower {
						width: 100px;
						padding: 5px;
						margin: 0 auto;
						display: flex;
						justify-content: space-around;
					}

					.btn {
						background: #e75b3c;
						width: 92px;
						margin: 10px auto;
						height: 40px;
						color: white;
						display: flex;
						justify-content: space-around;
						font-size: 16px;
						align-items: center;
						border-radius: 20px;
						padding: 0px 15px;
						box-sizing: border-box;
					}
				}

				.scroll-box {
					width: 2400px;
					// background: skyblue;
					height: 300px;
					display: flex;
				}


				.author-name {
					margin: 5px 0;
					font-size: 16px;
					font-weight: 600;
				}

				.article-follower {
					color: #afafaf;
					margin: 5px 0;
				}

				.uiBigCard-img {
					// height: 200px;
					// background: red;
				}

				.uiBigCard-title-content {
					position: relative;
					height: 30px;
					// background: blue;

					.titles {
						// position: absolute;
						margin-left: 17px;
						font-weight: 600;
						font-size: 17px;
						left: 20px;
					}
				}

				.uiBigCard-title-box {
					position: relative;
					display: flex;
					// background: white;
					border-radius: 10px 10px 0 0;


					.avatar {
						width: 50px;
						height: 50px;
						margin: 15px;

						.van-image__img {
							border-radius: 50%;
						}
					}

					.biaoti {
						position: absolute;
						top: 30px;
						left: 72px;
						font-size: 14px;
						font-weight: 500;
					}

					.icon {
						transform: rotateZ(90deg);
						position: absolute;
						right: 10px;
						top: 30px;
					}
				}

				.video-bg {
					position: relative;
					height: 220px;

					.comment-pos {
						position: absolute;
						right: 16px;
						bottom: 10px;
						color: #fdfdfe;
						font-size: 13px;
					}

					.all-look {
						position: absolute;
						left: 15px;
						top: 15px;
						width: 110px;
						height: 24px;
						background: #ff503f;
						border-radius: 20px;
						// align-items: center;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0px 10px;
						box-sizing: border-box;
						font-weight: 600;
						font-size: 14px;
						color: white;
					}
				}

				.title-goods {
					height: 50px;
					display: flex;
					align-items: center;
					justify-content: space-around;
					border-bottom: 1px solid #a795957d;
					margin: 0 7px;

					.icon {
						transform: rotateZ(90deg);
					}

					.titles {
						font-size: 16px;
						font-weight: 600;
						letter-spacing: 1px;

						// 超出部分用省略号代替
						width: 255px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis
					}


					.goods {
						position: relative;

						span {
							position: absolute;
							top: -3px;
							right: -14px;
						}
					}
				}

				.author-type {
					// position: relative;
					display: flex;
					align-items: center;
					padding-left: 10px;
					margin-top: 20px;
					height: 30px;

					.avatar {
						width: 50px;
						height: 50px;
						margin: 5px;

						.van-image__img {
							border-radius: 50%;
							height: 43px;
						}
					}

					.right {
						margin: -8px;


						.edited {
							// position: absolute;
							left: 60px;
							font-size: 14px;
							margin-left: 10px;
						}

						.guanZhu {
							color: #cb051c;
							// left: 145px;
							// position: absolute;
							font-size: 14px;
							font-weight: 600;
							margin: 20px;
						}
					}
				}
			}
		}
	}
</style>
