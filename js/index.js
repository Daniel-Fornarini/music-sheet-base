const headerBtn = document.querySelector('.header__btn');
const searchBtn = document.querySelector('.search__button');

if(sessionStorage.getItem('name')) {
    const user = document.querySelector('.navbar__user');
    user.textContent = sessionStorage.getItem('name') + ' ' + sessionStorage.getItem('surname');

    const signup = document.querySelector('#signup');
    const log = document.querySelector('#log');

    signup.style.display = 'none';
    log.innerHTML = 'Log Out';
    log.setAttribute('href', './');
    log.addEventListener('click', () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('surname');
        sessionStorage.removeItem('token');
    });
}

headerBtn.addEventListener('click', () => {
    
    fetch('https://classical-music-api.herokuapp.com/api/GET/tracks')
    .then(result => {
        return result.json();
    })
    .then(data => {
        const cardsTitle = document.querySelector('#cards-title');
        const sectionCards = document.querySelector('#cards');
        const cardsLeft = document.querySelector('#cards-left');
        const cardsRight = document.querySelector('#cards-right');

        cardsTitle.setAttribute('class', 'cards__title');
        sectionCards.setAttribute('class', 'cards')
        cardsLeft.setAttribute('class', 'cards-left');
        cardsRight.setAttribute('class', 'cards-right');

        sectionCards.innerHTML = "";
        cardsTitle.innerHTML = '<h1 class="heading-1">Risultati ricerca per</h1><h3 class="heading-3">Intero archivio</h3>';

        for(let i = 0; i < data.length; i++) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.innerHTML = '<div class="card__top"><div class="card__title">' + data[i].title + '</div><div class="card__composer"> ' + data[i].composer + ' </div></div><div class="card__bottom"><div class="card__year">Anno<span>' + data[i].year_of_composition + '</span></div><div class="card__duration">Durata<span>' + data[i].duration + '</span></div><div class="card__key">Tonalit&agrave;<span>' + data[i].key + '</span></div><a href="html/track.html?id=' + data[i]._id + '" class="btn btn--primary card__btn">Visualizza di più</a></div>';
            sectionCards.appendChild(card);
        }

        setTimeout(function() {
            cardsTitle.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        }, 750);

    });
});

searchBtn.addEventListener('click', () => {

    const txt = document.querySelector('.search__input-text');

    if(txt.value ==='') {
        return
    }

    const radio = document.getElementsByName('by');
    if(!radio[0].checked && !radio[1].checked) {
        return;
    }

    if(radio[0].checked) {
        fetch('https://classical-music-api.herokuapp.com/api/GET/tracks/' + txt.value)
        .then(result => {
            return result.json();
        })
        .then(data => {
            const cardsTitle = document.querySelector('#cards-title');
            const sectionCards = document.querySelector('#cards');
            const cardsLeft = document.querySelector('#cards-left');
            const cardsRight = document.querySelector('#cards-right');

            cardsTitle.setAttribute('class', 'cards__title');
            sectionCards.setAttribute('class', 'cards')
            cardsLeft.setAttribute('class', 'cards-left');
            cardsRight.setAttribute('class', 'cards-right');

            sectionCards.innerHTML = "";
            cardsTitle.innerHTML = '<h1 class="heading-1">Risultati ricerca per</h1><h3 class="heading-3">' + txt.value + '</h3>';

            txt.value = '';

            for(let i = 0; i < data.length; i++) {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');
                card.innerHTML = '<div class="card__top"><div class="card__title">' + data[i].title + '</div><div class="card__composer"> ' + data[i].composer + ' </div></div><div class="card__bottom"><div class="card__year">Anno<span>' + data[i].year_of_composition + '</span></div><div class="card__duration">Durata<span>' + data[i].duration + '</span></div><div class="card__key">Tonalit&agrave;<span>' + data[i].key + '</span></div><a href="html/track.html?id=' + data[i]._id + '" class="btn btn--primary card__btn">Visualizza di più</a></div>';
                sectionCards.appendChild(card);
            }

            setTimeout(function() {
                cardsTitle.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            }, 750);
        });    
    }
    else {
        fetch('https://classical-music-api.herokuapp.com/api/GET/composer/' + txt.value)
        .then(result => {
            return result.json();
        })
        .then(data => {
            const cardsTitle = document.querySelector('#cards-title');
            const sectionCards = document.querySelector('#cards');
            const cardsLeft = document.querySelector('#cards-left');
            const cardsRight = document.querySelector('#cards-right');

            cardsTitle.setAttribute('class', 'cards__title');
            sectionCards.setAttribute('class', 'cards')
            cardsLeft.setAttribute('class', 'cards-left');
            cardsRight.setAttribute('class', 'cards-right');

            sectionCards.innerHTML = "";
            cardsTitle.innerHTML = '<h1 class="heading-1">Risultati ricerca per</h1><h3 class="heading-3">' + txt.value + '</h3>';

            txt.value = '';

            for(let i = 0; i < data.length; i++) {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');
                card.innerHTML = '<div class="card__top"><div class="card__title">' + data[i].title + '</div><div class="card__composer"> ' + data[i].composer + ' </div></div><div class="card__bottom"><div class="card__year">Anno<span>' + data[i].year_of_composition + '</span></div><div class="card__duration">Durata<span>' + data[i].duration + '</span></div><div class="card__key">Tonalit&agrave;<span>' + data[i].key + '</span></div><a href="html/track.html?id=' + data[i]._id + '" class="btn btn--primary card__btn">Visualizza di più</a></div>';
                sectionCards.appendChild(card);
            }
            
            setTimeout(function() {
                cardsTitle.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            }, 750);
        });  
    }
 
});
