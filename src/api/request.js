import http from './http.js'

// 导出一个值


export const sendCode = (params) => {
	// 热门搜索关键词
	return http({
		url: 'search/recommend_kws',
		method: 'get'
	})
}


export const getSe = (params) => {
	// 搜索页面所有分类
	return http({
		url: 'page/discovery',
		method: 'get'
	})
}


export const getTab = (params) => {
	// 轮播图
	return http({
		url: '/home/config',
		method: 'get'
	})
}


export const getRe = (params) => {
	// 推荐
	return http({
		url: '/home/recommend',
		method: 'get'
	})
}


export const getDetail = (params) => {
	// 请求视频详情推荐数据
	return http({
		url: `/article/${params}`,
		method: 'get'
	})
}

export const getSame = (params) => {
	// 请求视频详情推荐数据
	return http({
		url: `/article/${params}/next`,
		method: 'get'
	})
}

export const getComment = (query) => {
	// 请求视频评论数据
	return http({
		url: `/comments?resource_id=${query}`,
		method: 'get',
	})
}


export const getHand = (query) => {
	// 手记
	return http({
		url: 'notes',
		method: 'get'
	})
}


export const getHandDetail = (params) => {
	// 手记内容详情
	return http({
		url: `/note/${params}`,
		method: 'get'
	})
}

export const getHandComment = (params) => {
	// 手记评论
	return http({
		url: `/note/${params}/comment`,
		method: 'get'
	})
}
