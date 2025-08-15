document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const randomQuote = document.getElementById('randomQuote');
    randomQuote.addEventListener('click', () => {
        document.querySelector('.quote').style.display = 'block';
        displayRandomQuote(quotes);
    });

    const newQuote = document.getElementById('addQuote');
    newQuote.addEventListener('click', () => {
        const displayQuote = document.querySelector('.quote');
        if (displayQuote.style.display === 'block') {
            displayQuote.style.display = 'none';
        }
        const form = document.querySelector('.add-quote');

        if (form.style.display === '' || form.style.display === 'none') {
            form.style.display = 'flex';
            return;
        }
    });

    const newestQuote = document.getElementById('newQuote');
    newestQuote.addEventListener('click', () => {
        showNewQuote(quotes);
    })
});

let quotes = [
    {
        category: "Quote",
        text: "Hello World"
    },
    {
        category: "Another quote",
        text: "Show me Love"
    }
];

function displayRandomQuote(quotes) {
    const form = document.querySelector('.add-quote');

    if (form.style.display === 'flex') {
        form.style.display = 'none';
        return;
    }

    if (quotes.length === 0) {
        document.querySelector('.category').textContent = 'Empty';
        document.querySelector('.category').style.color = 'red';
        document.querySelector('.quote-text').textContent = 'No quotes, Add atleast one quote!';
        return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    document.querySelector('.category').textContent = randomQuote.category;
    document.querySelector('.category').style.color = 'purple';
    document.querySelector('.quote-text').textContent = randomQuote.text;
}

function addQuote() {

    const category = document.getElementById('newQuoteCategory').value.trim();
    const text = document.getElementById('newQuoteText').value.trim();

    if (!category || !text) {
        alert("Please fill both fields!");
        console.log("Seen")
        return;
    }

    quotes.push({ category, text });
    alert("Quote added successfully!");
    document.getElementById("newQuoteCategory").value = "";
    document.getElementById("newQuoteText").value = "";
}

function createAddQuoteForm() {

    const quoteObject = {
        category: newQuote.category,
        text: newQuote.text
    };

    quotes.push(quoteObject);
}

function showNewQuote(quotes) {
    const form = document.querySelector('.add-quote');

    if (form.style.display === 'flex') {
        form.style.display = 'none';
        document.querySelector('.quote').style.display = 'flex';
    }

    if (quotes.length === 0) {
        document.querySelector('.category').textContent = 'Empty';
        document.querySelector('.category').style.color = 'red';
        document.querySelector('.quote-text').textContent = 'No quotes, Add atleast one quote!';
        return;
    }

    const newQuote = quotes[quotes.length - 1];

    document.querySelector('.category').textContent = newQuote.category;
    document.querySelector('.category').style.color = 'purple';
    document.querySelector('.quote-text').textContent = newQuote.text;
}