import express from 'express';
const app = express();

app.use(express.json());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  app.post('/aircrafts', async (req, res) => {
    try {
      const result = await prisma.aircraft.create({
        data: { ...req.body, Version: 1 },
      });
      res.status(201).json({
        message: 'Aircraft Created',
      });

      console.log('Created: ', result);
    } catch (err) {
      if (err.code === 'P2002') {
        res.status(400).json({
          message: 'Aircraft already exists',
        });
        return;
      }
      res.status(500).json({
        message: err,
      });
    }
  });

  app.get('/aircrafts', async (req, res) => {
    try {
      const aircrafts = await prisma.aircraft.findMany();
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
      const result = await prisma.aircraft.delete({
        where: {
          Id: id,
        },
      });
      console.log('Deleted: ', result);

      res.status(200).json({
        message: 'Aircraft Deleted',
      });
    } catch (err) {
      if (err.code === 'P2025') {
        res.status(404).json({
          message: 'Aircraft not found',
        });
        return;
      }
      res.status(500).json({
        message: err,
      });
    }
  });

  app.patch('/aircrafts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await prisma.aircraft.update({
        where: {
          Id: id,
          Version: req.body.Version,
        },
        data: {
          ...req.body,
          Version: req.body.Version + 1,
        },
      });

      console.log('Updated: ', result);
      res.status(200).json({
        message: 'Aircraft Updated',
      });
    } catch (err) {
      if (err.code === 'P2025') {
        res.status(404).json({
          message: 'Aircraft not found',
        });
        return;
      }
      res.status(500).json({
        message: err,
      });
    }
  });

  app.get('/seatTypes', async (req, res) => {
    try {
      const seats = await prisma.seatType.findMany();
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
      const result = await prisma.seatType.create({
        data: req.body,
      });
      res.status(201).json({
        message: 'Seat Created',
      });
      console.log('Created: ', result);
    } catch (err) {
      if (err.code === 'P2002') {
        res.status(400).json({
          message: 'Seat already exists',
        });
        return;
      }
      res.status(500).json({
        message: err,
      });
    }
  });

  app.patch('/seatTypes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await prisma.seatType.update({
        where: {
          Id: id,
          Version: req.body.Version,
        },
        data: {
          ...req.body,
          Version: req.body.Version + 1,
        },
      });
      console.log('Updated: ', result);
      res.status(200).json({
        message: 'Seat Updated',
      });
    } catch (err) {
      if (err.code === 'P2025') {
        res.status(404).json({
          message: 'Seat not found',
        });
        return;
      }
      res.status(500).json({
        message: err,
      });
    }
  });

  app.delete('/seatTypes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await prisma.seatType.delete({
        where: {
          Id: id,
        },
      });
      console.log('Deleted: ', result);
      res.status(200).json({
        message: 'Seat Deleted',
      });
    } catch (err) {
      if (err.code === 'P2025') {
        res.status(404).json({
          message: 'Seat not found',
        });
        return;
      }
      res.status(500).json({
        message: err,
      });
    }
  });

  app.listen(3000, () => {
    console.log('Server listening in http://localhost:3000');
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
