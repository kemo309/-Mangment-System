let title = document.getElementById("title");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let size = document.getElementById("size");
let count = document.getElementById("count");
let submet = document.getElementById("submet");

let mode="CREATE";
let tmp;

//get total

function gettotal()
{
    if(price.value != '')
    {
        let result = +price.value - +discount.value;
        total.innerHTML = result;
        total.style.background="#090";
    }else
    {
        total.innerHTML='';
        total.style.background="#ec2213";
    }
}


//create product


let datapro ;
if(localStorage.product != null)
{
    datapro=JSON.parse(localStorage.product)
}else
{
    datapro = [];
}


submet.onclick = function()
{
    let newpro = 
    {
        title:title.value.toLowerCase(),
        price:price.value,
        discount:discount.value,
        total:total.innerHTML,
        size:size.value,
        count:count.value,
    }

    if(title.value!=''&&price.value!=''&&newpro.count<100){
        if(mode==="CREATE"){
            if(newpro.count>1){
                for(let i = 0;i<newpro.count;i++){
                datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[tmp]=newpro;
            mode="CREATE";
            submet.innerHTML="CREATE";
            count.style.display="block";
        }
        
    cleardata();
    
    }


    //save localstorge

    localStorage.setItem('product',JSON.stringify(datapro));

    showdata();
}

//clear input


function cleardata()
{
    title.value='';
    price.value='';
    discount.value='';
    total.innerHTML='';
    size.value='';
    count.value='';
}


//read


function showdata()
{
    gettotal();
    let table = "";
    for(let i = 0 ; i < datapro.length ; i++)
    {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].count}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;

    let deleteall = document.getElementById('deleteall');
    if(datapro.length > 0){
        deleteall.innerHTML=`
        <button onclick="deleteall()" >Delete All (${datapro.length})</button>
        `
    }else{
        deleteall.innerHTML="";
    }
}
showdata();


//delete


function deletedata(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showdata();
}

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

//count

//update

function updatedata(i){
    title.value =datapro[i].title;
    price.value =datapro[i].price;
    discount.value =datapro[i].discount;
    gettotal();
    count.style.display="none";
    submet.innerHTML="UPDATE";
    mode="UPDATE";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


//search

let searchmood = "title";

function getsearchmood(id){
    let search = document.getElementById("search");
    if(id=="searchtitle"){
        searchmood="title";
        search.placeholder="Search by title";
    }else{
        searchmood="size";
        search.placeholder="Search by Size";
    }
    search.focus();
    search.value="";
    showdata();
}


function searchdata(value){
    let table = "";
    if(searchmood=="title"){
        for(let i =0;i<datapro.length;i++){
            if(datapro[i].title.toLowerCase().includes(value)){
                table += `
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}


//clea data