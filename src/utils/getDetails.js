const request = require("postman-request");

const getDetails = (id, callback) => {
  let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  console.log(url);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to process please check id", undefined);
    } else {
      const data = response.body;
      callback(undefined, data);
    }
  });
};

module.exports = getDetails;
