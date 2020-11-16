const axios = require('axios');
const YAML = require('yaml');
const assert = require('assert');
const fs = require('fs');
const pack = require('./package.json');
const path = require('path');


// We could not find any reliable (over time) URL for Api definition
// So we scrape them ourselves :)

const BASE_PATH = 'https://developers.scaleway.com/';
const doc_urls = [
  `${BASE_PATH}/en/products/instance/api/`,
  `${BASE_PATH}/en/products/baremetal/api/`,
  `${BASE_PATH}/en/products/lb/api/`,
  `${BASE_PATH}/en/products/registry/api/`,
  `${BASE_PATH}/en/products/k8s/api/`,
  `${BASE_PATH}/en/products/iot/api/`,
  `${BASE_PATH}/en/products/vpc/api/`,
];

const openapi_files_dir = path.resolve(__dirname, 'openapi');

function load_openapi_url(openapi_url) {
  return axios.get(openapi_url)
    .then(res => {
      fs.writeFileSync(path.join(openapi_files_dir, path.basename(openapi_url)), res.data, 'utf8');
      return res;
    })
    .then(res => YAML.parse(res.data))

}

const OPEN_API_URL_REGEXP = /(\/static\/[a-z0-9]{32}\/[^"]+)/;
Promise
  .all(doc_urls.map(url => axios.get(url)
    .then(res => BASE_PATH + OPEN_API_URL_REGEXP.exec(res.data)[0])
    .then(load_openapi_url)
  ))
  .then(extract_paths)
  //.then((v) => (console.log(v), v))
  .then(generate)
  .then(write_files);

function extract_paths(schemas) {
  return schemas.reduce((m, schema) => ({...m, ...schema.paths}), {});
}

/**
 * Write the files file_name => content pair to disk
 * @param {object} files
 */
function write_files(files) {
  Object.keys(files).forEach(file_name => {
    console.log('🔥 Writing %s...', file_name);
    fs.writeFileSync(file_name, files[file_name], 'utf8');
  });
}


/**
 * Generate the Scaleway API Client from OpenAPI Schema definition
 * #YOLO (still better than 3 years-old NodeJS alternative IMHO)
 * @param openapi
 */
function generate(paths) {
  let lib = `const axios = require('axios');


/**
 * ${pack.name} Client Constructor
 * @constructor
 * @param {String} auth_token - Scaleway Authentication Token
 */
function Client(auth_token){
  this.base_url = 'https://api.scaleway.com';
  this.auth_token = auth_token;
}`;
  let readme = `
<div align="center">
  <br><p><strong>${pack.name}</strong> - ${pack.description}</p>
</div>

------------------------------------------------

[![Deps](https://img.shields.io/david/FGRibreau/${pack.name}.svg)](https://david-dm.org/FGRibreau/${pack.name}) [![NPM version](https://img.shields.io/npm/v/${pack.name}.svg)](http://badge.fury.io/js/${pack.name}) [![Downloads](http://img.shields.io/npm/dm/${pack.name}.svg)](https://www.npmjs.com/package/${pack.name})

[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/francois-guillaume-ribreau?utm_source=github&utm_medium=button&utm_term=francois-guillaume-ribreau&utm_campaign=github)  [![available-for-advisory](https://img.shields.io/badge/available%20for%20consulting%20advisory-yes-ff69b4.svg?)](http://bit.ly/2c7uFJq) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg) [![Slack](https://img.shields.io/badge/Slack-Join%20our%20tech%20community-17202A?logo=slack)](https://join.slack.com/t/fgribreau/shared_invite/zt-edpjwt2t-Zh39mDUMNQ0QOr9qOj~jrg)

## ⚡️ Installation

Install with [npm](https://npmjs.org/package/${pack.name}).

    npm install --save ${pack.name}@${pack.version}
 
## 👾 Authentication

Create an API token on [Scaleway admin console here](https://console.scaleway.com/account/organization/credentials).

\`\`\`
const Client = require('${pack.name}');

const api = new Client("YOUR_AUTH_TOKEN_HERE");
\`\`\`

## 📘 [Documentation](https://${pack.name}.netlify.app/${pack.version}/)

${
    Object.keys(paths).reduce((m, path) => {
        Object.keys(paths[path]).forEach(method => {
          m.push(`- [${paths[path][method].operationId}](https://${pack.name}.netlify.app/${pack.version}/Client.html#${paths[path][method].operationId})`);
        })
      return m;
        
    }, []).sort().join('\n')
}

## 🚀 [Examples](./examples)

## 😋 How it works

[lib.js](./lib.js) is fully generated from Scaleway OpenAPI definition files:

${fs.readdirSync(openapi_files_dir).map(openapi_file => `- [${openapi_file}](./${path.join(path.relative(__dirname, openapi_files_dir), openapi_file)})`).join('\n')}

## 😉 Previous work

- https://github.com/moul/node-scaleway
- https://github.com/ignitial/scaleway-promised

## 🤩 You want to support my work?

I maintain this project in my free time, if it helped you, well, I would be grateful to buy a beer thanks to your [paypal](https://paypal.me/fgribreau) or [Bitcoins](https://www.coinbase.com/fgribreau), donation!

[Francois-Guillaume Ribreau](http://fgribreau.com) (npm@fgribreau.com)
`;


  let jsdoc = JSON.stringify({
    'source': {
      'include': ['lib.js', 'package.json', 'README.md'],
    },
    'opts': {
      'template': 'node_modules/docdash',
      'destination': './docs',
      'recurse': true,
    },
    'docdash': {
      'openGraph': {
        'title': pack.description,
        'type': 'website',
        'image': '',
        'site_name': pack.name,
      },
      'meta': {
        'title': `${pack.name} - ${pack.description}`,
        'description': pack.description,
        'keyword': pack.keywords.join(', '),
      },
      search: true,
      'menu': {
        'Github': {
          'href': pack.homepage,
          'target': '_blank',
          'class': 'menu-item',
        },
        'Dev by @FGRibreau': {
          'href': 'https://twitter.com/FGRibreau',
          'target': '_blank',
          'class': 'menu-item',
        },
        'Slack': {
          'href': 'https://join.slack.com/t/fgribreau/shared_invite/zt-edpjwt2t-Zh39mDUMNQ0QOr9qOj~jrg',
          'target': '_blank',
          'class': 'menu-item',
        },
        'Sponsored by Bloc In Bloc': {
          'href': 'https://blocinbloc.com/',
          'target': '_blank',
          'class': 'menu-item',
        },
      },
    },
  }, null, 2);

  Object.keys(paths).forEach(path => {
    Object.keys(paths[path]).forEach(method => {

      const required_parameters = (paths[path][method].parameters || []).filter(p => p.required);

      // when POST/PUT, add required request body properties as well
      if (['post', 'put'].includes(method) && paths[path][method].requestBody && paths[path][method].requestBody.required) {
        const schema = paths[path][method].requestBody.content['application/json'].schema;
        assert(schema.type === 'object');
        required_parameters.push({
            in: 'body',
            name: 'body',
            description: 'Request content',
            required: true,
            schema: schema,
          },
        );
      }


      lib += `

/**
 * ${paths[path][method].summary}
 * @description ${paths[path][method].description}
${required_parameters.map(to_jsdoc_parameter).join('\n')}
 * @param {object?} options axios http request options
 */
Client.prototype.${paths[path][method].operationId} = function ${paths[path][method].operationId}(${required_parameters.map(p => p.name).join(', ')}, options){
  return axios({
    method: ${JSON.stringify(method)},
    url: ${JSON.stringify(path)}${required_parameters.filter(p => p.in === 'path').map(p => `.replace('{${p.name}}', ${p.name})`).join('')},
    baseURL: this.base_url,
    headers: { 'User-Agent': 'node-${pack.name}/${pack.version}', 'X-Auth-Token': this.auth_token },
    params: ${JSON.stringify(required_parameters.filter(p => p.in === 'query').reduce((m, p) => m[p.name] = p.name, {}), null, 2)},
    data: ${required_parameters.filter(p => p.in === 'body').length > 0 ? 'body' : '{}'},
    responseType: 'json',
    ...options
  });      
}`;


    });
  });

  lib += `\nmodule.exports = Client;`;

  return {
    'lib.js': lib,
    'README.md': readme,
    'jsdoc.json': jsdoc,
  };
}


/**
 * @param {object} parameter Open API parameter
 * @returns {string}
 */
function to_jsdoc_parameter(parameter) {

  /**
   * @param {object} parameter Open API parameter
   * @returns {string}
   */
  function param_simple(parameter) {
    return ` * @param {${parameter.schema.type || 'object'}} ${parameter.name} - ${parameter.description || ''}`;
  }

  /**
   * @param {object} parameter Open API parameter
   * @returns {string}
   */
  function param_attribute(parameter) {

    return ` * @param {${parameter.type || 'object'}} ${parameter.parent_name}.${parameter.name} - ${parameter.description || ''}`;
  }

  if (parameter.schema.type === 'object') {
    return [
      param_simple(parameter),

      // list object.{attribute} parameters
      !parameter.schema.properties ? `` : Object.keys(parameter.schema.properties)
        .map(p => param_attribute({
          ...parameter.schema.properties[p],
          parent_name: parameter.name,
          name: p,
        })).join('\n'),
    ].join('\n');
  }

  return param_simple(parameter);
}
