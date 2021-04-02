const logIn = document.querySelector('#access');

if(sessionStorage.getItem('token')) {
    window.location.href = '../index.html';
}

logIn.addEventListener('click', () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const error = document.getElementById('error');

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
        if(result.headers.get('auth-token')) {
            sessionStorage.setItem('token', result.headers.get('auth-token'));
        }
        else {
            sessionStorage.removeItem('token');
        }
        return result.json();
    })
    .then(data => {
        if(data.error === '"email" is not allowed to be empty'){
            error.textContent = "Il campo E-Mail non può essere vuoto";
            return;
        }
        if(data.error === '"email" length must be at least 6 characters long'){
            error.textContent = "Il campo E-Mail deve essere lungo almeno 6 caratteri";
            return;
        }
        if(data.error === '"email" must be a valid email'){
            error.textContent = "Il campo E-Mail deve contenere una mail valida";
            return;
        }
        if(data.error === '"password" is not allowed to be empty'){
            error.textContent = "Il campo Password non può essere vuoto";
            return;
        }
        if(data.error === '"password" length must be at least 6 characters long') {
            error.textContent = "Il campo password deve essere lungo almeno 6 caratteri";
            return;
        }
        if(data.error === 'Email or password is wrong'){
            error.textContent = "Email o Password non corrette";
            return;
        }
        console.log(data.error);
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('surname', data.surname);
        window.location.href = 'post.html';
    });
});