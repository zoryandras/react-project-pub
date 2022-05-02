const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 9000;
const srcFolder = path.join(`${__dirname}/../frontend/src`);
const frontend = path.join(`${__dirname}/../frontend`);

app.use(cors());
app.use(express.json())
app.use(fileUpload());

app.get('/dogs', (req, res) => {
    res.sendFile(`${srcFolder}/data/dogs.json`);
});

app.post('/add_new_dog', (req, res) => {
    fs.readFile(`${srcFolder}/data/dogs.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send('Hiba')
        } else {
            const dogs = JSON.parse(data);

            dogs.push({
                id: dogs.length,
                ...req.body,
                reserved: false
            })

            req.files.file.mv(`${frontend}/public/images/${req.files.file.name}`, error => {
                if (error) {
                    return res.status(500).send(error);
                }
            })

            fs.writeFile(`${srcFolder}/data/dogs.json`, JSON.stringify(dogs), error => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
            })
            res.send(dogs)
        }
    })
});

app.post('/new_owner_info', (req, res) => {
    fs.readFile(`${srcFolder}/data/ownerdata.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send('Hiba')
        } else {
            const jsonData = JSON.parse(data);
            const newOwnerData = {id: jsonData.length, ...req.body}
            jsonData.push(newOwnerData)
        
            fs.writeFile(`${srcFolder}/data/ownerdata.json`, JSON.stringify(jsonData), (error) => { 
                if (error) {
                    console.log(error);
                }
            })

            fs.readFile(`${srcFolder}/data/dogs.json`, (error, data) => {
                if (error) {
                    console.log(error);
                    res.send('Hiba')
                } else {
                    const dogsData = JSON.parse(data);
                    const chosenDog = dogsData.find(dog => req.body.chosenDogId === dog.id);
                    dogsData[chosenDog.id].reserved = true;

                    fs.writeFile(`${srcFolder}/data/dogs.json`, JSON.stringify(dogsData), (error) => { 
                        if (error) {
                            console.log(error);
                        }
                    })
                    res.send(dogsData);
                }
            })
        }
    })
});

app.post("/delete_dog", (req, res) => {
    fs.readFile(`${srcFolder}/data/dogs.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send('Hiba')
        } else {
            const dogsData = JSON.parse(data);

            dogsData.splice(req.body.id, 1);
            dogsData.map((dog, index) => dog.id = index);
            fs.writeFile(`${srcFolder}/data/dogs.json`, JSON.stringify(dogsData), error => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
            })
            res.send(dogsData);
        }
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});