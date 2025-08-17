document.addEventListener('DOMContentLoaded', () => {

    loadQuotes();
    populateCategories();

    const randomQuoteBtn = document.getElementById('randomQuote');
    const newQuoteBtn = document.getElementById('addQuote');
    const quoteContainer = document.querySelector('.quote');
    const addQuoteForm = document.querySelector('.add-quote');
    const formButton = addQuoteForm.querySelector('button');
    const exportQuotesButton = document.getElementById('exportQuotes');

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

    exportQuotesButton.addEventListener('click', exportQuotesToJSONFile);
});

let quotes = [];

function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");

    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [];
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

function exportQuotesToJSONFile() {

    const data = localStorage.getItem("quotes");

    const blob = new Blob([data], {
        type: 'application/json'
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert('Quotes imported successfully!');
    };

    if (event.target.files.length > 0) {
        fileReader.readAsText(event.target.files[0]);
    }
}

function populateCategories() {
    const quotes = JSON.parse(localStorage.getItem("quotes"));

    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    quotes.forEach(quote => {
        const option = document.createElement('option');
        option.value = quote.category;
        option.textContent = quote.category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

    let filteredQuotes = quotes;

    if (selectedCategory !== "all") {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    const container = document.querySelector('.quote');
    container.innerHTML = "";

    if (filteredQuotes.length > 0) {
        filteredQuotes.forEach(q => {
            if (selectedCategory === "all") {
                // Show ONLY the quote text
                const textElement = document.createElement('p');
                textElement.classList.add('quote-text');
                textElement.textContent = q.text;

                container.appendChild(textElement);
            } else {
                const categoryElement = document.createElement('h4');
                categoryElement.classList.add('category');
                categoryElement.style.color = 'purple';
                categoryElement.textContent = q.category;

                const textElement = document.createElement('p');
                textElement.classList.add('quote-text');
                textElement.textContent = q.text;

                container.appendChild(categoryElement);
                container.appendChild(textElement);
            }
        });

        container.style.display = 'block';
    }
}

