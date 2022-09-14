const { resolve } = require('path')
const util = require('util')
const fs = require('fs')
// 读取参数
let arguments = process.argv

// 定义盒子类名
let path
if (!arguments[2]) {
	throw new Error('please enter right path of theme css,like "npm run exec ./...css [className]"')
} else {
	path = resolve(__dirname, arguments[2])
}
let className = arguments[3] || '.markdown-body'

let readFile = util.promisify(fs.readFile)
let data = readFile(path, { encoding: 'utf-8' })
let ws = fs.createWriteStream('output.css')
ws.on('open', function () {
	console.log('executing...')
})

data
	.then((data) => {
		let lines = data.split(/\r?\n/)

		lines.forEach((line) => {
			// 把开头都是以下字符的都不需要处理，直接写入
			if (
				line.charAt(0) === '@' ||
				line.charAt(0) === '\t' ||
				line.charAt(0) === ' ' ||
				line.charAt(0) === '}' ||
				line.charAt(0) === '/' ||
				line.charAt(0) === ''
			) {
				ws.write(line + '\n')
			} else {
				// 处理当前行的字符串
				let newLine = ''
				// :root 的情况，如果是则直接替换掉
				if (line.charAt(0) === ':') {
					newLine = className + line.slice(5)
					ws.write(newLine + '\n')
				} else if (line.charAt(0) === '#') {
					// 判断开头是否是 # ，
					for (let i = 0; i < line.length; i++) {
						newLine = newLine.concat(line.charAt(i))
						if (line.charAt(i) === ',' && line.charAt(i + 2) !== '#' && i + 1 !== line.length) newLine = newLine.concat(' ' + className)
					}
					ws.write(newLine + '\n')
				} else {
					newLine = newLine.concat(className + ' ')
					for (let i = 0; i < line.length; i++) {
						newLine = newLine.concat(line.charAt(i))
						// 如果中间遇到 ',' 需要后面是不是有 '#' 或者后面已经没字符了，这种就不需要添加类名字段
						if (line.charAt(i) === ',' && line.charAt(i + 2) !== '#' && i + 1 !== line.length) newLine = newLine.concat(' ' + className)
					}
					ws.write(newLine + '\n')
				}
			}
		})

		return new Promise((resolve) => resolve('finish!\n' + `there is output.css and the class name is ${className}`))
	})
	.then((result) => {
		console.log(result)
		ws.close()
	})
