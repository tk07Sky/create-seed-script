require('dotenv').config();
var fs = require('fs');
var path = require('path');

var config = JSON.parse(
  fs.readFileSync(
    path.resolve( __dirname , ".clasp.json.sample" )
  )
);

config.scriptId = process.env.SCRIPT_ID;

fs.writeFileSync(
  path.resolve( __dirname , ".clasp.json" ),
  JSON.stringify(config, null, '  '),
  "utf-8"
);
