
function random(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return randomIndex
}

function generateShortenUrl() {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = lowerCase.toUpperCase()
  const numbers = '0123456789'
  let urlCode = ''
  let array = lowerCase + upperCase + numbers
  
  for (let i = 0; i < 5; i ++){
    urlCode += array[random(array)] 
  }
  return urlCode 
}

module.exports = generateShortenUrl
