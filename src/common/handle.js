// 处理播放次数的
export const hanlderCount = (count) => {
	if (count >= 10000) {
		return (count / 10000).toFixed(1) + 'w'
	} else if (count >= 1000) {
		return (count / 1000).toFixed() + 'k'
	} else {
		return count;
	}
}

// 转化时间
export const hanlderTime = (time) => {
	let minute = parseInt(time / 60)

	minute = minute < 10 ? '0' + minute : minute

	let seconde = parseInt(time % 60)

	return minute + "'" + seconde + '"'
}
