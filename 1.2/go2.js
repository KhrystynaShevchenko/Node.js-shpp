// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
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
console.log(JSON.stringify(http, undefined, 2));
