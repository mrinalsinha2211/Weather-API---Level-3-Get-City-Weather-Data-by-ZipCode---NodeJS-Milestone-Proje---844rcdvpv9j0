const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


/*
  Instructions for students:
  Implement the function to retrieve the weather data for a city by its zipcode.

  Function:
    getWeatherDataByZipCode(zipCode)

  Input:
    - zipCode (string): The zipcode of the city for which weather data needs to be retrieved.

  Output:
    - If the city zipcode is found in the database, return the weather data object for the specified city.
    - If the city zipcode is not found in the database, return new Error('ZipCode not found').

  Tips:
    - Use the getDataFromDatabase() function to retrieve the data from the database.
    - Handle the data and filter the weather data based on the provided zipcode.
    - Return the filtered weather data or null based on the search result.
*/


// Level 3: Get City Weather Data by ZipCode
// async function getWeatherDataByZipCode(zipCode) {
   // TODO: Implement this function
  // try{
  //   const data=await getDataFromDatabase();
  //   const zipcode=data.find((zip)=>zip.zipCode.toLowerCase()===zipCode.toLowerCase());
  //   if(zipcode){
  //     return {
  //       status: 'success',
  //       message: 'Weather data retrieved',
  //       data: data,
  //     };
  //   } else {
  //     throw new Error('ZipCode not found');
  //   }
    
  //  } catch (error) {
  //   return {
  //     status: 'error',
  //     message: 'ZipCode not found',
  //     error: 'ZipCode not found',
  //   };
  //  }
//     const zipCode = req.params.code;
//   const data = await getDataFromDatabase();

//   const cityData = data.find((city) => city.zipCode.toLowerCase() === zipCode.toLowerCase());

//   if (cityData) {
//     res.status(200).json({
//       status: 'success',
//       message: 'Weather data retrieved',
//       data: cityData.forecast,
//     });
//   } else {
//     res.status(404).json({
//       status: 'error',
//       message: 'ZipCode not found',
//       error: 'ZipCode not found',
//     });
//   }

// }
async function getWeatherDataByZipCode(req, res) {
  const zipCode = req.params.code;
  const data = await getDataFromDatabase();

  const cityData = data.find((city) => city.zipcode === zipCode);

  if (cityData) {
    res.status(200).json({
      status: 'success',
      message: 'Weather data retrieved',
      data: cityData.forecast,
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'ZipCode not found',
      error: 'ZipCode not found',
    });
  }
}


module.exports = {
  getWeatherDataByZipCode
};
