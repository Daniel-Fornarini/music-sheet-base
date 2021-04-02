const singupBtn = document.querySelector('#register');

if(sessionStorage.getItem('token')) {
    window.location.href = '../index.html';
}

//Register
singupBtn.addEventListener('click', () => {
    
    const firstName = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('password-repeat');
    const error = document.getElementById('error');

    if(password.value !== repeatPassword.value){
        error.textContent = 'Le password non corrispondono';
        return;
    }
    else {
        error.innerHTML = '';
    }

    const obj = {
        name: firstName.value,
        surname: surname.value,
        email: email.value,
        password: password.value
    };

    fetch(
        'https://classical-music-api.herokuapp.com/api/user/register',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(obj)
        }
    ).then(result => {
        return result.json();
    })
    .then(data => {
        if(data.error === '"name" is not allowed to be empty'){
            error.textContent = "Il campo nome non può essere vuoto";
            return;
        }
        if(data.error === '"surname" is not allowed to be empty'){
            error.textContent = "Il campo cognome non può essere vuoto";
            return;
        }  
        if(data.error === '"email" is not allowed to be empty'){
            error.textContent = "Il campo e-mail non può essere vuoto";
            return;
        }
        if(data.error === '"email" is not allowed to be empty'){
            error.textContent = "Il campo e-mail non può essere vuoto";
            return;
        }
        if(data.error === '"email" length must be at least 6 characters long'){
            error.textContent = "Il campo e-mail deve essere lungo almeno 6 caratteri";
            return;
        }
        if(data.error === '"email" must be a valid email'){
            error.textContent = "Il campo e-mail deve contenere una mail valida";
            return;
        }
        if(data.error === '"password" is not allowed to be empty'){
            error.textContent = "Il campo password non può essere vuoto";
            return;
        }

        //Auto login
        const obj = {
            email: email.value,
            password: password.value
        };

        fetch(
            'https://classical-music-api.herokuapp.com/api/user/login',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(obj)
            }
        ).then(result => {
            sessionStorage.setItem('token', result.headers.get('auth-token'));
            sessionStorage.setItem('name', firstName.value);
            sessionStorage.setItem('surname', surname.value);
            window.location.href = 'post.html';
        });
    });
});