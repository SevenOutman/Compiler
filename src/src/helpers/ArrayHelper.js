/**
 * Created by Doma on 2016/10/27.
 */

export const has = (arr, ele) => arr.indexOf(ele) != -1

export const hasThose = (arr, filterFunc) => arr.filter(filterFunc).length > 0
export const remove = (arr, ele) => {
  let index = arr.indexOf(ele)
  if (index != -1) {
    arr.splice(index, 1)
  }
}

export const front = (arr) => arr[0]

export const rear = arr => {
  if (arr.length) {
    return arr[arr.length - 1]
  }
}
