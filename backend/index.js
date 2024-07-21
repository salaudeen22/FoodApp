const express = require('express')
const app = express()
const port = 4000

const mongoDB = require('./db.js');

mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUser.js"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})