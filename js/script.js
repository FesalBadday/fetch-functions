fetch('http://deckofcardsapi.com/api/deck/new')
  .then(function (response) {
    // JSON that is returned from the server must be converted to a JS object asynchronously.
    if (!response.ok) {
      throw new Error('Not 200 OK');
    }
    return response.json();
  })

  // load the cards
  .then(function (link) {
    return fetch(`http://deckofcardsapi.com/api/deck/${link.deck_id}/draw/?count=52`)
  })

  // return new json file
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    // Any code that depends on the `data` must go in this block
    const cardsSection = document.querySelector(".cards");

    // output variable
    let output = '';

    data.cards.forEach(function (cards) {
      output +=
        `<figure>
        <img src='${cards.image}' alt='${cards.suit}'>
          <figcaption>
          <p>
          ${cards.value}
          </p>
          </figcaption>
        </figure>`
    });

    // print output
    cardsSection.innerHTML = output;
  })

  .catch(function (err) {
    // An error or `reject` from any of the above `.then()` blocks will end up here.
    console.log(err);
  });