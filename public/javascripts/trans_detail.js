window.addEventListener("load", function(){
    let tokencheck = localStorage.getItem("token");
    if (!tokencheck) {
        // alert("Please log in");
        window.location.href = "login.html";
    }
    else{
        let data = JSON.parse(localStorage.getItem("transactionID"));
        if(data == undefined || data == null || data == ""){
            this.window.location.replace("home.html");
        }

        localStorage.removeItem("transactionID");
        let from_to = document.querySelector(".recipient");
        let amount = document.querySelector(".amount");
        let reason = document.querySelector(".reason");
        let message = document.querySelector(".message");

        fetch(`/api/v1/transfers/id=${data}`, {
        method:"get",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${tokencheck}`
        } 
        }).then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "Success"){
                user_email = json.user.email;

                if (json.data.recipient == data.user || json.data.recipient == "all@student.thomasmore.be"){
                    from_to.innerHTML = json.data.sender
                }
                else{
                    from_to.innerHTML = json.data.recipient
                }

                if(json.data.amount == 1){
                    amount.innerHTML = `${json.data.amount} coin`;
                }
                else{
                    amount.innerHTML = `${json.data.amount} coins`;
                }
                
                reason.innerHTML = json.data.reason;
                message.innerHTML = json.data.message;
            }
        })

        document.querySelector(".button--primary").addEventListener("click", () => {
            window.location.replace("home.html");
        })
    }
});

function signout(){
    localStorage.removeItem("token");
}
