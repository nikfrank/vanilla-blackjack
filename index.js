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

calculateTotal = (hand)=>{
  const hasAce = !!hand.find(card => card.rank === 0);
  const naiveTotal = hand.reduce((runningTotal, card)=>
    runningTotal + Math.min(10, card.rank + 1), 0);

  return (hasAce && naiveTotal <= 11) ? naiveTotal + 10 : naiveTotal;
}

dealCard = ()=>({
  rank: Math.floor(Math.random()*13),
  suit: Math.floor(Math.random()*4),
});

const dealerHitting = (hand)=>{
  const hasAce = !!hand.find(card => card.rank === 0);
  const naiveTotal = hand.reduce((runningTotal, card)=>
    runningTotal + Math.min(10, card.rank + 1), 0);

  const total = (hasAce && naiveTotal <= 11) ? naiveTotal + 10 : naiveTotal;

  return ( naiveTotal < 17 ) || ( naiveTotal === 7 && total === 17 );
};

onload = ()=> {
  state = {
    player: [ dealCard(), dealCard() ],
    dealer: [ dealCard() ],
  }

  setState = (nextState)=>{
    state = { ...state, ...nextState }
    render();
  }

  deal = ()=>{
    setState({
      player: [ dealCard(), dealCard() ],
      dealer: [ dealCard() ],
    })
  }

  hit = ()=>{
    setState({
      player: [...state.player, dealCard()],
    })

    const playerTotal = calculateTotal( state.player );
    if( playerTotal > 21 ) stand();
  }

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
  
  render = ()=>{
    document.querySelector('.player').innerHTML =
      state.player.reduce(( html, card )=>
        html + cards[card.rank][card.suit] + ' ', '');

    document.querySelector('.dealer').innerHTML =
      state.dealer.reduce(( html, card )=>
        html + cards[card.rank][card.suit] + ' ', '');

    const playerTotal = calculateTotal( state.player );
    const hitButton = document.querySelector('button[onclick*=hit]');
    
    if( playerTotal > 21 ){
      hitButton.disabled = true;
      hitButton.innerHTML = 'BUST';
    } else {
      hitButton.disabled = false;
      hitButton.innerHTML = 'Hit me!';
    }
  }
  
  render();
};
