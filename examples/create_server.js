const Client = require('../');

// CHANGE THIS
const AUTH_TOKEN = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
const ZONE = 'fr-par-2';
const ORGANIZATION_ID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

// Find your SSH_KEY_ID here: https://console.scaleway.com/account/organization/credentials
const SSH_KEY_ID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

// -------------------------------------------------------

const api = new Client(AUTH_TOKEN);

api.CreateServer(ZONE, {
  // instance type: GP-BM1-S
  'offer_id': '7fde3890-9787-488c-ac89-c4e00a4e5f83',

  // Your own organization UUID
  'organization_id': ORGANIZATION_ID,

  'name': 'my-awesome-server',
  'description': 'my-awesome-server FTW',
  'tags': ['development'],

  'install': {
    // Debian 10
    'os_id': 'f2aeab5d-6015-4b7c-b4ed-d76e89093621',

    'ssh_key_ids': [SSH_KEY_ID],
  },
}).then(response => console.log(response.data))
