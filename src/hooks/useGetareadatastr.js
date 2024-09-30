import { useCascaderAreaData } from '@vant/area-data'

import { ref } from 'vue'

const cachedRegionOptions = ref(null)

function getCachedRegionOptions() {
  if (cachedRegionOptions.value) {
    return cachedRegionOptions.value
  }

  cachedRegionOptions.value = useCascaderAreaData()
  return cachedRegionOptions.value
}

getCachedRegionOptions()

export function useGetareadatastr(p, c) {
  const province = cachedRegionOptions.value.find((item) => item.value == p)

  if (!province) {
    return [null, null]
  }

  const city = province.children.find((item) => item.value == c)

  if (!city) {
    return [province.text, null]
  }

  console.log(province, city)
  return [province.text, city.text]
}
