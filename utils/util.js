const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 浮点数运算
 */
const floatOpration = {
	/**
	 * 加法运输，避免数据相加小数点后产生多位数和计算精度损失
	 * @param {Number} num1 - 键，必传
	 * @param {Number} num1 - 值，必传
	 */
	add(num1, num2) {
		let baseNum, baseNum1, baseNum2;
		let precision // 精度
		try {
			baseNum1 = num1.toString().split('.')[1].length
		} catch (e) {
			baseNum1 = 0
		}
		try {
			baseNum2 = num2.toString().split('.')[1].length
		} catch (e) {
			baseNum2 = 0
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
		precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
		return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision)
	},
	/**
	 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失
	 * @param {Number} num1 - 键，必传
	 * @param {Number} num1 - 值，必传
	 */
	sub(num1, num2) {
		let baseNum, baseNum1, baseNum2
		let precision // 精度
		try {
			baseNum1 = num1.toString().split('.')[1].length
		} catch (e) {
			baseNum1 = 0
		}
		try {
			baseNum2 = num2.toString().split('.')[1].length
		} catch (e) {
			baseNum2 = 0
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
		precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
		return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
	},
	/**
	 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失
	 * @param {Number} num1 - 键，必传
	 * @param {Number} num1 - 值，必传
	 */
	multi(num1, num2) {
		let baseNum = 0
		try {
			baseNum += num1.toString().split('.')[1].length
		} catch (e) {}
		try {
			baseNum += num2.toString().split('.')[1].length
		} catch (e) {}
		return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
	},
	/**
	 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失
	 * @param {Number} num1 - 键，必传
	 * @param {Number} num1 - 值，必传
	 */
	div(num1, num2) {
		let baseNum1 = 0
		let baseNum2 = 0
		let baseNum3, baseNum4
		try {
			baseNum1 = num1.toString().split('.')[1].length
		} catch (e) {
			baseNum1 = 0
		}
		try {
			baseNum2 = num2.toString().split('.')[1].length
		} catch (e) {
			baseNum2 = 0
		}

		baseNum3 = Number(num1.toString().replace('.', ''))
		baseNum4 = Number(num2.toString().replace('.', ''))
		return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
	}
}

module.exports = {
	formatTime,
	floatOpration
}
