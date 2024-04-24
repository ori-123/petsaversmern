const express = require('express');
const cors = require('cors');
const Database = require('./db/db');
const Dog = require('./models/Dog');
const Inquiry = require('./models/Inquiry');

const app = express();
const port = 3001;

async function startServer() {
  try {
    await Database.start();

    app.use(cors());
    app.use(express.json());

    const allDogs = await Dog.find();
    if (allDogs.length === 0) {
      populateDatabase();
    }

    app.get('/api/alldogs', async (req, res) => {
      const dogs = await Dog.find();
      res.json(dogs);
    });

    app.get('/api/adoptables', async (req, res) => {
      const adoptableDogs = await Dog.find({ adoptable: true });
      res.json(adoptableDogs);
    });

    app.get('/api/alldogs/:id', async (req, res) => {
      const dogId = req.params.id;
      const dog = await Dog.findById(dogId);
      if (!dog) {
        return res.status(404).json({ message: 'Dog not found' });
      }
      res.json(dog);
    });

    app.delete('/api/alldogs/:id', async (req, res) => {
      const dogId = req.params.id;
      const deletedDog = await Dog.findByIdAndDelete(dogId);
      if (!deletedDog) {
        return res.status(404).json({ message: 'Dog not found' });
      }
      res.sendStatus(200);
    });

    app.post('/api/alldogs', async (req, res) => {
      try {
        const newDog = await Dog.create(req.body);
        res.sendStatus(200);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create dog' });
      }
    });

    app.put('/api/alldogs/:id', async (req, res) => {
      const dogId = req.params.id;
      const updatedDog = await Dog.findByIdAndUpdate(dogId, req.body, { new: true });
      if (!updatedDog) {
        return res.status(404).json({ message: 'Dog not found' });
      }
      res.json(updatedDog);
    });

    app.post('/api/inquiries', async (req, res) => {
      try {
        const newInquiry = await Inquiry.create(req.body);
        res.sendStatus(200);
      } catch (error) {
        res.status(500).json({ message: 'Failed to create inquiry' });
      }
    });

    app.get('/api/inquiries', async (req, res) => {
      const inquiries = await Inquiry.find();
      res.json(inquiries);
    });

    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

async function populateDatabase() {
  const dummyDogs = require('./db/dummydogs.json');

  try {
    await Dog.deleteMany();

    await Dog.create(dummyDogs);

    console.log('Dummy data populated successfully!');

    const allDogs = await Dog.find();

    console.log(allDogs);
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

startServer();
