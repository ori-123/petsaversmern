const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./corsOptions.js');
const Dog = require('./model/Dog.js');
const Interest = require('./model/Interest.js');

app.use(cors(corsOptions));
app.use(express.json());

async function fetchDogs() {
  try {
    const tokenResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=kQTtu4hNMpdhRbRbtuxGI5N71h12fZMKiH9dJEpGAhR0AXR8ZU&client_secret=L99UT6klFJHABoF3v9j1ZHINqcxmZ39WrOHJbAvT',
    });
    const { access_token: accessToken } = await tokenResponse.json();

    const dogsResponse = await fetch('https://api.petfinder.com/v2/animals?type=dog&page=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const { animals: dogs } = await dogsResponse.json();

    const savePromises = dogs.map(async (dog) => {
      const newDog = new Dog({
        name: dog.name,
        breeds: dog.breeds.primary,
        colors: dog.colors.primary,
        age: dog.age,
        gender: dog.gender,
        size: dog.size,
        houseTrained: dog.attributes.house_trained,
        attributes: dog.tags,
        description: dog.description,
        neutered: dog.attributes.spayed_neutered,
        photoUrl: dog.photos.map(photo => photo.large),
        adoptable: dog.status === 'adoptable' ? true : false
      });

      try {
        const savedDog = await newDog.save();
        console.log(`Dog saved to MongoDB: ${savedDog}`);
      } catch (error) {
        console.error(error);
      }
    });

    await Promise.all(savePromises);
  } catch (error) {
    console.error(error);
  }
}

// fetchDogs();

app.post('/api/interests', async (req, res) => {
  await Interest.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

app.get('/api/interests', async (req, res) => {
  const interests = await Interest.find();
  return res.json(interests);
});

app.get('/api/alldogs', (req, res) => {
  Dog.find()
    .then((dogs) => res.json(dogs))
    .catch((error) => res.status(500).send(error));
});

app.get('/api/adoptables', (req, res) => {
  Dog.find({ adoptable: true })
    .then((dogs) => res.json(dogs))
    .catch((error) => res.status(500).send(error));
});

app.get('/api/alldogs/:id', async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id);
    return res.json(dog);
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/alldogs/:id', (req, res) => {
  Dog.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(500).send(error));
});

app.post('/api/alldogs', (req, res) => {
  Dog.create(req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => res.status(500).send(error));
});

app.patch('/api/alldogs/:id', (req, res) => {
  const dogId = req.params.id;
  const updatedDog = req.body;

  Dog.findByIdAndUpdate(dogId, updatedDog)
    .then((dog) => res.json(dog))
    .catch((error) => res.status(500).send(error));
});

app.listen(3001, () => 'The server is listening on port 3001');
