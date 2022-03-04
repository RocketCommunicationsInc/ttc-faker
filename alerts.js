const _errorSeverities = ["caution", "serious", "critical"];
const _errorCategories = ["hardware", "software", "spacecraft"];
const _hardwareTypes = ["workstation", "antenna"];
const _softwareTypes = ["fep"];
const _spacecraft = ["USA-96", "USA-132", "USA-135", "USA-145", "USA-150", "USA-151", "USA-154", "USA-166", "USA-168", "USA-176", "USA-177", "USA-180", "USA-183", "USA-190", "USA-192", "USA-196", "USA-199", "USA-201", "USA-203"];
const _feps = ["Black FEP 121", "Black FEP 124", "Black FEP 201", "Black FEP 301", "Red FEP 121", "Red FEP 124", "Red FEP 201", "Red FEP 301"];
const _workstations = ["Workstation 101", "Workstation 104", "Workstation 134", "Workstation 202"];
const _antennas = ["Antenna DGS 1", "Antenna DGS 2", "Antenna HTS 1", "Antenna HTS 2", "Antenna VTS 1", "Antenna VTS 2"];

const _spacecraftFailures = ["SARM failure", "Power degradation", "Solar panel misalignment", "Battery charge level low"];
const _spacecraftFailuresLong = ["experienced SARM failure", "suffered power degradation", "experienced solar panel misalignment", "has low battery charge level"];
const _fepFailures = ["Degraded", "Offline"];
const _fepFailuresLong = ["is degraded", "is offline"];
const _workstationFailures = ["Offline", "Memory limit reached", "Out of disk space"];
const _workstationFailuresLong = ["is offline", "has reached memory limit", "is out of disk space"];
const _antennaFailures = ["Offline", "Weak signal", "NOLOCK"];
const _antennaFailuresLong = ["went offline", "has weak signal", "received NOLOCK"];

let getRandomIndex = (array) => {
  return Math.floor(Math.random() * Math.floor(array.length));
}
let getErrorMessage = (category) => {
  let error = {};
  let d = new Date();
  let month = d.getUTCMonth();
  if ( month < 10 ) {
    month = "0" + month;
  }
  let date = d.getUTCDate();
  if ( date < 10 ) {
    date = "0" + date;
  }
  let hours = d.getUTCHours();
  if ( hours < 10 ) {
    hours = "0" + hour;
  }
  let minutes = d.getUTCMinutes();
  if ( minutes < 10 ) {
    minutes = "0" + minutes;
  }
  let seconds = d.getUTCSeconds();
  if ( seconds < 10 ) {
    seconds = "0" + seconds;
  }
  let formattedTime = hours + ":" + minutes + ":" + seconds;
  let errorIndex = null;
  error.equipment = null;
  error.message = null;
  error.longMessage = null;
  error.timestamp = null;
  if (category === "hardware") {
    let hardwareType = _hardwareTypes[getRandomIndex(_hardwareTypes)];
    if (hardwareType === "workstation") {
      error.equipment = _workstations[getRandomIndex(_workstations)];
      errorIndex = getRandomIndex(_workstationFailures);
      error.message = _workstationFailures[errorIndex];
      error.longMessage = _workstationFailuresLong[errorIndex];
    } else if (hardwareType === "antenna") {
      error.equipment = _antennas[getRandomIndex(_antennas)];
      errorIndex = getRandomIndex(_antennaFailures);
      error.message = _antennaFailures[errorIndex];
      error.longMessage = _antennaFailuresLong[errorIndex];
    }
  } else if (category === "software") {
    let equipmentType = _softwareTypes[getRandomIndex(_softwareTypes)];
    if (equipmentType === "fep") {
      error.equipment = _feps[getRandomIndex(_feps)];
      errorIndex = getRandomIndex(_fepFailures)
      error.message = _fepFailures[errorIndex];
      error.longMessage = _fepFailuresLong[errorIndex];
    }
  } else if (category === "spacecraft") {
    error.equipment = _spacecraft[getRandomIndex(_spacecraft)];
    errorIndex = getRandomIndex(_spacecraftFailures);
    error.message = _spacecraftFailures[errorIndex];
    error.longMessage = _spacecraftFailuresLong[errorIndex];
  } else { // this should never happen
    error.equipment = "Error";
    error.message = "Error";
    error.longMessage = "Error";
  }
  error.formattedMessage = error.equipment + " - " + error.message;
  error.formattedLongMessage = error.equipment + " " + error.longMessage + " at " + formattedTime;
  
  return error;
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function generateAlert() {
  let telemetryData = {};

  let d = new Date();
  let month = d.getUTCMonth();
  if ( month < 10 ) {
    month = "0" + month;
  }
  let date = d.getUTCDate();
  if ( date < 10 ) {
    date = "0" + date;
  }
  let hour = d.getUTCHours();
  if ( hour < 10 ) {
    hour = "0" + hour;
  }
  let minutes = d.getUTCMinutes();
  if ( minutes < 10 ) {
    minutes = "0" + minutes;
  }
  let seconds = d.getUTCSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  telemetryData.errorId = uuidv4();
  telemetryData.errorSeverity = _errorSeverities[getRandomIndex(_errorSeverities)];
  telemetryData.errorCategory = _errorCategories[getRandomIndex(_errorCategories)];
  let errorMessages = getErrorMessage(telemetryData.errorCategory);
  telemetryData.errorMessage = errorMessages.formattedMessage;
  telemetryData.longMessage = errorMessages.formattedLongMessage;
  telemetryData.errorTime = d.getTime();


  return telemetryData;
}