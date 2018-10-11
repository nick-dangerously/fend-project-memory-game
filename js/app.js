/*
 * Create a list that holds all of your cards
 */

 // To make it easy to swap out images
 const image1 = "fa fa-anchor";
 const image2 = "fa fa-bolt";
 const image3 = "fa fa-cube";
 const image4 = "fa fa-leaf";
 const image5 = "fa fa-bicycle";
 const image6 = "fa fa-diamond" ;
 const image7 = "fa fa-bomb"
 const image8 = "fa fa-paper-plane-o";
 
 
  let deck = [image1, image1, image2, image2, image3, image3, image4, image4, 
     image5, image5, image6, image6, image7, image7, image8, image8];
 
 /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */
 
 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;
 
     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }
 
     return array;
 }
 
 function makeCard(image) {
     card = document.createElement('li');
     card.className = 'card';
     symbol = document.createElement('i')
     symbol.className = image;
     card.appendChild(symbol);
     document.querySelector('.deck').appendChild(card);
 }
 
 shuffled_deck = shuffle(deck);
 shuffled_deck.forEach(element => {
     makeCard(element);
 });
 
 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */
 

function showCard(card) {
    // Make sure the card is not already open
    if (!(card.className.includes('open'))) {
        card.className = 'card open show';
        matchedCards(card);    
    } 
}

function resetCards() {
    // Reset cards
    cardMatches = [];
    resetCardList = document.querySelectorAll('.card');
    resetCardList.forEach(element => {
        if (element.className.includes('locked')) {
            console.log('boop');
        } else {
            element.className = 'card';
        }
    })
}

function resetGame() {
    let CardList = document.querySelectorAll('.card');
    CardList.forEach (element => {
    //    console.log(element);
        element.remove();
    })
    shuffled_deck = shuffle(deck);
    shuffled_deck.forEach(element => {
        makeCard(element);
    })
}

let cardMatches = [];
function matchedCards(card) {

    symbol = card.firstChild.className;
    cardMatches.push(symbol);
    console.log(cardMatches);
    if (cardMatches.length > 1) {
        // To force the equality operator to work
        let symbolText0 = cardMatches[0];
        let symboltext1 = cardMatches[1];

        if (symbolText0 === symboltext1) {
            // Great - lock open
            console.log(symbol);
            console.log(cardMatches);
            console.log("It's a match!");
            
            // let matches = document.getElementsByClassName(symbol);
            // matches.forEach(element => {
            //     element.ParentElement.className += ' `locked';
            // });

            // Can't use .foreach method on HTMLcollecton returned by getElementsByClassName
            // for (let element of matches) {
            //     element.ParentElement.className += ' `locked';
            //     // However HTMLCollections can't seem to access their parents.
            // }

            FASymbol = symbol.split(" ")[1];
            matches = document.querySelectorAll("." + FASymbol);
            console.log(matches);
            // matches.forEach(element => {
            //     console.log("The element is: " + element);
            //     console.log("The parent element is: " + element.ParentElement);
            //     element.ParentElement.className += ' locked';
            // });

            // // Doesn't get the parent element
            // matches.forEach(function(currentValue) {
            //     console.log("The element is: " + currentValue);
            //     console.log("The parent element is: " + currentValue.ParentElement);
            // })

            // Adds the locked class to the card element
            let match1 = matches[0];
            let match2 = matches[1];
            console.log("The element is: " + match1);
            console.log("The parent element is: " + match1.parentElement);
            match1.parentElement.className += ' locked';
            match2.parentElement.className += ' locked';

            
        cardMatches = [];

        } else {
            setTimeout(function(){ resetCards(); }, 1000);
        }
    }
}
  
const htmlDeck = document.querySelector('.deck')
htmlDeck.addEventListener('click', function(event) {
    // console.log(event.target.nodeName)
    // Only run if the card and not the font awesome <i> is clicked 
    if (event.target.nodeName === 'LI') {
        showCard(event.target);
    }
});

const resetButton = document.querySelector('.restart')
// resetButton.addEventListener('click', resetGame());
resetButton.addEventListener('click', function() {
    resetGame();
});