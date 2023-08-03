function Validator() {
   this.validateEmail = function(string) {
      let regexp =/^\w(?<!_)[-.+A-Za-z]+@[.!$%&’*+/=?^_A-Za-z\d]{1,15}\.[A-Za-z]{1,5}$/;
      if(string.search(regexp) === 0) {
         return true;
      } 
      return false;
   }

   this.validatePhone = function(string) {
      let regexp = /^(\+38)?[\s-]*\(?([\s-]*\d){3}\)?([\s-]*\d){7}$/;
      if(string.search(regexp) === 0 && string.length <= 25) {
         return true;
      } 
      return false;
   }

   this.validatePassword = function(string) {
      let regexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d_]{8,}$/;
      if(string.search(regexp) === 0) {
         return true;
      }
      return false;
   }
}

let validator = new Validator();

console.log("Tests for validateEmail() function:");

console.log("\n");

console.log("Must be true!");
console.log(validator.validateEmail("fi@secondpart.end"));
console.log(validator.validateEmail("first-part@.se=cond%p.art.end"));
console.log(validator.validateEmail("first.part@se=cond%part.r"));

console.log("\n");

console.log("Must be false!");
console.log(validator.validateEmail("f@secondart.end,"));
console.log(validator.validateEmail("first-part@.se=cond@part.end"));
console.log(validator.validateEmail("-firstpart@.se=cond%.enddeded"));
console.log(validator.validateEmail("firs_tpart@.se.en"));
console.log(validator.validateEmail("firstpart@.se.enddeded"));
console.log(validator.validateEmail("_firstpart@.sw.emcm"));

console.log("\n");

console.log("Tests for validatePhone() function:");

console.log("\n");

console.log("Must be true!");
console.log(validator.validatePhone("+38 (099) 567 8901"));
console.log(validator.validatePhone("+38 099 5 6 7 8 9  01"));
console.log(validator.validatePhone("(09-9) 567-890-1"));
console.log(validator.validatePhone("--  (099) 567 890-1"));


console.log("\n");

console.log("Must be false!");
console.log(validator.validatePhone("+38 (099) 567 8901 0"));
console.log(validator.validatePhone("+38 099 a0000000"));
console.log(validator.validatePhone("+38 (0989) 567 8901"));
console.log(validator.validatePhone("+48 (0989) 567 8901"));
console.log(validator.validatePhone("+38 (099) 567 890         1"));

console.log("\n");

console.log("Tests for validatePassword() function:");

console.log("\n");

console.log("Must be true!");
console.log(validator.validatePassword("C00l_Pass"));
console.log(validator.validatePassword("SupperPas1"));

console.log("\n");

console.log("Must be false!");
console.log(validator.validatePassword("Cool_pass"));
console.log(validator.validatePassword("C00l"));


