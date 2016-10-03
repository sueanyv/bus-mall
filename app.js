var products = [
  new Product('bag', 'bag.jpg'),
  new Product('bananna', 'banana.jpg'),
  new Product('bathroom', 'bathroom.jpg'),
  new Product('boots', 'boots.jpg'),
  new Product('breakfast', 'breakfast.jpg'),
  new Product('bubblegum', 'bubblegum.jpg'),
  new Product('chair', 'chair.jpg'),
  new Product('cthulhu', 'cthulhu.jpg'),
  new Product('dog-duck', 'dog-duck.jpg'),
  new Product('dragon', 'dragon.jpg'),
  new Product('pen', 'pen.jpg'),
  new Product('pet-sweep', 'pet-sweep.jpg'),
  new Product('scissors', 'scissors.jpg'),
  new Product('shark', 'shark.jpg'),
  new Product('sweep', 'sweep.png'),
  new Product('tauntaun', 'tauntaun.jpg'),
  new Product('unicorn', 'unicorn.jpg'),
  new Product('usb', 'usb.gif'),
  new Product('water-can', 'water-can.jpg'),
  new Product('wine-glass', 'wine-glass.jpg')
];
var body = document.getElementById('body');
for (var i = 0; i < products.length; i++) {
  products[i].index = i;
  var product = document.createElement('img');
  var srcAtt = document.createAttribute('src');
  srcAtt.value = products[i].source;
  product.setAttributeNode(srcAtt);
  body.appendChild(product);
}
// for (var i = 0; i < products.length; i++) {
//   products[i].index = i;
// }
var inUse = [];
var totalclicks = 0;

function Product(name, source, index){
  this.name = name;
  this.source = source;
  this.index = index;
  this.totalPresented = 0;
  this.clicks = 0;
}

function displayProduct(){};
function clickImage(event){};
