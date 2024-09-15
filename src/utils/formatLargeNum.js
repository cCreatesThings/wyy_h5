export function formatLargeNumber(num) {
  const units = ['亿', '万', ''] // 定义亿、万和空的单位
  const unitValues = [100000000, 10000, 1] // 对应的数值

  let result = ''

  // 遍历每个单位，找到合适的单位进行转换
  for (let i = 0; i < units.length; i++) {
    if (num >= unitValues[i]) {
      result = (num / unitValues[i]).toFixed(2) + units[i]
      break
    }
  }

  return result
}
