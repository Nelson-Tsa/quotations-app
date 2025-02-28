const form = document.querySelector('form');
const auteur = document.querySelector('#auteur');
const citation = document.querySelector('#citation');
let auteurValue = '';
let citationValue = '';
let quoteCount = 0;
let auteurStorage = localStorage.getItem('auteur');
let citationStorage = localStorage.getItem('citation');

const quoteList = [];


//recuperer le contenu des valeurs auteur et citation
form.addEventListener('submit', (e) => {
    e.preventDefault();
     auteurValue = auteur.value;
     citationValue = citation.value;
    addQuote(auteurValue, citationValue);
    form.reset();
    });

    function addQuote(auteur, citation) {
        const quote = document.createElement('div');
        quote.classList.add('quote');
        quote.innerHTML = `
        <p class="text">${citation}</p>
        <p class="author">${auteur}</p>
        `;
        document.querySelector('#quote-list').appendChild(quote);
        quoteCount += 1;
        document.querySelector('#nbCitations').textContent = quoteCount;
        localStorageSave(auteur, citation);

        

        quoteList.forEach((quote, index) => {
            const quoteDiv = document.createElement('div');
            index += 1;
            const nouvelleDiv = document.createElement('div');
            nouvelleDiv.classList.add('quote');
            nouvelleDiv.innerHTML = `
            <p class="text">${quote.citation}</p>
            <p class="author">${quote.auteur}</p>
            `;
            quoteDiv.appendChild(nouvelleDiv);
            quoteDiv.setAttribute('data-index', index);
            document.querySelector('#quote-list').appendChild(quoteDiv);
        });


    }

   function localStorageSave(auteur, citation) {
    localStorage.setItem('auteur', auteur);
    localStorage.setItem('citation', citation);
    quoteList.push({auteur, citation});
    localStorage.setItem('quoteList', JSON.stringify(quoteList));
    console.log(quoteList);
}

//ajouter les citations sauvegardées dans le quotelist

function addSavedQuotes() {
    if (auteurStorage && citationStorage) {
        addQuote(auteurStorage, citationStorage);
    }
    if (localStorage.getItem('quoteList')) {
        const quoteList = JSON.parse(localStorage.getItem('quoteList'));
        quoteList.forEach(quote => {
            addQuote(quote.auteur, quote.citation);
        });
    }
}

// ajouter des citations dans le tableau  en créant des index pour chaque citation







addSavedQuotes();

