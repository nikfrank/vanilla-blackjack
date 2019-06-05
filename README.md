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
    dealer: [ { rank: 0, suit: 0 }, { rank: 8, suit: 1 } ],
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
      cards[ state.dealer[0].rank ][ state.dealer[0].suit ] + ' ' +
      cards[ state.dealer[1].rank ][ state.dealer[1].suit ];

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
      dealer: [ { rank: 7, suit: 2 }, { rank: 9, suit: 2 } ],
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


### dealing hands, calculateTotal

### user actions (hit, newDeal)