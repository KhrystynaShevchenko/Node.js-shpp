const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/hello',(req, res) => {
  let counter = fs.readFileSync('./counter.txt');
  counter = Number(counter) + 1;
  console.log(counter);
  fs.writeFileSync('./counter.txt', counter.toString());
  res.sendFile(__dirname + '/counter.txt');
})

app.listen(PORT, () => {

})