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
  getLinkyDeviceTypeDay: `
    SELECT devicetype.id,devicetype.type,device.identifier,device.id as deviceid,devicetype.name,devicetype.identifier as devicetypeidentifier 
    FROM devicetype
    JOIN device ON devicetype.device = device.id
    WHERE device.service = 'linky'
    AND devicetype.identifier = 'Consommation_day'
    AND sensor = 1;
  `,
  getLinkyDeviceTypeMonth: `
    SELECT devicetype.id,devicetype.type,device.identifier,device.id as deviceid,devicetype.name,devicetype.identifier as devicetypeidentifier 
    FROM devicetype
    JOIN device ON devicetype.device = device.id
    WHERE device.service = 'linky'
    AND devicetype.identifier = 'Consommation_month'
    AND sensor = 1;
  `,
  getLinkyDeviceTypeYear: `
    SELECT devicetype.id,devicetype.type,device.identifier,device.id as deviceid,devicetype.name,devicetype.identifier as devicetypeidentifier 
    FROM devicetype
    JOIN device ON devicetype.device = device.id
    WHERE device.service = 'linky'
    AND devicetype.identifier = 'Consommation_year'
    AND sensor = 1;
  `


  
};