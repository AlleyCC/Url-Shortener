

function random(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return randomIndex
}

function generateShortenUrl() {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = lowerCase.toUpperCase()
  const numbers = '0123456789'
  let array = lowerCase + upperCase + numbers
  let answer = ''
  for (let i = 0; i < 5; i ++){
    answer += array[random(array)]
    
  }
  return answer
  
}
module.exports = generateShortenUrl
