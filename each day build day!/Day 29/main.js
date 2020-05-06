

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
    .then(data=>console.log(data))
    .then(err=>console.log(err))
    isLoding = false;
//reset the search bar
}

function displayArticles(articles){

}

function displayLoadingSpinner(){

   if(isLoding)console.log('display spinner')
}

