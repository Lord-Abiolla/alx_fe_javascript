document.addEventListener('DOMContentLoaded', () => {

    loadQuotes();

    const randomQuoteBtn = document.getElementById('randomQuote');
    const newQuoteBtn = document.getElementById('addQuote');
    const quoteContainer = document.querySelector('.quote');
    const addQuoteForm = document.querySelector('.add-quote');
    const formButton = addQuoteForm.querySelector('button');

    randomQuoteBtn.addEventListener('click', () => {
        quoteContainer.style.display = 'block';
        showRandomQuote(quotes);
    });

    newQuoteBtn.addEventListener('click', () => {
        quoteContainer.style.display = 'none';
        createAddQuoteForm();
    });

    formButton.addEventListener('click', (e) => {
        e.preventDefault();
        addQuote();
    });
});

let quotes = [];

function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");

    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quote = [];
    }
}

function createAddQuoteForm() {
    const addQuoteForm = document.querySelector('.add-quote');
    addQuoteForm.style.display = 'flex';
}

function showRandomQuote(quotes) {
    const form = document.querySelector('.add-quote');
    if (form.style.display === 'flex') {
        form.style.display = 'none';
    }

    if (quotes.length === 0) {
        document.querySelector('.category').textContent = 'Empty';
        document.querySelector('.category').style.color = 'red';
        document.querySelector('.quote-text').textContent = 'No quotes, Add at least one quote!';
        return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector('.category').textContent = randomQuote.category;
    document.querySelector('.category').style.color = 'purple';
    document.querySelector('.quote-text').textContent = randomQuote.text;
}

function addQuote() {
    const form = document.querySelector('.add-quote');
    const quoteContainer = document.querySelector('.quote');

    const category = document.getElementById('newQuoteCategory').value.trim();
    const text = document.getElementById('newQuoteText').value.trim();

    if (!category || !text) {
        alert("Please fill both fields!");
        return;
    }

    const newQuote = { category, text };
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));

    quoteContainer.innerHTML = '';

    const categoryElement = document.createElement('h4');
    categoryElement.classList.add('category');
    categoryElement.style.color = 'purple';
    categoryElement.textContent = newQuote.category;

    const textElement = document.createElement('p');
    textElement.classList.add('quote-text');
    textElement.textContent = newQuote.text;

    quoteContainer.appendChild(categoryElement);
    quoteContainer.appendChild(textElement);

    form.style.display = 'none';
    quoteContainer.style.display = 'block';

    document.getElementById("newQuoteCategory").value = "";
    document.getElementById("newQuoteText").value = "";
}
