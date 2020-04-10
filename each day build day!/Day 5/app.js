document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
          name: 'audi',
          img: 'icons/audi-11.svg'
        },
        {
          name: 'bentley',
          img: 'icons/bentley.svg'
        },
        {
          name: 'bmw',
          img: 'icons/bmw.svg'
        },
        {
          name: 'maserati',
          img: 'icons/maserati.svg'
        },
        {
          name: 'benz',
          img: 'icons/mebenz.svg'
        },
        {
          name: 'royal-enfield',
          img: 'icons/re.svg'
        },
        {
          name: 'tata',
          img: 'icons/tata-motors.svg'
        },
        {
          name: 'tesla-motors',
          img: 'icons/tesla-motors-1.svg'
        },
        
        {
            name: 'audi',
            img: 'icons/audi-11.svg'
          },
          {
            name: 'bentley',
            img: 'icons/bentley.svg'
          },
          {
            name: 'bmw',
            img: 'icons/bmw.svg'
          },
          {
            name: 'maserati',
            img: 'icons/maserati.svg'
          },
          {
            name: 'benz',
            img: 'icons/mebenz.svg'
          },
          {
            name: 'royal-enfield',
            img: 'icons/re.svg'
          },
          {
            name: 'tata',
            img: 'icons/tata-motors.svg'
          },
          {
            name: 'tesla-motors',
            img: 'icons/tesla-motors-1.svg'
          },

      ]
      //cardArray.copyWithin(0,0);
      console.log('cards',cardArray)
    
      cardArray.sort(() => 0.5 - Math.random())
      console.log('cards',cardArray)


  const grid = document.querySelector('.grid')
  const showResult = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenId = []
  const matchedCards = [] || 0;
  let totalTries = 0;
      //create the playing 🎬
      //add img src data-id and append it to parent div 
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img')
      card.setAttribute('src', 'icons/blank.svg')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //flip card 
  //get the id , add it to array, change src from blank to img
  function flipCard(){
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img)
      if(cardsChosen.length == 2){
          //check for macthes 🕎 
            setTimeout(checkForMatch,600);
        }
  }

  //check for match 👨‍💻 
  //its a match when two cards in the cardChoosen array are the same, here js reference to same objec so..
  //its a victory if cardswon length == half the length
  function checkForMatch(){
      let cards = document.querySelectorAll('img')
    const h3 = document.querySelector('h3');
      const selectCardOneId = cardsChosenId[0];
      const selectCardTwoId = cardsChosenId[1];

      //deep equality
      if(cardsChosen[0] === cardsChosen[1]){
        alert('Its a match');
        //remove the card (mark them cross)
        cards[selectCardOneId].setAttribute('src','icons/cross.svg');
        cards[selectCardTwoId].setAttribute('src','icons/cross.svg');
        //cards[selectCardOneId].removeEventListener();
        //cards[selectCardTwoId].removeEventListener();
        //add to macthedCards
        matchedCards.push(cardsChosen);
    }else{
        cards[selectCardOneId].setAttribute('src','icons/blank.svg');
        cards[selectCardTwoId].setAttribute('src','icons/blank.svg');
        totalTries++;
        alert('oops! try again')
    }
    //reset the arrays
    cardsChosen = []
    cardsChosenId = []

    showResult.textContent = matchedCards.length;
    if(matchedCards.length === cardArray.length/2){
        h3.textContent =`Yay! 🎉`;
        showResult.textContent = ` Congratulations! You macthed them all! Total tries : ${totalTries}`
    }

}


  createBoard();
})    