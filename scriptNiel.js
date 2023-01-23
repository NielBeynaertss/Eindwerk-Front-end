/*
let url = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-01-01/2023-01-30?api_token=1duNg3kFH9BpL5Y01Zn4PZtQvEQSrU6FVEs5N5LtRduMLdYNFGVIbS1Wg8qA`;

fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
*/
 

  let url = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-01-01/2023-01-2?api_token=1duNg3kFH9BpL5Y01Zn4PZtQvEQSrU6FVEs5N5LtRduMLdYNFGVIbS1Wg8qA`;

fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });


