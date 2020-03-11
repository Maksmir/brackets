module.exports = function check(str, bracketsConfig) {
  if ((typeof str) == "string") {
    str = str.split('')
  }


  let value = str
  let score = 0
  let start = 0
  let stop = 0
  let expr
  for (let i = 0; i < str.length; i++) {
    if (expr === undefined) {
      for (let j = 0; j < bracketsConfig.length; j++) {

        if (str[i] === bracketsConfig[j][0]) {
          expr = j
          break
        }
      }
    } else {
      break
    }
  }

  if (expr === undefined) {
    expr = 0
  }

  if (bracketsConfig[expr][0] === bracketsConfig[expr][1]) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === bracketsConfig[expr][0]) {

        if (score === 0) {
          start = i
          score++
        }else if (score > 0) {
          stop = i
          score--
          break
        }

      }
    }
  } else if (bracketsConfig[expr][0] !== bracketsConfig[expr][1]) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === bracketsConfig[expr][0]) {

        if (score === 0) {
          start = i
        }
        if (score > -1) {
          score++
        }

      } else if (str[i] === bracketsConfig[expr][1]) {
        score--
        if (score === 0) {
          stop = i
          break
        }
      }
    }
  }

  if (score !== 0) {
    return false
  }
  if (start === 0 && stop === 0) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === false) {
        return false
      }
    }
    return true
  } else {

    value.splice(start, stop - start + 1, check(str.slice(start + 1, stop), bracketsConfig))
    return check(value, bracketsConfig)
  }

}