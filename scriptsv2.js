$(document).ready(function() {

  //what does this do?
  // Added the Ace card to the statement
  var convert_value_to_string = function(value) {
    if (value === 1 || value > 10) {
      switch (value) {
        case 1:
        return 'A';
        break;
        case 11:
        return 'Jack';
        break;
        case 12:
        return 'Queen';
        break;
        case 13:
        return 'King';
        break;
      }
    }
    return value.toString();
  }

  //what does this do?
  var deck = [];
  var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  for (var i = 0; i<suits.length; i++) {
    var suit = suits[i];
    for (var j = 0; j<13; j++) {
      deck.push({number: j+1, suit: suit});
    }
  }
  
  //what does this do?
  var shuffle = function(array) { 
    var copy = [];
    var n = array.length; 
    var i; 
    while (n) { i = Math.floor(Math.random() * array.length);  
      if (i in array) { 
        copy.push(array[i]); 
        delete array[i]; 
        n--; 
      } 
    } 
    return copy; 
  }
  
  //Now call the shuffle function and save the result of what shuffle returns into your deck variable
  deck = shuffle(deck);

  var cards_player_1 = [];
  var cards_player_2 = [];
  
  // write a function called deal that will evently divide the deck up between the two players
  var deal = function(arr) {
    for(var i=0; i<arr.length; i++) {
      if (i % 2 === 0) {
        cards_player_1.push(arr[i]);
      } else {
        cards_player_2.push(arr[i]);
      }
    };
  }

  deal(deck);

  //create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
  var war = function(loc){
    
    if(cards_player_1[loc].number > cards_player_2[loc].number) {
      return "cards_player_1";
    } else if (cards_player_2[loc].number > cards_player_1[loc].number) {
      return "cards_player_2";
    } else {
      // It's a tie ... this means war!
      return false;
    }
    
  }
  
  //create a play function
    //compare the cards
    //give the winner both cards (at end of deck)
  var play = function(loc){
    
    // loc will almost always be 0 ... except for in times of war
    var winner = war(loc);

    if (winner) {
      // Remove the card(s) at play from each players deck
      var card_1 = cards_player_1.splice(0, loc + 1);
      var card_2 = cards_player_2.splice(0, loc + 1);
      
      // Determine who won and give that player the cards at play
      if (winner === "cards_player_1") {
        cards_player_1 = cards_player_1.concat(card_1, card_2);
      } else {
        cards_player_2 = cards_player_2.concat(card_1, card_2);
      }

    } else {
      // a tie occured ... change the loc and play again
      loc += 4;
      play(loc);
    }

    //this function (defined below) will continue to the next turn
    advance();
  }
  
  var advance = function(){
    //take the top two cards and display them
    if (cards_player_1.length) {
      var card_1 = cards_player_1[0];
      var card_2 = cards_player_2[0];
      $("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
      $("#opp-card-count").html(cards_player_1.length);
      $("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
      $("#my-card-count").html(cards_player_2.length);
      
    }
  }
  advance();
  
  $(".btn").click(function() {
    play(0);
  });
});