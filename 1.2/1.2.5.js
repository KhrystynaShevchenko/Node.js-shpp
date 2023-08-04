//import the path module to check if the file path is safe 
const path = require("path");

function readHttpLikeInput() {
   var fs = require("fs");
   var res = "";
   var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
   let was10 = 0;
   for (; ;) {
      try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
      if (buffer[0] === 10 || buffer[0] === 13) {
         if (was10 > 10)
            break;
         was10++;
      } else
         was10 = 0;
      res += new String(buffer);
   }

   return res;
}

let contents = readHttpLikeInput();

/**
 * accepts elements of the HTTP response and creates string that contains HTTP response 
 * @param {*} statusCode HTTP status code indicating the success of the request or the reason for the failure
 * @param {*} statusMessage short description of the status code
 * @param {*} headers additional information for http response
 * @param {*} body containing the forwarded resource
 */
function outputHttpResponse(statusCode, statusMessage, headers, body) {

   console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\r\n${headers}\r\n\r\n${body}`);
}

/**
* accepts elements of the HTTTP request and processes them to create HTTP response
 * @param {*} $method method of the HTTP request
 * @param {*} $uri uri of the HTTP request
 * @param {*} $headers headers of the HTTP request
 * @param {*} $body body of the HTTP request
 */
function processHttpRequest($method, $uri, $headers, $body) {
   let statusCode;
   let statusMessage;
   let path = $headers["Host"].split(".")[0];
   if ($uri === "/") $uri = "/index.html";
   let filePath = `${path}${$uri}`;


   if (!isPathSafe(filePath)) {
      statusCode = 403;
      statusMessage = "Forbidden";
      $body = "Access to the specified path is forbidden";
   } else if ($method === "GET" && $headers["Host"] === "student.shpp.me" || $headers["Host"] === "another.shpp.me") {
      [statusCode, statusMessage, $body] = readFile(filePath);
   } else {
      statusCode = 404;
      statusMessage = "Not Found";
      $body = "not found"
   }

   $headers =
      `Date: ${new Date()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${$body.length}
Connection: Closed
Content-Type: text/html; charset=utf-8`;

   outputHttpResponse(statusCode, statusMessage, $headers, $body);
}

/**
 * Checks if the given file path is safe and within the user's home directory.
 * @param {string} filePath - The file path to be checked.
 * @returns {boolean} - True if the file path is safe, false otherwise.
 */
function isPathSafe(filePath) {
   //Get the absolute path to the file.
   const absolutePath = path.resolve(filePath);

   //Get the user's home directory .
   const homeDir = path.resolve(process.env.HOME || process.env.USERPROFILE);

   //Compare the paths to determine if the file is within the home directory.
   const isSafe = absolutePath.startsWith(homeDir);

   return isSafe;
}


/**
 * accepts path to the file, reads file and return status code, status message, and body to create http response
 * @param {*} path 
 * @returns 
 */
let readFile = function (path) {
   let file;
   try {
      file = require("fs").readFileSync(path);
      return [200, "OK", file.toString()];
   } catch {
      return [404, "Not found", "not found"];
   }
}

/**
 * accepts string with a HTTP request and parses it 
 * @param {*} string that contains HTTP request
 * @returns object that includes such element as method, uri, headers, body
 */
function parseTcpStringAsHttpRequest(string) {

   let arrayOfLines = string.split("\n");
   return {
      method: arrayOfLines[0].split(" ")[0],
      uri: arrayOfLines[0].split(" ")[1],
      headers: arrayOfLines
         .filter(line => line.includes(":"))
         .reduce((accumulate, line) => {
            line = line.split(": "),
               accumulate[line[0]] = line[1];
            return accumulate;
         }, {}),
      body: string.split("\n\n")[1],
   };
}


http = parseTcpStringAsHttpRequest(contents);
http = processHttpRequest(http.method, http.uri, http.headers, http.body);
