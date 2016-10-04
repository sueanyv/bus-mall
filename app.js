'use strict';

var products = [
  new Product('images/bag.jpg'),
  new Product('images/banana.jpg'),
  new Product('images/bathroom.jpg'),
  new Product('images/boots.jpg'),
  new Product('images/breakfast.jpg'),
  new Product('images/bubblegum.jpg'),
  new Product('images/chair.jpg'),
  new Product('images/cthulhu.jpg'),
  new Product('images/dog-duck.jpg'),
  new Product('images/dragon.jpg'),
  new Product('images/pen.jpg'),
  new Product('images/pet-sweep.jpg'),
  new Product('images/scissors.jpg'),
  new Product('images/shark.jpg'),
  new Product('images/sweep.png'),
  new Product('images/tauntaun.jpg'),
  new Product('images/unicorn.jpg'),
  new Product('images/usb.gif'),
  new Product('images/water-can.jpg'),
  new Product('images/wine-glass.jpg')
];
for (var i = 0; i < products.length; i++) {
  products[i].index = i;
}
var inUse = [{}, {}, {}];
var turnNumber = 0;
var body = document.getElementById('body');

function Product(source, index){
  this.source = source;
  this.index = index;
  this.name = source.slice(7, source.length - 4);
  this.totalPresented = 0;
  this.clicks = 0;
  this.lastPresented = 0;
}

function generateImages(){
  for (var i = 0; i < inUse.length; i++) {
    var img = document.getElementById('img' + (i + 1));
    var srcAtt = document.createAttribute('src');
    console.log(inUse[i].source);
    srcAtt.value = inUse[i].source;
    img.setAttributeNode(srcAtt);
  }
}
function generateRand(skipArr){
  var rand = Math.floor(Math.random() * (products.length - skipArr.length));
  for (var i = 0; i < skipArr.length; i++) {
    if(rand >= skipArr[i]){
      rand += 1;
    }
  }
  return rand;
};

function populateInUse(){
  var skipArr = [];
  turnNumber += 1;
  for (var i = 0; i < inUse.length; i++) {
    var rand = generateRand(skipArr);
    skipArr.push(rand);
    if(products[rand].lastPresented >= (turnNumber - 1) && turnNumber > 1){
      i -= 1;
    }
    else{
      products[rand].lastPresented = turnNumber;
      inUse[i] = products[rand];
      console.log(products[rand].name);
    }
  }
  generateImages();
}
populateInUse();
body.addEventListener('click', populateInUse);
