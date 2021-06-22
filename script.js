const productName = document.getElementById('productNameInput');
const productPrice = document.getElementById('productPriceInput');
const productCategory = document.getElementById('productCategoryInput');
const productDesc = document.getElementById('productDescInput');
const addBtn = document.getElementById('addBtn');
const tableBody = document.getElementById('tableBody');
const showProducts = document.getElementById('showProducts');
let currentIndex = 0;

let productList;

if (localStorage.getItem('myProducts') == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem('myProducts'));
    displyProduct();
}

// On click the button add product
addBtn.addEventListener('click', function () {

    if (addBtn.innerHTML == 'Add') {
        addProduct();
    } else if (addBtn.innerHTML == 'Update') {
        saveUpdate();
    }


})

function addProduct() {
    if (!(productName.value && productPrice.value && productCategory.value)) {

    } else {
        let product = {
            name: productName.value.trim(),
            price: productPrice.value,
            category: productCategory.value.trim(),
            desc: productDesc.value.trim()
        }
        productList.push(product);
        localStorage.setItem('myProducts', JSON.stringify(productList));

        displyProduct();
        clearForm();
    }
}

function saveUpdate() {
    if (!(productName.value && productPrice.value && productCategory.value)) {

    } else {
        let product = {
            name: productName.value.trim(),
            price: productPrice.value,
            category: productCategory.value.trim(),
            desc: productDesc.value.trim()
        }
        productList[currentIndex] = product;
        localStorage.setItem('myProducts', JSON.stringify(productList));

        displyProduct();
        clearForm();
    }

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

}


function clearForm() {
    name: productName.value = '';
    price: productPrice.value = '';
    category: productCategory.value = '';
    desc: productDesc.value = '';
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
    localStorage.setItem('myProducts', JSON.stringify(productList));
    displyProduct();
}

function updateProduct(index) {
    currentIndex = index;
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDesc.value = productList[index].desc;

    addBtn.innerHTML = 'Update';

    console.log(currentIndex);
}







