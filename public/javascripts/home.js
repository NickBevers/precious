let transactionData, user_email;
window.addEventListener("load", function(){
    let tokencheck = localStorage.getItem("token");
    if(!tokencheck){
        alert("wrong page");
        window.location.replace("login.html");
    }
    else{
        //primus live feature /get frontend
        // alert("hello beautiful!");
        
        fetch("http://localhost:3000/api/v1/transfers", {
        method:"get",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${tokencheck}`
        }
        }).then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "succes"){
                console.log(json.data);
                transactionData = json.data;
                user_email = json.user.email;

                json.data.forEach(element => {
                    // set clicklistener with transfer to detail view with element data

                    if(element.recipient == json.user.email){
                        let sender = splitEmail(element.sender);
                        
                        let transaction = `<li class="list__item">
                            <p class="list__item--amount">+${element.amount}P</p>
                            <p class="list__item--from-to">${sender[0] + " " + sender[1]}</p>
                            <i class="fas fa-envelope list__item--message"></i>
                        </li>
                        <hr class="list__hr">`
                        document.querySelector(".list").innerHTML += transaction;
                    }
                    else{
                        let recipient = splitEmail(element.recipient);

                        let transaction = `<li class="list__item">
                            <p class="list__item--amount--sent">-${element.amount}P</p>
                            <p class="list__item--from-to">${recipient[0] + " " + recipient[1]}</p>
                            <i class="fas fa-envelope list__item--message"></i>
                        </li>
                        <hr class="list__hr">`
                        document.querySelector(".list").innerHTML += transaction;
                    }
                });
            }
        })
    }
});

function splitEmail(mail){
    let name = mail.split('@')[0];
    name = name.split(".");
    if(!name[0]){name[0] = " ";}
    if(!name[1]){name[1] = " ";}
    
    return name
}

let list = document.querySelector(".list");
list.addEventListener("click", (e) => {
    let index = [... list.childNodes].indexOf(e.target.parentElement) /3 -1;
    if(index < 0){index = null}
    if(index != null){
        // console.log(index);
        // console.log(e.target.parentElement);
        // console.log(transactionData[index]);
        localStorage.setItem("transaction", JSON.stringify(transactionData[index]));
        localStorage.setItem("user", user_email);
        window.location.replace("trans_detail.html");
    }
});


// fetch("http://localhost:3000/api/v1/", {
//     "headers": {
//         "Authorization": "Bearer " + localStorage.getItem("token")
//     }
// }).then(result => {
//     return result.json();
// }).then(json =>{
//     console.log(json);
// }).catch(err => {
//     //redirect naar login scherm
//     window.location.replace("login.html");
// });
