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

function prepChart(){
  for (var i = 0; i < products.length; i++) {
    products[i].setPopularity();
  }
  var comparePopularity = function(productA, productB){
    if(productA.popularity > productB.popularity){
      return -1;
    }
    else if(productA.popularity < productB.popularity){
      return 1;
    }
    else{
      if(productA.totalPresented > productB.totalPresented){
        return -1;
      }
      else if(productA.totalPresented < productB.totalPresented){
        return 1;
      }
      else return 0;
    }
  };
  products.sort(comparePopularity);
}

function displayChart(){
  prepChart();
  var clickBackgroundColors = [];
  var presentedBackgroundColors = [];
  var hoverColors = [];
  for (var i = 0; i < products.length; i++) {
    clickBackgroundColors[i] = '#ff0000';
    presentedBackgroundColors[i] = '#0000ff';
    hoverColors[i] = '#9900ff';
  }
  var data = {
    labels: products.map(function(product) {return product.name;}),
    datasets: [
      {
        data: products.map(function(product) {return product.clicks;}),
        backgroundColor: clickBackgroundColors,
        hoverBackgroundColor: hoverColors
      },
      {
        data: products.map(function(product) {return product.totalPresented;}),
        backgroundColor: presentedBackgroundColors,
        hoverBackgroundColor: hoverColors
      }
    ],
  };
  var canvas1 = document.getElementById('canvas1');
  var context = canvas1.getContext('2d');
  var dataChart = new Chart(context, {
    type: 'bar',
    data: data,
    options: {responsive: false},
    scales: [{
      ticks: {
        beginAtZero:true
      }
    }]
  });
  canvas1.style.visibility = 'visible';
}

function Product(source, index){
  this.source = source;
  this.index = index;
  this.name = source.slice(7, source.length - 4);
  this.totalPresented = 0;
  this.clicks = 0;
  this.lastPresented = 0;
  this.popularity = 0;
  this.setPopularity = function(){
    if(this.totalPresented === 0){
      this.popularity = 0;
    }else{
      this.popularity = this.clicks / this.totalPresented;
    }
  };
}

function generateImages(){
  for (var i = 0; i < inUse.length; i++) {
    var img = document.getElementById('img' + (i + 1));
    var srcAtt = document.createAttribute('src');
    srcAtt.value = inUse[i].source;
    var altAtt = document.createAttribute('alt');
    altAtt.value = inUse[i].name;
    img.setAttributeNode(srcAtt);
    img.setAttributeNode(altAtt);
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

function showResults(){
  var finished = new Product('images/finished.jpg');
  inUse = [finished, finished, finished];
  generateImages();
  var messageTag = document.getElementById('messageTag');
  var totalsMessage = '';
  for (var i = 0; i < products.length; i++) {
    totalsMessage += products[i].name + ': ' + products[i].clicks + '/' + products[i].totalPresented + '. (' + products[i].popularity.toFixed(2) + ') | ';
  }
  messageTag.textContent = 'You have completed the survey. Thank you for participating! Results: ' + totalsMessage;
  console.log('Survey complete.');
  console.log('Results: ' + totalsMessage);
}

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
      products[rand].totalPresented += 1;
      products[rand].lastPresented = turnNumber;
      inUse[i] = products[rand];
    }
  }
  generateImages();
}

function handleClick(event){
  var clickedProduct = inUse[event.target.id.slice(3, 4) - 1];
  clickedProduct.clicks += 1;
  if(turnNumber >= 25){
    displayChart();
    showResults();
    body.removeEventListener('click', handleClick);
  }
  else{
    populateInUse();
    console.log(clickedProduct.name + ' ' + clickedProduct.clicks + '/' + clickedProduct.totalPresented);
    console.log(26 - turnNumber + ' choices left.');
    console.log(event.target.id);
  }
}
populateInUse();
body.addEventListener('click', handleClick);
