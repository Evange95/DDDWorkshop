// CREATE TABLE IF NOT EXISTS seats (SeatTypeID INT PRIMARY KEY, SeatType VARCHAR(255), Width INT, Height INT, Pitch INT, Weight INT, ProductionDate DATE, ComfortLevel INT, Features VARCHAR(255))

export async function createSeatType(seat, connection) {
  return await connection
    .promise()
    .query(
      `INSERT INTO sseatTypeseats (SeatType, Width, Height, Pitch, Weight, ProductionDate, ComfortLevel, Features) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        seat.SeatType,
        seat.Width,
        seat.Height,
        seat.Pitch,
        seat.Weight,
        seat.ProductionDate,
        seat.ComfortLevel,
        seat.Features,
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
      `UPDATE seatTypes SET SeatType = ?, Width = ?, Height = ?, Pitch = ?, Weight = ?, ProductionDate = ?, ComfortLevel = ?, Features = ? WHERE SeatTypeID = ?`,
      [
        seat.SeatType,
        seat.Width,
        seat.Height,
        seat.Pitch,
        seat.Weight,
        seat.ProductionDate,
        seat.ComfortLevel,
        seat.Features,
        id,
      ]
    );
}

export async function getSeatTypes(connection) {
  const [rows, query] = await connection
    .promise()
    .query('SELECT * FROM seatTypes');
  return rows;
}
