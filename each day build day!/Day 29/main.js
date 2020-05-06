

let isLoding = false;

function getTheArticle(){
    const input = document.querySelector('.search__input').value
    console.log(input)
     keywords = input.trim();
     number = 2; 
     limit = 10;
    const searchArticleUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srlimit=${limit}&srsearch=${keywords}&sroffset=${number}`;

    isLoding = true;
    fetch(searchArticleUrl)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        const articles = data.query.search;
        displayArticles(articles);
    })
    .then(err=>console.log(err))
    isLoding = false;
//reset the search bar
}

function displayArticles(articles){

    // Store a reference to `.searchResults`
  const searchResults = document.querySelector('.searchResults');
  // Remove all child elements
  searchResults.innerHTML = '';

  // Loop over results array
  articles.forEach(article => {
   const url = encodeURI(`https://en.wikipedia.org/wiki/${article.title}`);

   searchResults.insertAdjacentHTML('beforeend',
      `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${article.title}</a>
        </h3>
        <span class="resultItem-snippet">${article.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
    );
  });
}


function displayLoadingSpinner(){

   if(isLoding)console.log('display spinner')
}

