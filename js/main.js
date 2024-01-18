var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var products = [];
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var tem;

if (localStorage.getItem("products") !=null){
    products=JSON.parse(localStorage.getItem("products"));
    displayProduct(products);
}


function createProduct() {
    if (validateName()==true) {
    var productInfo = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value
    }
    products.push(productInfo);
    localStorage.setItem("products",JSON.stringify(products));
    displayProduct(products);
    resetForm()
}
}

function resetForm() {
    productName.value=""
    productPrice.value=""
    productCategory.value=""
    productDesc.value=""
}

function displayProduct (arrayProducts) {
    var cartona =``;
    for (var i = 0; i < arrayProducts.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${arrayProducts[i].name}</td>
        <td>${arrayProducts[i].price}</td>
        <td>${arrayProducts[i].category}</td>
        <td>${arrayProducts[i].desc}</td>
        <td><button onClick="setProductUpdate(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML=cartona;
}


function deleteProduct(index) {
    products.splice(index , 1);
    localStorage.setItem("products",JSON.stringify(products));
    displayProduct(products);
}


function searchProducts (terms) {
    var cartona = ``;
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(terms.toLowerCase())==true) {
            cartona += `<tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onClick="setProductUpdate(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
        }
        document.getElementById("tbody").innerHTML=cartona;
            // searchArr.push(products[i]);
        }
    }
    // displayProduct(searchArr);


function setProductUpdate(index) {
    addBtn.classList.replace('d-block' , 'd-none');
    updateBtn.classList.replace('d-none' , 'd-block');
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDesc.value = products[index].desc;
    tem=index;
}

function updateProduct() {
    addBtn.classList.replace('d-none' , 'd-block');
    updateBtn.classList.replace('d-block' , 'd-none');
        products[tem].name = productName.value;
        products[tem].price = productPrice.value;
        products[tem].category = productCategory.value;
        products[tem].desc = productDesc.value;
    localStorage.setItem("products",JSON.stringify(products));
    displayProduct(products);
}


function validateName() {
    var regex = /^[A-Z][a-z]{0,8}$/
        if (regex.test(productName.value)==true) {
            productName.style.border="none";
            document.getElementById("invalidName").classList.add("d-none");
            return true
        }else {
            productName.style.border="2px solid red";
            document.getElementById("invalidName").classList.remove("d-none");
            return false
        }
}



