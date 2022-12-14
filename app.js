const express = require('express')
const serveIndex = require('./serveIndex/index')

let sharing_path = "/app/sharing";
let template_path = "/app/directory.html";
// let sharing_path = "/Users/leopaul/Desktop/pu";
// let template_path = "directory.html";

let filter = function (filename, index, files, dir){
  let to_avoid = ["@eadir","#snapshot"];
  for (const str of to_avoid) {
    if (filename.toLowerCase().includes(str)) return false;
  }
  return true;
}

const app = express()
app.use(
  '/',
  express.static("public"),
  express.static(sharing_path),
  serveIndex(sharing_path, {'icons':true, 'template':template_path, 'filter':filter})
)

const port = process.env.PORT || 8080;
app.listen( port, ()=>console.log(`listening on port: ${port}...`) );


