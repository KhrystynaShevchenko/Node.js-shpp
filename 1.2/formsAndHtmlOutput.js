

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

   console.log(
      `HTTP/1.1 ${statusCode} ${statusMessage}
${headers}
      
${body}`);
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
   let login;
   let password;

   if ($method === "POST" && $uri === "/api/checkLoginAndPassword" && $headers["Content-Type"] === "application/x-www-form-urlencoded") {
      login = $body.split("&")[0].split("=")[1];
      password = $body.split("&")[1].split("=")[1];
      [statusCode, statusMessage, $body] = readFile(login, password);
   } else if ($uri !== "/api/checkLoginAndPassword") {
      statusCode = 404;
      statusMessage = "Not Found";
      $body = "not found"
   } else if ($headers["Content-Type"] !== "application/x-www-form-urlencoded") {
      statusCode = 400;
      statusMessage = "Bad Request";
      $body = "not found";
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
 * accepts login and password, reads file and return status code, status message, and body to create http response
 * @param {*} login 
 * @param {*} password 
 * @returns 
 */
let readFile = function(login, password) {
   let file;
   try {
      file = require("fs").readFileSync("passwords.txt");
      if (file.toString().includes(`${login}:${password}`)) {
         return [200, "OK", `<h1 style="color:green">FOUND</h1>`];
      } else {
         return[401, "Unauthorized", "not found"];
      }
   } catch {
      return[500, "Internal Server Error", "not found"];
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
