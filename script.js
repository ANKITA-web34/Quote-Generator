const quoteConatiner = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authourText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuotesBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loader
function loading() {
  loader.hidden = false;
  quoteConatiner.hidden = true;
}

//Hide loader
function complete() {
  quoteConatiner.hidden = false;
  loader.hidden = true;
}

//show new quotes--
function newQuote() {
  loading();

  //pick a random quotes form api
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Checking author field
  if (!quote.author) {
    authourText.textContent = "Unkonwn";
  } else {
    authourText.textContent = quote.author;
  }
  //Quotes length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-qoute");
  } else {
    quoteText.classList.remove("long-qoute");
  }
  //set quote and hide loader
  quoteText.textContent = quote.text;
  complete();
}

//Get quotes from api--
async function getQuotes() {
  loading();

  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}

//tweet quotes
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authourText.textContent}`;
  window.open(tweetUrl, "_blank");
}

//events
newQuotesBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();
