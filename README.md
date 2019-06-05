# vanilla javascript blackjack

this project's goal is to write blackjack in short, clear vanilla javascript

react's (state => render => ... setState => state) pattern is used, as it is great.


## getting started

linux: open a command line (ctrl + alt + t)

max: open the `terminal` program

windows: open the `git bash` program, [available here with git](https://www.google.com/search?q=git+windows)


navigate to your `~/code` directory

`$ cd code`

create a project directory

`$ mkdir blackjack`

`$ cd blackjack`

and make some empty files to write code into

`$ touch index.html`

`$ touch index.js`

`$ touch index.css`


copy some test text into `index.html`

then open the html file in your browser


## main development

to start, let's write our boilerplate html

<sub>index.html</sub>
```html
<html>
  <head>
    <title>BlackJack!</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    BlackJack!
    <script type="text/javascript" src="index.js"></script>
  </body>
</html>
```
now if we refresh the browser tab, we'll see our test text on the screen!


### drawing a table

let's get our feet wet by writing some HTML & CSS!

first we need some `<div>`s to attach our style to

<sub>index.html</sub>
```html
...

  <body>
    <div class="table">
      <div class="dealer hand"></div>
      <div class="player hand"></div>
    </div>
    
    <script type="text/javascript" src="index.js"></script>
  </body>

...
```

we'll use the `<div class="player hand"></div>` later to `render` the player's cards into

(similarly with `dealer`)


now we can write the CSS to make the `<div class="table"></div>` look like a blackjack table

first we'll size the `<div>`

<sub>index.css</sub>
```css
.table {
  margin-left: 5vw;
  width: 90vw;
  height: 80vh;

  position: relative;
}
```

second, we'll use an `:after` pseudo element and a CSS `border-radius` trick to make the curved shape

<sub>index.css</sub>
```css
.table::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: #4b4;
  
  border-radius: 100%;
  border-top: none;
  border-bottom: 5px solid black;
}
```

that gives us an ellipse... what we really want is to just get the bottom half of that

we can do this by stretching the `:after` element height-wise and cropping using `overflow: hidden` on the parent element

<sub>index.css</sub>
```css
.table {
  //... what we had before
  
  overflow: hidden;
}

.table::after {
  //... what we had before
  
  left: 0;
  top: -90%;
  width: 100%;
  height: 180%;

  //... what we had before
}
```

many tricks like this exist in CSS, learning them just takes time!


### drawing the hands

There are many ways to draw playing cards, today we'll use Unicode card strings.

you can copy paste the cards from here - in a bigger project we might import something like this from a 3rd party library

<sub>index.js</sub>
```js
const cards = [
  ['\uD83C\uDCA1','\uD83C\uDCB1','\uD83C\uDCC1','\uD83C\uDCD1'],
  ['\uD83C\uDCA2','\uD83C\uDCB2','\uD83C\uDCC2','\uD83C\uDCD2'],
  ['\uD83C\uDCA3','\uD83C\uDCB3','\uD83C\uDCC3','\uD83C\uDCD3'],
  ['\uD83C\uDCA4','\uD83C\uDCB4','\uD83C\uDCC4','\uD83C\uDCD4'],
  ['\uD83C\uDCA5','\uD83C\uDCB5','\uD83C\uDCC5','\uD83C\uDCD5'],
  ['\uD83C\uDCA6','\uD83C\uDCB6','\uD83C\uDCC6','\uD83C\uDCD6'],
  ['\uD83C\uDCA7','\uD83C\uDCB7','\uD83C\uDCC7','\uD83C\uDCD7'],
  ['\uD83C\uDCA8','\uD83C\uDCB8','\uD83C\uDCC8','\uD83C\uDCD8'],
  ['\uD83C\uDCA9','\uD83C\uDCB9','\uD83C\uDCC9','\uD83C\uDCD9'],
  ['\uD83C\uDCAA','\uD83C\uDCBA','\uD83C\uDCCA','\uD83C\uDCDA'],
  ['\uD83C\uDCAB','\uD83C\uDCBB','\uD83C\uDCCB','\uD83C\uDCDB'],
  ['\uD83C\uDCAD','\uD83C\uDCBD','\uD83C\uDCCD','\uD83C\uDCDD'],
  ['\uD83C\uDCAE','\uD83C\uDCBE','\uD83C\uDCCE','\uD83C\uDCDE'],
];
```

now we'll we able to get a unicode character representing a card by writing

```js
const rank = 0; // 0 means Ace, 12 means King
const suit = 0; // 0 = clubs, 1 = diamonds, 2 = hearts, 3 = spades

const card = cards[rank][suit];

console.log(card);
```

into the console.


Let's draw some cards into the front end and see how they look

<sub>index.js</sub>
```js
//... what we had before

onload = ()=> {
  render = ()=>{
    document.querySelector('.player').innerHTML =
      cards[0][3] + ' ' + cards[12][2];
      
    document.querySelector('.dealer').innerHTML =
      cards[0][0] + ' ' + cards[8][1];
  }

  render();
};

```


`onload` will always run when the page finishes loading

`render` will be the function we use to update what the user sees

`render()` tells the `render` function to run right away.

we'll need to apply some CSS to the `.hand`s to get them to be drawn on top of the `.table`

<sub>index.css</sub>
```css
//... what we had before

.hand {
  position: absolute;
  left: 0;
  width: 100%;

  text-align: center;

  z-index: 10;

  color: black;
  font-weight: 700;
  font-size: 40px;
}

.dealer {
  top: 10px;
}

.player {
  bottom: 20vh;
}
```

now that we have a hand displaying, we can `Inspect Element` (right click the cards) to see how the CSS works

by hovering `<div class="hand">` in the `Elements` panel, we can see it highlight blue translucent in the view

we see it has the same `width` as the `.table` (it should... `width: 100%` on the `.hand` and `position: relative` on the `.table`)

then `text-align: center` is positioning the cards in the middle for us. This works because our cards are actually considered text by the browser!

unfortunately, we won't be able to get away with this if we add more players... for now though this will do!


### state, render, setState

To make a real game, we'll need to be able to deal new cards and update the view to reflect the new cards.

That is to say, we'll need to keep the cards (for `player` and `dealer`) in a variable, and call our `render` function when they change.

There's many ways to do this, so we can choose the pattern we want to follow. The most popular right now is the (state, render, setState) pattern from ReactJS, so we'll write our own simpler version of that here now.

First we'll initialize all of our data (hands) in a variable called `state`

<sub>index.js</sub>
```js
//... what we had before

onload = ()=>{
  state = {
    player: [ { rank: 0, suit: 3 }, { rank: 12, suit: 2 } ],
    dealer: [ { rank: 0, suit: 0 } ],
  }

  //... what we had before
};
```

so now we can render the cards from the `state`

<sub>index.js</sub>
```js
//...

onload = ()=>{
  //...

  render = ()=>{
    document.querySelector('.dealer').innerHTML =
      cards[ state.dealer[0].rank ][ state.dealer[0].suit ];

    document.querySelector('.player').innerHTML =
      cards[ state.player[0].rank ][ state.player[0].suit ] + ' ' +
      cards[ state.player[1].rank ][ state.player[1].suit ];
  }

  render();
}
```

so that covers `state` and `render` from our pattern... now we need `setState`

`setState` will be a function that updates `state` and calls `render`

we will never change `state` directly, that way we know that every time we change it with `setState` we will be sure the view is updated

<sub>index.js</sub>
```js
//...

onload = ()=>{
  state = {
    //...
  }

  setState = (nextState)=>{
    state = { ...state, ...nextState }
    render();
  }

  render = ()=>{
    //...
  }

  render();
}
```

using [object spread notation](https://stackoverflow.com/questions/32925460/object-spread-vs-object-assign) we can merge any `nextState` object onto our existing `state`

this will allow us to pass objects into `setState` with any subset of the variables inside `state` to override, without effecting the others.

Great! now let's use out `setState` function to deal a new hand

<sub>index.js</sub>
```js
//...

onload = ()=>{
  state = {
    //...
  }

  setState = (nextState)=>{
    state = { ...state, ...nextState }
    render();
  }

  deal = ()=>{
    setState({
      player: [ { rank: 1, suit: 3 }, { rank: 11, suit: 1 } ],
      dealer: [ { rank: 7, suit: 2 } ],
    })
  }

  render = ()=>{
    //...
  }

  render();
}
```

and a button to trigger it

<sub>index.html</sub>
```html
...
  <body>
    <div class="table">
      <div class="dealer hand"></div>
      <div class="player hand"></div>
    </div>
    <button onclick="deal()">Deal!</button>
    
    <script type="text/javascript" src="index.js"></script>
  </body>

```


### dealing hands

Until now, we've been setting the same cards every time. In real blackjack of course, the cards are selected randomly!

Let's write a utility function which picks a random card to use when we want to deal

<sub>index.js</sub>
```js
//... above the onload function

const dealCard = ()=>({
  rank: Math.floor( Math.random()*13 ),
  suit: Math.floor( Math.random()*4 ),
});

//... onload, etc, mainly etc.
```

now we can use it in our `deal` function to generate random cards

<sub>index.js</sub>
```js
//...

  deal = ()=>{
    setState({
      player: [ dealCard(), dealCard() ],
      dealer: [ dealCard() ],
    })
  }

//...
```

now we can deal as many new hands as we want!


we should also set the initial hand to be randomized

<sub>index.js</sub>
```js
//...

onload = ()=> {
  state = {
    player: [ dealCard(), dealCard() ],
    dealer: [ dealCard() ],
  }
  
  //...
```

### hitting

our players are going to want more cards sometimes

let's write a `hit` function to append a new card to the end of the player hand

we'll need to use `setState` to store a new value for `state.player` which is the old array with one more card at the end

<sub>index.js</sub>
```js
//...

  hit = ()=>{
    setState({
      player: [...state.player, dealCard()],
    })
  }

//...
```

and of course we'll need a button to click to call the `hit` function

<sub>index.html</sub>
```html
//... above the script tag at the bottom of the body

      <button onclick="hit()">Hit me!</button>

//...
```

where's the new cards?

we need to render them! earlier, we only programmed the `render` function to draw two cards

now we need to make it for for any number of cards (we may as well do so also for the dealer now too)

<sub>index.js</sub>
```js
//...
  render = ()=>{
    document.querySelector('.player').innerHTML =
      state.player.reduce(( html, card )=>
        html + cards[card.rank][card.suit] + ' ', '');

    document.querySelector('.dealer').innerHTML =
      state.dealer.reduce(( html, card )=>
        html + cards[card.rank][card.suit] + ' ', '');
  }
//...
```

[read up on Array.reduce, one of the most powerful functions in the world](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)


ahh, but now the user can keep hitting to infinity! we should really do something about that.


#### calculateTotal

We'll want to know the card totals to tell when the player busts the hand.


We'll write a utility function to calculate the total for a given hand


quickly, let's review how to count in blackjack

```
J, Q, K worth 10

2-10 worth the number on the card

A is worth 11 unless that busts the hand, then it's worth 1.
```

or in javascript:

<sub>index.js</sub>
```js
//...

const calculateTotal = (hand)=>{
  const hasAce = !!hand.find(card => card.rank === 0);
  const naiveTotal = hand.reduce((runningTotal, card)=>
    runningTotal + Math.min(10, card.rank + 1), 0);

  return (hasAce && naiveTotal <= 11) ? naiveTotal + 10 : naiveTotal;
}

//...
```

ok, that's quite a bit. Let's unpack that

```js
  const hasAce = !!hand.find(card => card.rank === 0);
```

hand is an array of cards like `{ rank, suit }`, so we can use [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) to find the first Ace in the hand.

why do we have that double bang `!!` in front?

because `.find` returns the object that it finds or `null`. We're just calculating if there's an Ace or not (which is a true / false ie Boolean value)

`!!` is one way to cast to Boolean in js.


```js
  const naiveTotal = hand.reduce((runningTotal, card)=>
    runningTotal + Math.min(10, card.rank + 1), 0);
```

`.reduce` functions are like `(runningTotal, currentItemFromArray) => return nextRunningTotal`

so here, we start the reducer at `0`, and for each item in the array (`hand`), we add this expression `Math.min(10, card.rank + 1)`

```js
Math.min(10, card.rank + 1)
```

basically, we're adding the card's number to the total

but the ranks are 0 indexed (0 means Ace, 1 means 2, 2 means 3, etc), so we need to `+ 1` for that to work

lastly, we use `Math.min` to make sure if the rank is > 10 (ie we have J, Q, or K) that we don't add 11, 12, or 13 but rather 10 as expected

we've now calculated the "naive total", which is the total if Aces weren't allowed to be 11


```js
  return (hasAce && naiveTotal <= 11) ? naiveTotal + 10 : naiveTotal;
```

all we want to do is add the extra 10 when there's an Ace, and adding that 10 doesn't bust the hand

```js
(hasAce && naiveTotal <= 11)
```

will be true when we have an Ace, and adding 10 to our naive total doesn't bust the hand

`?`

[the ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) allows us to pick between two different expressions to evaluate in the middle of a line of code

so

```js
(hasAce && naiveTotal <= 11) ? naiveTotal + 10 : naiveTotal
```

will evaluate

```js
naiveTotal + 10
```

if that Boolean expression from earlier was `true`

or

```js
naiveTotal
```

if it was false.

So, when we have an Ace and counting it as 11 won't bust the hand, we return the `naiveTotal` (which included 1 for the ace) plus 10 (so one ace can count for 11)

otherwise the `naiveTotal` was correct and we `return` that


#### using the calculated total

now we don't want the player to be able to hit if the hand is bust (and we want to tell them somehow that the hand is busted)

so we can call `calculateTotal` in the `render` function and decide what to do based on the result

in our `render` function...

<sub>index.js</sub>
```js
//...

render = ()=>{
    //... what we had before

    const playerTotal = calculateTotal( state.player ); // calculate total from player hand
    const hitButton = document.querySelector('button[onclick*=hit]'); // select button
    
    if( playerTotal > 21 ){ // if bust
      hitButton.disabled = true;  // disable the button
      hitButton.innerHTML = 'BUST';  // and change its text to "BUST"
    } else {
      hitButton.disabled = false;  // otherwise, enable the button
      hitButton.innerHTML = 'Hit me!'; // and set its text to the original "Hit me!"
    }    
  }

//...
```



### stand (and the dealer algorithm)

when the player hits "stand", they are done playing the hand, and it's the dealer's turn to play.

The dealer follows a standard set of rules to hit or stand based on the hand (not a whim)

at the end of the routine, we'll know if the player won or the dealer won (or if there's a push)

(of course, if the player busted already, we know the result)

the dealer rules are (in English) as follows:

```
dealer gets one face up card before the player plays

once the player is done, the dealer uncovers the second card

if the dealer has 16 or less, HIT

if the dealer has 18 or more, STAND

if the dealer has soft 17 (Ace counts as 11), HIT

if the dealer has hard 17 (no Ace or Ace counts as 1), STAND
```

or in javascript (this should look familiar)

```js
const dealerHitting = (hand)=>{
  const hasAce = !!hand.find(card => card.rank === 0);
  const naiveTotal = hand.reduce((runningTotal, card)=>
    runningTotal + Math.min(10, card.rank + 1), 0);

  const total = (hasAce && naiveTotal <= 11) ? naiveTotal + 10 : naiveTotal;

  return ( naiveTotal < 17 ) || ( naiveTotal === 7 && total === 17 );
};
```

so it's almost the same as `calculateTotal`, just now instead of returning the total, we calculate a Boolean based on `total` and `naiveTotal` to return.


now we need to use this `dealerHitting` in our `stand` function

we'll grab one more card (the "face down" card that we didn't even deal yet)

then as long as the dealer is hitting, we'll deal another card.

<sub>index.js</sub>
```js
  stand = ()=>{
    do setState({ dealer: [...state.dealer, dealCard()] });
    while( dealerHitting( state.dealer ) );
    
    const playerTotal = calculateTotal( state.player );
    const dealerTotal = calculateTotal( state.dealer );

    setTimeout(()=> {
      if( playerTotal === 21 && state.player.length === 2 ) alert('BlackJack!');
      else if( playerTotal > 21 ) alert('Lost! Bust!');
      else if( dealerTotal > 21 ) alert('Winning! Dealer Bust!');
      else if( playerTotal > dealerTotal ) alert('Winning!');
      else if( playerTotal === dealerTotal ) alert('Push!');
      else alert('Lost! '+dealerTotal+' to '+playerTotal);

      deal();
    }, 3000);
  }
```

then we make an `alert` based on the outcome of the hand.

and of course, we need a button!

<sub>index.html</sub>
```html
<button onclick="stand()">Stand</button>
```

last thing last, I didn't like having to press "stand" after BUSTing a hand

so we can call that automatically in `hit` when the player busts.

```js
  hit = ()=>{
    setState({
      player: [...state.player, dealCard()],
    })

    const playerTotal = calculateTotal( state.player );
    if( playerTotal > 21 ) stand();
  }

```


Have fun playing!