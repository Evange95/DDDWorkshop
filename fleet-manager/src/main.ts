import express from 'express';
const app = express();

app.use(express.json());

import mysql from 'mysql2';
import {
  createAircraft,
  deleteAircraft,
  getAircrafts,
  updateAircraft,
} from './aircrafts';
import {
  createSeatType,
  deleteSeatType,
  getSeatTypes,
  updateSeatType,
} from './seat-types';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'evilton',
});

app.post('/aircrafts', async (req, res) => {
  try {
    const result = await createAircraft(req.body, connection);
    res.status(201).json({
      message: 'Aircraft Created',
    });
    console.log('Created: ', result);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get('/aircrafts', async (req, res) => {
  try {
    const aircrafts = await getAircrafts(connection);
    console.log('Retrieved: ', aircrafts);
    res.status(200).json(aircrafts);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete('/aircrafts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAircraft(id, connection);
    console.log('Deleted: ', result);
    if (result[0].affectedRows === 0) {
      res.status(404).json({
        message: 'Aircraft not found',
      });
      return;
    }
    res.status(200).json({
      message: 'Aircraft Deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch('/aircrafts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateAircraft(id, req.body, connection);
    if (result[0].affectedRows === 0) {
      res.status(404).json({
        message: 'Aircraft not found',
      });
      return;
    }
    console.log('Updated: ', result);
    res.status(200).json({
      message: 'Aircraft Updated',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.get('/seatTypes', async (req, res) => {
  try {
    const seats = await getSeatTypes(connection);
    console.log('Retrieved: ', seats);
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post('/seatTypes', async (req, res) => {
  try {
    const result = await createSeatType(req.body, connection);
    res.status(201).json({
      message: 'Seat Created',
    });
    console.log('Created: ', result);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.patch('/seatTypes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateSeatType(id, req.body, connection);
    if (result[0].affectedRows === 0) {
      res.status(404).json({
        message: 'Seat not found',
      });
      return;
    }
    console.log('Updated: ', result);
    res.status(200).json({
      message: 'Seat Updated',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.delete('/seatTypes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSeatType(id, connection);
    console.log('Deleted: ', result);
    if (result[0].affectedRows === 0) {
      res.status(404).json({
        message: 'Seat not found',
      });
      return;
    }
    res.status(200).json({
      message: 'Seat Deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening in http://localhost:3000');
});
