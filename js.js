
window.addEventListener("DOMContentLoaded", init);

const endpoint =
  "http://mgcv.dk/recreate_wp_bikestock/wp-json/wp/v2/bike_stock?_embed";

function init(event) {
  getData();
}

async function getData() {
  let result = await fetch(endpoint);
  handleProductList(await result.json());
}

function handleProductList(data) {
  data.forEach(showBike);
}

function showBike(bike) {
  console.log(bike);
  //   grab the template
  const template = document.querySelector("#productCard").content;

  //   cloning the template
  const copy = template.cloneNode(true);

  // changing the...

  // brandname
  copy.querySelector(".brandname2").textContent = bike.brand_name;

  // productname
  copy.querySelector(".productname").textContent = bike.product_name;

  // price
  copy.querySelector(".price").textContent = `$${bike.price}`;

  // in_stock
  copy.querySelector(".stock").textContent = bike.in_stock;

  //   color

  const colorArray = bike.colour;

  colorArray.forEach((color) => {
    const col = document.createElement("div");
    col.classList.add("colourBox");
    col.style.background = color;
    copy.querySelector(".colors").appendChild(col);
  });

  if (bike.colour == false) {
    copy.querySelector(".colors").textContent = "N/A";
  }

  //   img

  copy
    .querySelector("img")
    .setAttribute(
      "src",
      bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large
        .source_url
    );

  // GRAB PARENT
  const parent = document.querySelector(".productlist_container");

  // APPEND
  parent.appendChild(copy);
}
