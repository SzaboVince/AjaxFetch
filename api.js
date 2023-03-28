const url="https://retoolapi.dev/QrWPU7/data";

const nameInput = document.querySelector("#name");
const interestInput = document.querySelector("#interest");
const companyInput = document.querySelector("#company");
const jobInput = document.querySelector("#job");
const submitButton = document.querySelector("#submit");
const queryButton = document.querySelector("#query");
const users = document.querySelector("#users");
submitButton.addEventListener('click', insert);
document.addEventListener("DOMContentLoaded",select);

async function insert() {
    let name = nameInput.value;
    let interest= interestInput.value;
    let company = companyInput.value;
    let job = jobInput.value;
const person={
    name:name,
    interest:interest,
    company:company,
    job:job,
}
   fetch(url,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(person)
    }).then(response=>{
        if (response.status===201){
            nameInput.value="";
            interestInput.value="";
            companyInput.value="";
            jobInput.value="";
            select();
        }
    })
}

queryButton.addEventListener('click', select);
function select() {
    while (users.lastchild) {
        users.removeChild(users.lastchild);
    }
    users.innerHTML = '';

    fetch(url)
        .then((response) => response.json())
        .then((data) => cards(data));

}

function cards(params) {
    console.log(params);
    for (let i = 0; i < params.length; i++) {
        const newCard = document.createElement('div');
        newCard.innerHTML = `<div class="card">
        <div class="card-header">
             ${params[i].name}
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${params[i].interest}</li>
                <li class="list-group-item">${params[i].company}</li>
                <li class="list-group-item">${params[i].job}</li>
            </ul>
            </div>`;
        newCard.classList.add("col-md-6");
        newCard.classList.add("col-lg-4");
        users.appendChild(newCard);
        console.log(newCard.innerHTML);
    }

}