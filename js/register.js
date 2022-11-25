let form = document.getElementById('form');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPass');
let term = document.getElementById('terms');
let email = document.getElementById('email');

let url = 'http://localhost:3000/users2/';
const testURL = 'http://localhost:3000/users/checkexist?email=';
let userURL;
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let warning = '';
    if (password.value != confirmPassword.value) {
        warning = 'Your password and confirm password do not match!';
        confirmPassword.nextElementSibling.innerHTML = warning;
        confirmPassword.nextElementSibling.style.display = 'block';
        password.style.borderColor = 'red';
        confirmPassword.style.borderColor = 'red';
    } else if (!(term.checked)) {
        confirmPassword.nextElementSibling.style.display = 'none';
        password.style.borderColor = 'var(--light-green)';
        confirmPassword.style.borderColor = 'var(--light-green)';
        warning = 'Accept terms and policy before registrating.';
        term.parentNode.lastElementChild.innerHTML = warning;
        term.parentNode.lastElementChild.style.display = 'block';
    }
    if (warning == '') {
        userURL = testURL + email.value;
        console.log(userURL);
        fetch(userURL)
            .then((response) => {
                console.log(response)
                if (response.ok == false) {
                    throw new Error('Something went wrong');
                }
                return response.text();
            })
            .then((data) => {
                console.log(data);
                if (data == 'false') {
                    addUser(url, e);
                } else {
                    warning = 'Email was registered';
                    document.getElementById('warning').innerHTML = warning;
                    document.getElementById('warning').style.display = "block";
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                userURL = testURL;
            })
    }
})
function myFunction(){
    document.getElementById('warning').style.display = 'none';
}
// async function putData(email){
//     let updatedValue = {'value':email};
//     try {
//         const response = await fetch(url, {
//             method: 'PUT',
//             body: JSON.stringify(updatedValue),
//             headers: {
//                 'Content-type': 'application/json',
//             },
//         });
//         const json = await response.text();
//     } catch (e) {
//         console.error(e);
//     }
// }

async function addUser(url, e) {
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const json = await response.text();
        confirmPassword.nextElementSibling.style.display = 'none';
        term.parentNode.lastElementChild.style.display = 'none';
        warning = 'Congratulation! You registered successfully!';
        document.getElementById('warning').innerHTML = warning;
        document.getElementById('warning').style.display = "block";
        form.reset();
    } catch (e) {
        console.error(e);
    }
}