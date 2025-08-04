const user = {
  name: prompt("Adınız:"),
  age: parseInt(prompt("Yaşınız:")),
  job: prompt("Mesleğiniz:")
};

let cart = [];
//ekleme
function addProduct() {
  const name = prompt("Ürün adı:");
  const price = parseFloat(prompt("Ürün fiyatı:"));
  if (name && !isNaN(price)) {
    cart.push({ name, price });
  }
}
//listeleme
function listCart() {
  cart.forEach(item => {
    console.log(`${item.name} - ${item.price} TL`);
  });
}
//toplam fiyat hesaplmama
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  console.log(`Toplam: ${total} TL`);
}
//dinamik ekleme
let adding = true;
while (adding) {
  addProduct();
  adding = prompt("Devam? (evet/hayır)") === "evet";
}
//silme
function removeProduct(name) {
  const index = cart.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

//fonksiyonları çağırma
const removeName = prompt("Silmek istediğiniz ürün:");
removeProduct(removeName);

listCart();
calculateTotal();

