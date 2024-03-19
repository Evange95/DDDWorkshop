import { Pool } from 'mysql2/typings/mysql/lib/Pool';

export type SeatType = {
  SeatType: string;
  Width: number;
  Height: number;
  Pitch: number;
  Weight: number;
  ProductionDate: string;
  ComfortLevel: string;
  Features: string;
  Version: number;
};

export async function createSeatType(seat, connection: Pool) {
  return await connection
    .promise()
    .query(
      `INSERT INTO seatTypes (SeatType, Width, Height, Pitch, Weight, ProductionDate, ComfortLevel, Features, Version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        seat.SeatType,
        seat.Width,
        seat.Height,
        seat.Pitch,
        seat.Weight,
        seat.ProductionDate,
        seat.ComfortLevel,
        seat.Features,
        1,
      ]
    );
}

export async function deleteSeatType(id, connection) {
  return await connection
    .promise()
    .query('DELETE FROM seatTypes WHERE SeatTypeID = ?', [id]);
}

export async function updateSeatType(id, seat, connection) {
  return await connection
    .promise()
    .query(
      `UPDATE seatTypes SET SeatType = ?, Width = ?, Height = ?, Pitch = ?, Weight = ?, ProductionDate = ?, ComfortLevel = ?, Features = ?, Version = ?, WHERE SeatTypeID = ? AND Version = ?`,
      [
        seat.SeatType,
        seat.Width,
        seat.Height,
        seat.Pitch,
        seat.Weight,
        seat.ProductionDate,
        seat.ComfortLevel,
        seat.Features,
        seat.version + 1,
        id,
        seat.version,
      ]
    );
}

export async function getSeatTypes(connection) {
  const [rows, query] = await connection
    .promise()
    .query('SELECT * FROM seatTypes');
  return rows;
}
