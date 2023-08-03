
const csv = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
`

const text = `Алушта
Біла Церква
Вінниця
Кропивницький
`
/**
 * accepts text in the csv format and returns function that replaces city names with a string of a certain type
 * @param {*} csv string in the csv format, which contains coordinates, name of the city and its population
 * @returns function that accepts any text and replaces city names with a string of a certain type
 */
let citiesRating = function (csv) {
   let cities = csv
      .split("\n")
      .filter(str => /^(\d{2}.\d{2},){2}([\s]*\p{L})+,\d+,$/gmu.test(str))
      .map(str => (
         str = str.split(","),
         {
            x: str[0],
            y: str[1],
            name: str[2],
            population: str[3]
         })
      )
      .sort((a, b) => a.population - b.population)
      .slice(0, 9)
      .reduce((accumulate, element, rating) => {
         accumulate[element.name] = {
            population: element.population,
            rating: (rating + 1)
         };
         return accumulate;
      }, {});

   let replaceFunction = function (text) {
      let regExp = new RegExp(Object.keys(cities).join("|"), "mgiu");   
      return text.replace(regExp, match => `${match} (${cities[match].rating} місце в ТОП-10 найбільших міст України, населення ${cities[match].population})`);
   }
   return replaceFunction(text);
}

let replacer = citiesRating(csv);

console.log(replacer);