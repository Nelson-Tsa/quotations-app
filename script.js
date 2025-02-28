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

    //ajouter une citation
    function addQuote(auteur, citation) {
        const quote = document.createElement('div');
        quote.classList.add('quote');
        quote.innerHTML = `
        <p class="text">"${citation}"</p>
        <p class="author">${auteur}</p>
        `;
        document.querySelector('#quote-list').appendChild(quote);
        quoteCount += 1;
        document.querySelector('#nbCitations').textContent = quoteCount;
        localStorageSave(auteur, citation);
        
    }

    //sauvegarder dans le local storage
    function localStorageSave(auteur, citation) {
   
        quoteList.push({auteur, citation});
        localStorage.setItem('quoteList', JSON.stringify(quoteList));
        console.log(quoteList);
    }

//ajouter les citations sauvegardées dans le quotelist
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

    //addSavedQuotes();

    function clearLocalStorage() {
        localStorage.clear();
        location.reload();
    }
    
    boutton = document.querySelector('#delete');
    boutton.addEventListener('click', clearLocalStorage);
    
   //clearLocalStorage();

   // charger les citations sauvegardées au demarrage
   function loadStorage() {
    loadStorage = localStorage.getItem('quoteList');
    if (loadStorage) {
        quoteList = JSON.parse(loadStorage);
        quoteCount = 0;
    }
    quoteList.forEach(quote => {
        document.querySelector('#quote-list').innerHTML += `
        <div class="quote">
        <p class="text">"${quote.citation}"</p>
        <p class="author">${quote.auteur}</p>
        </div>
        `;
        document.querySelector('#nbCitations').textContent = quoteList.length;
    });
}
loadStorage();