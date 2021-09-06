const productName = document.getElementById("productNameInput");
const productPrice = document.getElementById("productPriceInput");
const productCategory = document.getElementById("productCategoryInput");
const productDesc = document.getElementById("productDescInput");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const showProducts = document.getElementById("showProducts");
const displayAllProducts = document.querySelector(".displayAllProducts");
const displayErrorMsg = document.querySelector(".displayErrorMsg");
const errorMsg = document.querySelector(".errorMsg");

let currentIndex = 0;

let productList;

if (localStorage.getItem("myProducts") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("myProducts"));
  displyProduct();
}

function displayHideProducts() {
  if (productList.length > 0) {
    displayAllProducts.classList.add("show");
    displayErrorMsg.classList.remove("show");
  } else {
    displayErrorMsg.classList.add("show");
    displayAllProducts.classList.remove("show");
  }
}
displayHideProducts();
// On click the button add product
addBtn.addEventListener("click", function () {
  if (addBtn.innerHTML == "Add") {
    addProduct();
  } else if (addBtn.innerHTML == "Update") {
    saveUpdate();
  }
});

function addProduct() {
  if (
    !(
      productName.value &&
      productPrice.value &&
      productCategory.value &&
      productDesc.value
    )
  ) {
    errorMsg.classList.add("showErrorMsg");
  } else {
    errorMsg.classList.remove("showErrorMsg");
    let product = {
      name: productName.value.trim(),
      price: productPrice.value,
      category: productCategory.value.trim(),
      desc: productDesc.value.trim(),
    };
    productList.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productList));

    //Scroll to display products section
    scrollToProd();
    displayHideProducts();
    displyProduct();
    clearForm();
  }
}

function saveUpdate() {
  if (
    !(
      productName.value &&
      productPrice.value &&
      productCategory.value &&
      productDesc.value
    )
  ) {
    errorMsg.classList.add("showErrorMsg");
  } else {
    errorMsg.classList.remove("showErrorMsg");
    let product = {
      name: productName.value.trim(),
      price: productPrice.value,
      category: productCategory.value.trim(),
      desc: productDesc.value.trim(),
    };
    productList[currentIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productList));

    //Scroll to display products section
    scrollToProd();

    clearForm();
    addBtn.innerHTML = "Add";
  }
  displayHideProducts();
  displyProduct();
}

function displyProduct() {
  let productRow = ``;

  for (let i = 0; i < productList.length; i++) {
    currentIndex = `${i}`;
    productRow += `
        <tr class="text-white">
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].desc}</td>
            <td> 
            <button class='deleteBtn' onclick='deleteProduct(${i})'> <i  class="fas fa-trash-alt text-white " style='font-size:20px'></i>   </button> 
            <button class='editBtn' onclick='updateProduct(${i})'> <i class="far fa-edit text-white" style='font-size:20px'></i>   </button>
            </td>
        </tr>
        `;
  }

  tableBody.innerHTML = productRow;
  displayHideProducts();
}

function clearForm() {
  name: productName.value = "";
  price: productPrice.value = "";
  category: productCategory.value = "";
  desc: productDesc.value = "";
}

function searchProduct(term) {
  let search = ``;
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.includes(term.trim())) {
      search += `
            <tr class="text-white">
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td> 
                <button class='deleteBtn' onclick='deleteProduct(${i})'> <i  class="fas fa-trash-alt text-white " style='font-size:20px'></i>   </button>
                <button class='editBtn' onclick='updateProduct(${i})'> <i class="far fa-edit text-white" style='font-size:20px'></i>   </button>
                </td>
            </tr>
            `;
    }
    tableBody.innerHTML = search;
  }
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("myProducts", JSON.stringify(productList));

  if (productList.length == 0) {
    scrollToTop();
  }
  displayHideProducts();
  displyProduct();
}

function updateProduct(index) {
  //Scroll up to form
  scrollToTop();

  currentIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDesc.value = productList[index].desc;

  addBtn.innerHTML = "Update";
}

function scrollToProd() {
  productsPosition = displayAllProducts.offsetTop;
  scrollTo({
    left: 0,
    top: productsPosition,
    behavior: "smooth",
  });
}

function scrollToTop() {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
