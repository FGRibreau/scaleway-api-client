const axios = require('axios');


/**
 * scaleway-api-client Client Constructor
 * @constructor
 * @param {String} auth_token - Scaleway Authentication Token
 */
function Client(auth_token){
  this.base_url = 'https://api.scaleway.com';
  this.auth_token = auth_token;
}

/**
 * List offers
 * @description List all available server offers.
 * @param {string} zone - The zone you want to target
 * @param {object?} options axios http request options
 */
Client.prototype.ListOffers = function ListOffers(zone, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/offers".replace('{zone}', zone),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Get offer
 * @description Return specific offer for the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} offer_id - ID of the researched Offer
 * @param {object?} options axios http request options
 */
Client.prototype.GetOffer = function GetOffer(zone, offer_id, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/offers/{offer_id}".replace('{zone}', zone).replace('{offer_id}', offer_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * List all available OS that can be install on a baremetal server
 * @description List all available OS that can be install on a baremetal server.
 * @param {string} zone - The zone you want to target
 * @param {object?} options axios http request options
 */
Client.prototype.ListOS = function ListOS(zone, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/os".replace('{zone}', zone),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Get an OS with a given ID
 * @description Return specific OS for the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} os_id - ID of the OS
 * @param {object?} options axios http request options
 */
Client.prototype.GetOS = function GetOS(zone, os_id, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/os/{os_id}".replace('{zone}', zone).replace('{os_id}', os_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * List baremetal servers for organization
 * @description List baremetal servers for organization.
 * @param {string} zone - The zone you want to target
 * @param {object?} options axios http request options
 */
Client.prototype.ListServers = function ListServers(zone, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/servers".replace('{zone}', zone),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Create a baremetal server
 * @description Create a new baremetal server. Once the server is created, you probably want to install an OS.
 * @param {string} zone - The zone you want to target
 * @param {object} body - Request content
 * @param {string} body.offer_id - Offer ID of the new server
 * @param {string} body.organization_id - Organization ID with which the server will be created
 * @param {string} body.project_id - Project ID with which the server will be created
 * @param {string} body.name - Name of the server (≠hostname)
 * @param {string} body.description - Description associated to the server, max 255 characters
 * @param {array} body.tags - Tags to associate to the server
 * @param {object} body.install - 
 * @param {object?} options axios http request options
 */
Client.prototype.CreateServer = function CreateServer(zone, body, options){
  return axios({
    method: "post",
    url: "/baremetal/v1/zones/{zone}/servers".replace('{zone}', zone),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: body,
    responseType: 'json',
    ...options
  });      
}

/**
 * Get a specific baremetal server
 * @description Get the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server
 * @param {object?} options axios http request options
 */
Client.prototype.GetServer = function GetServer(zone, server_id, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Update a baremetal server
 * @description Update the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server to update
 * @param {object?} options axios http request options
 */
Client.prototype.UpdateServer = function UpdateServer(zone, server_id, options){
  return axios({
    method: "patch",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Delete a baremetal server
 * @description Delete the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server to delete
 * @param {object?} options axios http request options
 */
Client.prototype.DeleteServer = function DeleteServer(zone, server_id, options){
  return axios({
    method: "delete",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Get BMC (Baseboard Management Controller) access for a given baremetal server
 * @description Get the BMC (Baseboard Management Controller) access associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server
 * @param {object?} options axios http request options
 */
Client.prototype.GetBMCAccess = function GetBMCAccess(zone, server_id, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/bmc-access".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Start BMC (Baseboard Management Controller) access for a given baremetal server
 * @description Start BMC (Baseboard Management Controller) access associated with the given ID.
The BMC (Baseboard Management Controller) access is available one hour after the installation of the server.

 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server
 * @param {object} body - Request content
 * @param {string} body.ip - The IP authorized to connect to the given server (IPv4 address)
 * @param {object?} options axios http request options
 */
Client.prototype.StartBMCAccess = function StartBMCAccess(zone, server_id, body, options){
  return axios({
    method: "post",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/bmc-access".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: body,
    responseType: 'json',
    ...options
  });      
}

/**
 * Stop BMC (Baseboard Management Controller) access for a given baremetal server
 * @description Stop BMC (Baseboard Management Controller) access associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server
 * @param {object?} options axios http request options
 */
Client.prototype.StopBMCAccess = function StopBMCAccess(zone, server_id, options){
  return axios({
    method: "delete",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/bmc-access".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * List server events
 * @description List events associated to the given server ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server events searched
 * @param {object?} options axios http request options
 */
Client.prototype.ListServerEvents = function ListServerEvents(zone, server_id, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/events".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Install a baremetal server
 * @description Install an OS on the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - Server ID to install
 * @param {object} body - Request content
 * @param {string} body.os_id - ID of the OS to install on the server
 * @param {string} body.hostname - Hostname of the server
 * @param {array} body.ssh_key_ids - SSH key IDs authorized on the server
 * @param {object?} options axios http request options
 */
Client.prototype.InstallServer = function InstallServer(zone, server_id, body, options){
  return axios({
    method: "post",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/install".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: body,
    responseType: 'json',
    ...options
  });      
}

/**
 * Update IP
 * @description Configure ip associated with the given server ID and ipID. You can use this method to set a reverse dns for an IP.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server
 * @param {string} ip_id - ID of the IP to update
 * @param {object?} options axios http request options
 */
Client.prototype.UpdateIP = function UpdateIP(zone, server_id, ip_id, options){
  return axios({
    method: "patch",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/ips/{ip_id}".replace('{zone}', zone).replace('{server_id}', server_id).replace('{ip_id}', ip_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Return server metrics
 * @description Give the ping status on the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - Server ID to get the metrics
 * @param {object?} options axios http request options
 */
Client.prototype.GetServerMetrics = function GetServerMetrics(zone, server_id, options){
  return axios({
    method: "get",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/metrics".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: {},
    responseType: 'json',
    ...options
  });      
}

/**
 * Reboot a baremetal server
 * @description Reboot the server associated with the given ID, use boot param to reboot in rescue.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server to reboot
 * @param {object} body - Request content
 * @param {string} body.boot_type - The type of boot
 * @param {object?} options axios http request options
 */
Client.prototype.RebootServer = function RebootServer(zone, server_id, body, options){
  return axios({
    method: "post",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/reboot".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: body,
    responseType: 'json',
    ...options
  });      
}

/**
 * Start a baremetal server
 * @description Start the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server to start
 * @param {object} body - Request content
 * @param {string} body.boot_type - The type of boot
 * @param {object?} options axios http request options
 */
Client.prototype.StartServer = function StartServer(zone, server_id, body, options){
  return axios({
    method: "post",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/start".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: body,
    responseType: 'json',
    ...options
  });      
}

/**
 * Stop a baremetal server
 * @description Stop the server associated with the given ID.
 * @param {string} zone - The zone you want to target
 * @param {string} server_id - ID of the server to stop
 * @param {object} body - Request content

 * @param {object?} options axios http request options
 */
Client.prototype.StopServer = function StopServer(zone, server_id, body, options){
  return axios({
    method: "post",
    url: "/baremetal/v1/zones/{zone}/servers/{server_id}/stop".replace('{zone}', zone).replace('{server_id}', server_id),
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-scaleway-api-client/0.0.1', 'X-Auth-Token': this.auth_token },
    params: {},
    data: body,
    responseType: 'json',
    ...options
  });      
}
module.exports = Client;