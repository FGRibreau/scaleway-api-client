const Client = require('../');

// CHANGE THIS
const AUTH_TOKEN = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
const ZONE = 'fr-par-2';
const SERVER_ID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

// -------------------------------------------------------

const api = new Client(AUTH_TOKEN);

function get_ping_status(){
  return api
    .GetServer(ZONE, SERVER_ID)
    .then(response => response.data.ping_status)
}

function wait(){
  get_ping_status().then((ping_status) => {
    if(ping_status !== 'ping_status_up'){
      console.log(new Date().toISOString(), ping_status); // ping_status_unknown
      setTimeout(wait, 1000);
    }
  })
}


wait();
