//VIDEO
const params = new URL(location).searchParams;
const dbId = params.get('id');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

if(sessionStorage.getItem('name')) {
    const user = document.querySelector('.navbar__user');
    user.textContent = sessionStorage.getItem('name') + ' ' + sessionStorage.getItem('surname');

    const log = document.querySelector('#log');
    const signup = document.querySelector('#signup');
    
    signup.style.display = 'none';
    log.innerHTML = 'Log Out';
    log.setAttribute('href', './track.html?id=' + dbId);
    log.addEventListener('click', () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('surname');
        sessionStorage.removeItem('token');
    });
}

fetch('https://classical-music-api.herokuapp.com/api/GET/id/' + dbId)
.then(result => {
    return result.json();
})
.then(data => {
    const videoParams = new URL(data.video).searchParams;
    const ID = videoParams.get('v')

    const year = document.querySelector('#year');
    const duration = document.querySelector('#duration');
    const key = document.querySelector('#key');
    const title = document.querySelector('.track__heading-1');
    const composer = document.querySelector('.track__heading-3');
    const by = document.querySelector('#by');
    const on = document.querySelector('#on');
    const downloadBtn = document.querySelector('.pdf__btn');
    const pageTitle = document.querySelector('head title');

    pageTitle.textContent = capitalizeFirstLetter(data.composer) + ' - ' + capitalizeFirstLetter(data.title);
    title.textContent = data.title;
    composer.textContent = data.composer;
    year.textContent = data.year_of_composition;
    duration.textContent = data.duration;
    key.textContent = data.key;
    by.textContent = data.posted_by;
    on.textContent = data.post_date;
    downloadBtn.setAttribute('href', data.music_sheet)

    function youtubeIframe() {
        const iframe = document.createElement('iframe');
        const div = document.querySelector('.video__youtube');
        iframe.setAttribute(
        'src',
        'https://www.youtube.com/embed/' + ID + '?rel=0'
        );
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
        'allow',
        'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        );
        div.appendChild(iframe);
    }

    document.addEventListener('DOMContentLoaded', youtubeIframe())

    //PDF
    const url = data.music_sheet;

    let pdfDoc = null; 
    let pageNum = 1;
    let pageIsRendering = false; // ci dice se il pdf sta renderizzando
    let pageNumIsPending = null; // se fetching più pagine

    const scale = 1;
    const canvas = document.querySelector('#pdf-render');
    const ctx = canvas.getContext('2d');

    //Render the page
    const renderPage = num => {
        pageIsRendering = true; //perchè nel processo di rendering

        //get page
        pdfDoc.getPage(num).then(page => {
            //console.log(page)

            //set scale
            const viewport = page.getViewport({scale}); //stessa cosa di scale: scale
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderCtx = {
                canvasContext: ctx,
                viewport: viewport
            }

            page.render(renderCtx).promise.then(() => {
                pageIsRendering = false;

                if(pageNumIsPending !== null) {
                    renderPage(pageNumIsPending);
                    pageNumIsPending = null;
                }
            });

            //output current page
            document.querySelector('#page-num').textContent = num;
        });
    };

    //check for pages rendering
    const queueRenderPage = num => {
        if(pageIsRendering) {
            pageNumIsPending = num;
        }
        else {
            renderPage(num);
        } 
    }

    //Show prev page
    const showPrevPage = () => {
        if(pageNum <= 1) { // perchè non ci sono pagine prima ovviamente
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }

    //Show Next page
    const showNextPage = () => {
        if(pageNum >= pdfDoc.numPages) { // perchè non ci sono pagine prima ovviamente
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }

    //Get document
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => { //accedo al pdf
        pdfDoc = pdfDoc_;
        //console.log(pdfDoc);
        document.querySelector('#page-count').textContent = pdfDoc.numPages; // stampo le pagine totali del pdf
        renderPage(pageNum);
    });

    //buttons events

    document.querySelector('#prev-page').addEventListener('click', showPrevPage)
    document.querySelector('#next-page').addEventListener('click', showNextPage)
});

