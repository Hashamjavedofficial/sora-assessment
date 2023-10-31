const express = require('express')
const csv = require('csv-parser')
const fs = require('fs')
const cors = require('cors')
const app = express()
const path = require('path');
const port = process.env.PORT || 4000

app.use(cors())
app.get('/', (req, res,next) => {
    const results = [];
    // var thenum = thestring.replace(/^\D+/g, '');
    const unrefinedData = []

    fs.createReadStream(path.join(__dirname, 'public/data.csv'))
      .pipe(csv())
      .on('data', (data) => {
       unrefinedData.push(data)
        
      })
      .on('end', () => {
        unrefinedData.forEach((data,index) => {
          const key = Object.keys(data)[0]
          const value = data[key]
         if(index === 0)  results.push({
          createdBy: key.split(';')[0],
          fileName: key.split(';')[1],
          fileNameDigits: Math.max.apply(null, key.split(';')[1].match(/\d+/g))
      })
          results.push({
              createdBy: value.split(';')[0],
              fileName: value.split(';')[1],
              fileNameDigits: Math.max.apply(null, value.split(';')[1].match(/\d+/g))
          })
        })
        res.status(200).json(results)
      });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})