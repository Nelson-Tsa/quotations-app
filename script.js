const form = document.querySelector('form');
const auteur = document.querySelector('#auteur');
const citation = document.querySelector('#citation');
let auteurValue = '';
let citationValue = '';
let quoteList = [];
let quoteCount = 0;

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
        
    }

    function localStorageSave(auteur, citation) {
        let listeSave = localStorage.getItem('quoteList', JSON.stringify(quoteList));
       
        quoteList = JSON.parse(listeSave);
        quoteList.push({auteur, citation});
        localStorage.setItem('quoteList', JSON.stringify(quoteList));
        console.log(quoteList);
    }


    function addSavedQuotes() {
        const savedQuotes = localStorage.getItem('quoteList');
        if (savedQuotes) {
            quoteList = JSON.parse(savedQuotes);
            quoteCount = 0;
        }
        quoteList.forEach(quote => {
            addQuote(quote.auteur, quote.citation);
        });
    }

    addSavedQuotes();

    function clearLocalStorage() {
        localStorage.clear();
        location.reload();
    }
    
    boutton = document.querySelector('#delete');
    boutton.addEventListener('click', clearLocalStorage);