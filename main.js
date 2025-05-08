fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_EGItFGknKWKjgHTMWZgLJgeYGz9tbI1ayPytDOjs')
  .then(response => response.json())
  .then(result => {
    const currencies = result.data;

   for (let key in currencies) {
      console.log(`${key}: ${currencies[key].value}`);
    }

    console.log(currencies['USD'].value);
  })
  