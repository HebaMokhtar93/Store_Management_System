let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btncreat = document.getElementById('btncreat');
let upbtn = document.getElementById('upbtn');
let lightbtn = document.getElementById('lightThemebtn');
let darkbtn = document.getElementById('darkThemebtn');
let mood = 'create';
let temp;

//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
};
// create
let datapro;
if (localStorage.product != null) {
    datapro =JSON.parse( localStorage.product);
}
else { 
    datapro = [];
}
function create() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value
    }
    //clean data
    if (title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100) {
        //count
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datapro.push(newPro);
                }
            }
            else {
                datapro.push(newPro);
            }
        }
        else {
            datapro[temp] = newPro;
            mood = 'create';
            count.style.display = 'block';
            btncreat.innerHTML = 'create';
        }
        clearInput();
    }
    // save Localstorage
    localStorage.setItem('product', JSON.stringify(datapro));
    showData();
}
//clear all input
function clearInput() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style = 'red';
    category.value = '';
    count.value = '';
}
//read
function showData()
{
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
               <td>${i + 1}</td>
               <td>${datapro[i].title}</td>
               <td>${datapro[i].price}</td>
               <td>${datapro[i].taxes}</td>
               <td>${datapro[i].ads}</td>
               <td>${datapro[i].discount}</td>
               <td>${datapro[i].total}</td>
               <td>${datapro[i].category}</td>
               <td><button onclick='updateData(${i})' id="btnUpdate">Update</button></td>
               <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>`;;
    }
    document.getElementById('tbody').innerHTML = table; 
    let btnDeleteAll = document.getElementById('btnDeleteAll');
    if (datapro.length > 0) {
        btnDeleteAll.innerHTML = '<button onclick="deleteAll()">Delete All(' + datapro.length + ')</button>';
    }
    else {
        btnDeleteAll.innerHTML = '';
    }
}
showData();
//delete
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}
//delete all
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}
//update
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    count.style.display = 'none';
    btncreat.innerHTML = 'Updata';
    getTotal();
    mood = 'updata';
    temp = i;
    scroll({ top: 0,behavior:'smooth' });
}
//screach
let searchMood = 'title';
function getSearchMood(id) {
    let searchInput = document.getElementById('search');
    if (id == 'searchBytitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category'
    }
    searchInput.placeholder = 'Search By ' + searchMood;
    searchInput.focus();
    searchInput.value = '';
    showData();
}
function searchData(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchMood == 'title') {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                   <td>${i + 1}</td>
                   <td>${datapro[i].title}</td>
                   <td>${datapro[i].price}</td>
                   <td>${datapro[i].taxes}</td>
                   <td>${datapro[i].ads}</td>
                   <td>${datapro[i].discount}</td>
                   <td>${datapro[i].total}</td>
                   <td>${datapro[i].category}</td>
                   <td><button onclick='updateData(${i})' id="btnUpdate">Update</button></td>
                   <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>`;
            }
        }
        else {//search by category
            if (datapro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i + 1}</td>
                   <td>${datapro[i].title}</td>
                   <td>${datapro[i].price}</td>
                   <td>${datapro[i].taxes}</td>
                   <td>${datapro[i].ads}</td>
                   <td>${datapro[i].discount}</td>
                   <td>${datapro[i].total}</td>
                   <td>${datapro[i].category}</td>
                   <td><button onclick='updateData(${i})' id="btnUpdate">Update</button></td>
                   <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>`;
            }
        } 
    }
    document.getElementById('tbody').innerHTML = table;
}
//up botton
window.onscroll = function () {
    if (scrollY >= 110) {
        upbtn.classList.remove('hide');
    }
    else {
        upbtn.classList.add('hide');
    }
}
upbtn.onclick = function () {
    scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}
//change lheme
function changeTheme(id) {
    let inputs = document.getElementsByTagName("input");
    let buttons = document.getElementsByTagName("button");
    if (id == 'lightThemebtn') {
        console.log(id);
        lightbtn.classList.add('hide');
        darkbtn.classList.remove('hide');
        document.body.classList.add("light-mode");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.background = '#fff0f5';
            inputs[i].style.color = 'black';
        }
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.color = 'black';
        }
    }
    else {
        lightbtn.classList.remove('hide');
        darkbtn.classList.add('hide');
        document.body.classList.remove("light-mode");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.background = '#111';
            inputs[i].style.color = 'white';
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.color = 'white';
        }
    }
}