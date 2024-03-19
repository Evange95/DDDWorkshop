export type Aircraft = {
  Model: string;
  Manufacturer: string;
  Wingspan: number;
  CabinWidth: number;
  CabinHeight: number;
  CabinLength: number;
  CargoCapacity: number;
  Range: number;
  CruiseSpeed: number;
  EngineType: string;
  NoiseLevel: string;
  Version: number;
};

export async function createAircraft(aircraft: Aircraft, connection) {
  const {
    Model,
    Manufacturer,
    Wingspan,
    CabinWidth,
    CabinHeight,
    CabinLength,
    CargoCapacity,
    Range,
    CruiseSpeed,
    EngineType,
    NoiseLevel,
  } = aircraft;
  return await connection.promise().query(
    `INSERT INTO aircrafts (Model, Manufacturer, Wingspan, \`CabinWidth\`, \`CabinHeight\`, \`CabinLength\`, \`CargoCapacity\`, \`Range\`, \`CruiseSpeed\`, \`EngineType\`, \`NoiseLevel\`, \`Version\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      Model,
      Manufacturer,
      Wingspan,
      CabinWidth,
      CabinHeight,
      CabinLength,
      CargoCapacity,
      Range,
      CruiseSpeed,
      EngineType,
      NoiseLevel,
      1,
    ]
  );
}

export async function deleteAircraft(id: string, connection) {
  return await connection
    .promise()
    .query('DELETE FROM aircrafts WHERE Model = ?', [id]);
}

export async function updateAircraft(
  id: string,
  aircraft: Aircraft,
  connection
) {
  const {
    Manufacturer,
    Wingspan,
    CabinWidth,
    CabinHeight,
    CabinLength,
    CargoCapacity,
    Range,
    CruiseSpeed,
    EngineType,
    NoiseLevel,
    Version,
  } = aircraft;
  return await connection.promise().query(
    `UPDATE aircrafts
            SET Manufacturer = ?, Wingspan = ?, \`CabinWidth\` = ?, \`CabinHeight\` = ?, \`CabinLength\` = ?, \`CargoCapacity\` = ?, \`Range\` = ?, \`CruiseSpeed\` = ?, \`EngineType\` = ?, \`NoiseLevel\` = ?, \`Version\` = ?
            WHERE Model = ? AND \`Version\` = ?`,
    [
      Manufacturer,
      Wingspan,
      CabinWidth,
      CabinHeight,
      CabinLength,
      CargoCapacity,
      Range,
      CruiseSpeed,
      EngineType,
      NoiseLevel,
      Version + 1,
      id,
      Version,
    ]
  );
}

export async function getAircrafts(connection) {
  const [rows, fields] = await connection
    .promise()
    .query('SELECT * FROM aircrafts');
  return rows;
}
