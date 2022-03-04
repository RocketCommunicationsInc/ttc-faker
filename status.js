const _statusCategories = ["uca", "software", "rf", "digital", "comms", "facilities"];
const _errorSeverities = ["off", "standby", "caution", "serious", "alert"];

// Start functions
let getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}
// End functions

export function generateStatusData() {
  let d = new Date();
  let timestamp = d.getTime();
  let telemetryData = {};
  let ucaStatus = {};
  ucaStatus.worstStatus = _errorSeverities[getRandomIndex(_errorSeverities)];
  ucaStatus.numMessages = parseInt(Math.random() * 50);
  telemetryData.ucaStatus = ucaStatus;
  let softwareStatus = {};
  softwareStatus.worstStatus = _errorSeverities[getRandomIndex(_errorSeverities)];
  softwareStatus.numMessages = parseInt(Math.random() * 50);
  telemetryData.softwareStatus = softwareStatus;
  let rfStatus = {};
  rfStatus.worstStatus = _errorSeverities[getRandomIndex(_errorSeverities)];
  rfStatus.numMessages = parseInt(Math.random() * 50);
  telemetryData.rfStatus = rfStatus;
  let digitalStatus = {};
  digitalStatus.worstStatus = _errorSeverities[getRandomIndex(_errorSeverities)];
  digitalStatus.numMessages = parseInt(Math.random() * 50);
  telemetryData.digitalStatus = digitalStatus;
  let commsStatus = {};
  commsStatus.worstStatus = _errorSeverities[getRandomIndex(_errorSeverities)];
  commsStatus.numMessages = parseInt(Math.random() * 50);
  telemetryData.commsStatus = commsStatus;
  let facilitiesStatus = {};
  facilitiesStatus.worstStatus = _errorSeverities[getRandomIndex(_errorSeverities)];
  facilitiesStatus.numMessages = parseInt(Math.random() * 50);
  telemetryData.facilitiesStatus = facilitiesStatus;
  telemetryData.timestamp = timestamp;


  return telemetryData;
}