const dolar = document.getElementById("dolar");
const tala = document.getElementById("tala");
const seke = document.getElementById("seke");
const date= document.getElementById("date");

const url = "https://api.navasan.tech/latest/?api_key=freeJWQJQzaDwAVOLq34CBn0ANvJg9py";

fetch(url)
  .then(response => response.json())
  .then(data => {
    dolar.textContent = data.usd_sell.value + " "+"تومان"
    date.textContent = data.usd_sell.date 
  })

  fetch(url)
  .then(response => response.json())
  .then(data => {
    tala.textContent = data.bahar.value + " "+"تومان"
  })

  fetch(url)
  .then(response => response.json())
  .then(data => {
    seke.textContent = data.nim.value + " "+"تومان"
  })




  .catch(error => {
    console.error("مشکلی پیش اومد:", error);
  });