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

onload = ()=>{
  const initDeal = {
    player: [ dealCard(), dealCard() ],
    dealer: [ dealCard(), dealCard() ],
  };

  state = {
    ...initDeal,
    playerTotal: calculateTotal(initDeal.player),
    dealerTotal: calculateTotal(initDeal.dealer),
  }

  setState = (nextStatePart)=>{
    state = {...state, ...nextStatePart };
    render();
  }

  hit = ()=>{
    const nextCards = [...state.player, dealCard()];
    setState({
      player: nextCards,
      playerTotal: calculateTotal( nextCards ),
    });
  }

  newDeal = ()=>{
    const nextDeal = {
      player: [ dealCard(), dealCard() ],
      dealer: [ dealCard(), dealCard() ],
    };

    setState({
      ...nextDeal,
      playerTotal: calculateTotal(nextDeal.player),
      dealerTotal: calculateTotal(nextDeal.dealer),
    });
  }

  render = ()=>{
    document.querySelector('.player').innerHTML =
      state.player.reduce(( html, card )=>
        html + cards[card.rank][card.suit] + ' ', '') +
      ' = ' + state.playerTotal;
    
    document.querySelector('.dealer').innerHTML =
      cards[state.dealer[0].rank][state.dealer[0].suit] + ' ' +
      cards[state.dealer[1].rank][state.dealer[1].suit] + ' ' +
      ' = ' + state.dealerTotal;
  }

  render();
};
