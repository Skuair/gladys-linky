module.exports = {
  getLinky: `
    SELECT * 
    FROM device
    WHERE protocol = 'network'
    AND service = 'linky';
  `,
  getByIdLinky: `
    SELECT * 
    FROM device
    WHERE protocol = 'network'
    AND service = 'linky'
    AND id = ?;
  `,
  getTypeByIdLinky: `
    SELECT *
    FROM devicetype
    WHERE device = ?;
  `,
  getLinkyType: `
    SELECT device.id,device.identifier, devicetype.id as d_id, devicetype.type
    FROM device
    JOIN devicetype ON devicetype.device = device.id
    WHERE protocol = 'network'
    AND service = 'linky'
    AND device.identifier like (?);
  `,
  getLinkyDeviceType: `
    SELECT devicetype.id,devicetype.type,device.identifier,device.id 
    FROM devicetype
    JOIN device ON devicetype.device = device.id
    WHERE device = ?
    AND sensor = 1;
  `
};