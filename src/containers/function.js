function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

var students = [
  {
    name:'some name red 1',
    lastColor: 'red'
  },
  {
    name:'some name red 2',
    lastColor: 'green'
  },
  {
    name:'some name red 3',
    lastColor: 'yellow'
  }
]

var rndNumber = getRandomInt(100)
var lastColor = 'red'

if(rndNumber <= 49){
  lastColor = 'red'
}else if(rndNumber <= 82){
  lastColor = 'yellow'
}

var selectedStudents = []
for(var i in students){
  if(students[i].color == lastColor){
    selectedStudents.push(students[i])
  }
}

var studentNumber = getRandomInt(selectedStudents.length)
console.log(selectedStudents[studentNumber])
