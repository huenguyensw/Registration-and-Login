let email = document.getElementById('email');
let pass = document.getElementById('password');
let form = document.getElementById('form');
let warn = document.getElementById('warning');

let url = 'http://localhost:3000/users2/';
const testURL = 'http://localhost:3000/users/validaccount?email=';
let userURL;
let warning ='';

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    userURL = testURL + email.value + '&password=' + pass.value;
    console.log(userURL);
    fetch(userURL)
    .then((response)=>{
        if(response.ok==false){
            throw new Error('Something went wrong');
        }
        return response.text();
    })
    .then((data)=>{
        console.log(data);
        if(data == 'false'){
            warning = 'Email or password are incorrect!';
            warn.innerHTML = warning;
            warn.style.display = 'block';
        } else {
            //to go to homepage with logged user
            document.getElementById('submit').firstElementChild.href='https://www.google.com/';
        }
    })
    .catch((error)=>{
        console.log(error);
    })
    .finally(()=>{
        userURL = testURL;
    })
})