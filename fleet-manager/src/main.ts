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

const connection = mysql.createPool({
  user: 'root',
  password: 'password',
  database: 'evilton',
});

app.post('/aircrafts', async (req, res) => {
  try {
    const result = await createAircraft(req.body, connection);
    res.status(202).json({
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
    res.status(202).json({
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
    res.status(202).json({
      message: 'Aircraft Updated',
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
