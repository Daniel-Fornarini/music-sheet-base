fetch(
    'https://classical-music-api.herokuapp.com/api/user/authorization',
    {
        headers: {
            'auth-token': sessionStorage.getItem('token')
        }
    }
)
.then(result => {
    return result.json();
})
.then(data => {
    const section = document.querySelector('.form');

    if(data.error) {
        section.innerHTML = '<div class="form__title"><h1 class="heading-1">Accesso negato</h1><h3 class="heading-3">Esegui l\'accesso o registrati</h3><a href="login.html" class="btn btn--primary form__title-btn">Accedi</a><a href="signup.html" class="btn btn--primary form__title-btn">Registrati</a></div>';
        
    } else {
        section.innerHTML = '<div class="form__title"><h1 class="heading-1">Aggiungi un brano</h1><h3 class="heading-3">Al nostro archivio</h3></div><div class="form__group"><input type="text" class="form__input form__input--small" placeholder="Titolo" id="title"><input type="text" class="form__input form__input--small" placeholder="Compositore" id="composer"><input type="text" class="form__input form__input--small" placeholder="Anno" id="year"><input type="text" class="form__input form__input--small" placeholder="Durata" id="duration"><input type="text" class="form__input form__input--small" placeholder="Tonalit&agrave;" id="key"><input type="text" class="form__input form__input--small" placeholder="Link video" id="video"><input type="file" class="form__file" id="sheet" accept="application/pdf"><label for="sheet" class="form__label"><a class="btn btn--primary">Aggiungi lo spartito</a><div class="form__file-title"></div></label><div class="form__error" id="error"></div><button class="btn btn--primary form__btn" id="btn">Amplia l\'archivio</button></div>';

        const title = document.getElementById('title');
        const composer = document.getElementById('composer');
        const duration = document.getElementById('duration');
        const year = document.getElementById('year');
        const key = document.getElementById('key');
        const video = document.getElementById('video');
        const sheet = document.getElementById('sheet');
        const btn = document.getElementById('btn');
        const error = document.getElementById('error');

        document.querySelector('#sheet').addEventListener('change', () => {
            const fileName = document.querySelector('.form__file-title');
            fileName.textContent = sheet.files[0].name;
        });

        btn.addEventListener('click', () => {
            const formData = new FormData();

            formData.append('title', title.value);
            formData.append('composer', composer.value);
            formData.append('duration', duration.value);
            formData.append('year_of_composition', year.value);
            formData.append('key', key.value);
            formData.append('video', video.value);
            formData.append('music_sheet', sheet.files[0]);

            fetch(
                'https://classical-music-api.herokuapp.com/api/POST/track',
                {
                    headers: {
                        'auth-token': sessionStorage.getItem('token')
                    },
                    method: "POST",
                    body: formData
                }
            ).then(result => {
                return result.json();
            })
            .then(data => {
                console.log(data.error)
                if(data.error === 'file is required'){
                    error.textContent = "È richiesto un file";
                    return;
                }
                if(data.error === 'only pdf') {
                    error.textContent = "Sono permessi solo PDF";
                    return;
                }
                if(data.error === '"title" is not allowed to be empty'){
                    error.textContent = "Il campo nome non può essere vuoto";
                    return;
                }
                if(data.error === '"composer" is not allowed to be empty'){
                    error.textContent = "Il campo compositore non può essere vuoto";
                    return;
                }
                if(data.error === '"year_of_composition" is not allowed to be empty'){
                    error.textContent = "Il campo anno non può essere vuoto";
                    return;
                }
                if(data.error === '"duration" is not allowed to be empty'){
                    error.textContent = "Il campo durata non può essere vuoto";
                    return;
                }
                if(data.error === '"key" is not allowed to be empty'){
                    error.textContent = "Il campo tonalità non può essere vuoto";
                    return;
                }
                if(data.error === '"video" is not allowed to be empty'){
                    error.textContent = "Il campo link video non può essere vuoto";
                    return;
                }
                window.location.href = './track.html?id=' + data.id;
            })
        });
    }
});

if(sessionStorage.getItem('name')) {
    const user = document.querySelector('.navbar__user');
    user.textContent = sessionStorage.getItem('name') + ' ' + sessionStorage.getItem('surname');

    const signup = document.querySelector('#signup');
    const log = document.querySelector('#log');

    signup.style.display = 'none';
    log.innerHTML = 'Log Out';
    log.setAttribute('href', '../index.html');
    log.addEventListener('click', () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('surname');
        sessionStorage.removeItem('token');
    });
}

