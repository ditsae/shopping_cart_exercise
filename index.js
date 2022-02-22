const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express()
const port = 3000

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/new-car.html'));
})

app.get('/car/:id', (req, res) => {
   const id = req.params.id;
   var data = fs.readFileSync("cars.json");
   var cars = JSON.parse(data);
   
   for (let car of cars){
     if (car.id === id){
       res.json(car)
       return;
     }
   }
   res.status(404).send('Car not found');
})

app.get('/cars', (req, res) => {
    res.sendFile(path.join(__dirname, 'cars.json'))
}) 

app.get('/cars-list', (req, res) => {
  res.sendFile(path.join(__dirname, '/cars_list.html'))
}) 

app.post('/car', (req, res) => {
    const car = req.body;
  
  var data = fs.readFileSync("cars.json");
      var myObject = JSON.parse(data);

    myObject.push(car);
      
    var newData = JSON.stringify(myObject);
    fs.writeFile("cars.json", newData, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send('car is added to the database');
      }
    });
});

app.delete('/car/:id', (req, res) => {
  const id = req.params.id;
  var data = fs.readFileSync("cars.json");
  var myObject = JSON.parse(data);
  cars = myObject.filter(car => {
      if (car.id !== id) {
          return true;
      }
      return false;
  });

  cars = JSON.stringify(cars);

  fs.writeFile("cars.json", cars, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send('car deleted');
    }
  });
});

 app.put('/car/:id', (req, res) => {
   const id = req.params.id;
   const modifyCar = req.body;

   var data = fs.readFileSync("cars.json");
   var cars = JSON.parse(data); 

   for (let i = 0; i < cars.length; i++) {
       if (cars[i].id === id) {
           cars[i] = modifyCar;
       }
   }

   cars = JSON.stringify(cars);
  fs.writeFile("cars.json", cars, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send('car is edited');
    }
  });
 });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})