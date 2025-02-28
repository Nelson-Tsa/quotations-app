const form = document.querySelector('form');
const auteur = document.querySelector('#auteur');
const citation = document.querySelector('#citation');
let auteurValue = '';
let citationValue = '';
let quoteList = [];
let quoteCount = 0;
const boutton = document.querySelector('#delete');

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


    function clearLocalStorage() {
        localStorage.clear();
        location.reload();
    }
    
    
    boutton.addEventListener('click', clearLocalStorage);
    

   // charger les citations sauvegardées au demarrage
   function loadStorage() {
   const donneesSauvegarde = localStorage.getItem('quoteList');
    if (donneesSauvegarde) {
        quoteList = JSON.parse(donneesSauvegarde);
    }
    quoteList.forEach(quote => {
        document.querySelector('#quote-list').innerHTML += `
        <div>
        <p class="text">"${quote.citation}"</p>
        <p class="author">${quote.auteur}</p>
        </div>
        `;
        document.querySelector('#nbCitations').textContent = quoteList.length;
    });
}

loadStorage();