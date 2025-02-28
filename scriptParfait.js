const form = document.querySelector('form');
const auteur = document.querySelector('#auteur');
const citation = document.querySelector('#citation');
let auteurValue = '';
let citationValue = '';
let quoteCount = 0;
let quoteList = [];

// Récupérer le contenu des valeurs auteur et citation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    auteurValue = auteur.value;
    citationValue = citation.value;
    addQuote(auteurValue, citationValue, true); // true indique qu'il faut sauvegarder dans localStorage
    form.reset();
});

function addQuote(auteur, citation, saveToStorage = false) {
    const quote = document.createElement('div');
    quote.classList.add('quote');
    quote.innerHTML = `
    <p class="text">${citation}</p>
    <p class="author">${auteur}</p>
    `;
    document.querySelector('#quote-list').appendChild(quote);
    quoteCount += 1;
    document.querySelector('#nbCitations').textContent = quoteCount;
    
    if (saveToStorage) {
        localStorageSave(auteur, citation);
    }
}

function localStorageSave(auteur, citation) {
    // Récupérer la liste existante ou créer une nouvelle liste
    let savedQuotes = localStorage.getItem('quoteList');
    if (savedQuotes) {
        quoteList = JSON.parse(savedQuotes);
    }
    
    // Ajouter la nouvelle citation
    quoteList.push({auteur, citation});
    
    // Sauvegarder la liste mise à jour
    localStorage.setItem('quoteList', JSON.stringify(quoteList));
    console.log(quoteList);
}

// Ajouter les citations sauvegardées dans le quotelist
function addSavedQuotes() {
    // Récupérer la liste des citations depuis localStorage
    const savedQuotes = localStorage.getItem('quoteList');
    
    if (savedQuotes) {
        quoteList = JSON.parse(savedQuotes);
        
        // Réinitialiser le compteur
        quoteCount = 0;
        
        // Ajouter chaque citation au DOM sans la sauvegarder à nouveau
        quoteList.forEach(quote => {
            addQuote(quote.auteur, quote.citation, false);
        });
    }
}

// Charger les citations sauvegardées au démarrage
addSavedQuotes();

function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

boutton = document.querySelector('#delete');
boutton.addEventListener('click', clearLocalStorage);

//clearLocalStorage();