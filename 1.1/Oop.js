
/**
 * Сonstructor function for the class Product
 * @param {*} id Product's key (unique value)
 */
function AbstractProduct(id) {

   if (this.constructor === AbstractProduct) {
      throw new Error("Instance of Abstract class cannot be instantiated");
   }

   this.id = id;
   this.name = null;
   this.description = null;
   this.price = null;
   this.brand = null;
   this.quantity = null;
   this.date = null;
   this.images = null;
   this.reviews = [];

}

Object.assign(AbstractProduct.prototype, {
   /**
    * compares a type of the objectToCompare to a type of the passed prototype
    * @param {*} objectToCompare object whose type should be compared to the required one
    * @param {*} prototype the prototype with which the comparison is made
    * @returns true - if the types are the same, false - if not 
    */
   typeComparator(objectToCompare, prototype) {
      let objectToString = Object.prototype.toString;

      if (objectToString.call(objectToCompare) == objectToString.call(prototype)) {
         return true;
      }
      return false;
   },

   setId(id) {
      if (this.typeComparator(id, "")) {
         this.id = id;
      } else {
         console.log("Id must be a string");
      }
   },

   getId() {
      return this.id;
   },

   setName(name) {
      if (this.typeComparator(name, "")) {
         this.name = name;
      } else {
         console.log("Name must be a string");
      }
   },

   getName() {
      return this.name;
   },

   setDescription(description) {
      if (this.typeComparator(description, "")) {
         this.description = description;
      } else {
         console.log("Description must be a string");
      }
   },

   getDescription() {
      return this.description;
   },

   setPrice(price) {
      if (this.typeComparator(price, 1)) {
         this.price = price;
      } else {
         console.log("Price must be a number");
      }
   },

   getPrice() {
      return this.price;
   },

   setBrand(brand) {
      if (this.typeComparator(brand, "")) {
         this.brand = brand;
      } else {
         console.log("Brand must be a string");
      }
   },

   getBrand() {
      return this.brand;
   },

   setQuantity(quantity) {
      if (this.typeComparator(quantity, 1)) {
         this.quantity = quantity;
      } else {
         console.log("Quantity must be a number");
      }
   },

   getQuantity() {
      return this.quantity;
   },

   setDate(date) {
      if (this.typeComparator(date, new Date())) {
         this.date = date;
      } else {
         console.log("Date must be an Object");
      }
   },

   getDate() {
      return this.date;
   },

   setReviews(reviews) {
      if (this.typeComparator(reviews, [])) {
         this.reviews = reviews;
      } else {
         console.log("Reviews must be an array of odjects");
      }
   },

   getReviews() {
      return this.reviews;
   },

   setImages(images) {
      if (this.typeComparator(images, [])) {
         this.images = images;
      } else {
         console.log("Images must be an array of strings");
      }
   },

   getImages() {
      return this.images;
   },

   /**
    * Returns the "review" object by the given key
    * @param {*} id unique review key
    * @returns review, which corresponds to the transferred id
    */
   getReviewById(id) {
      return this.reviews.find(item => item.id == id);
   },

   /**
    * Returns the image by the passed parameter, if the parameter was not passed then returns the first image from the array
    * @param {*} index index of image in the array
    * @returns image at the given index
    */
   getImage(index) {
      return this.images[index] ?? this.images[0];
   },


   /**
    * Adds a "review" object to the "reviews" array
    * @param {*} review object to add
    */
   addReview(review) {
      if (this.typeComparator(review, new Review()) && this.reviews.find(item => item.id == review.id) == undefined) {
         this.reviews.push(review)
      } else {
         console.log("Can't add a review");
      }
   },


   /**
    * Removes the "review" object from the "reviews" array by the given key (ID)
    * @param {*} id the key by which the deletion will be performed
    */
   deleteReview(id) {
      let index = this.reviews.findIndex(item => item.id == id);
      this.reviews.splice(index);
   },

   /**
    * Counts the average rating of a product
    * @returns the average rating
    */
   getAverageRating() {
      let averageRating = 0;

      for (let review of this.reviews) {
         let numberOfCharacteristic = 0;
         let averageRatingOfOneReview = 0;
         for (let characteristic in review.rating) {
            numberOfCharacteristic++;
            averageRatingOfOneReview += review.rating[characteristic];
         }
         averageRating += averageRatingOfOneReview / numberOfCharacteristic;
      }
      return averageRating / this.reviews.length;
   },

   toString() {
      return this.getName();
   },

   getFullInformation() {
      console.log(JSON.stringify(this, null, "\n"));
   },

   getPriceForQuantity(quantity) {
      let amount = this.getPrice() * quantity;
      console.log("$" + Math.round(parseFloat(amount) * 100) / 100);
      return amount;
   },

   getOrSetAnyProperty(property, valueOfProperty) {
      if(valueOfProperty === undefined) {
         return this[property];
      } else {
         this[property] = valueOfProperty;
      }
   }
})


/**
 * constructor for the Review object
 * @param {*} id Review key (unique value)
 */
function Review(id) {
   this.id = id;
   this.author = null;
   this.date = null;
   this.comment = null;
   this.rating = {
      'service': 0,
      'price': 0,
      'value': 0,
      'quality': 0
   };

   this.setId = function (id) {
      if (typeComparator(id, "")) {
         this.id = id;
      } else {
         console.log("Id must be a string");
      }
   }

   this.getId = function () {
      return this.id;
   }

   this.setAuthor = function (author) {
      if (typeComparator(author, "")) {
         this.author = author;
      } else {
         console.log("Author must be a string");
      }
   }

   this.getAuthor = function () {
      return this.author;
   }

   this.setDate = function (date) {
      if (typeComparator(date, new Date())) {
         this.date = date;
      } else {
         console.log("Date must be a Date");
      }
   }

   this.getDate = function () {
      return this.date;
   }

   this.setComment = function (comment) {
      if (typeComparator(comment, "")) {
         this.comment = comment;
      } else {
         console.log("Comment must be a string");
      }
   }

   this.getComment = function () {
      return this.comment;
   }

   this.setRating = function (service, price, value, quality) {
      this.rating.service = service;
      this.rating.price = price;
      this.rating.value = value;
      this.rating.quality = quality;
   }

   this.getRating = function () {
      return this.rating;
   }

   this.toString = function () {
      return " " + "Id of the review is: " + this.id;
   }

}

/**
 * searches for objects that contain the text "search" in the title or in the description
 * @param {*} products array of products
 * @param {*} search text to be searched
 * @returns 
 */
let searchProducts = function (products, search) {
   let arrayOfSuitableProducts = [];
   for (let product of products) {
      for (let key in product) {
         if (key != undefined && (key == "name" || key == "description") && product[key] != undefined) {
            if (product[key].toLowerCase().indexOf(search.toLowerCase()) != -1) {

               arrayOfSuitableProducts.push(product);

               continue;
            }
         }
      }
   }

   return arrayOfSuitableProducts;
}


/**
 * sorts the products in the array by the given parameter "sortRule"
 * @param {*} products array of products
 * @param {*} sortRule attribute to sort by
 */
let sortProducts = function (products, sortRule) {


   products.sort((a, b) => {

      if (a[sortRule] > b[sortRule]) {
         return 1;
      } else if (a[sortRule] < b[sortRule]) {
         return -1;
      }

      return 0;
   });
}

function Clothes(id) {
   AbstractProduct.call(this, id);
   this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
   this.activeSize = null;
   this.material = null;
   this.color = null;

   Object.defineProperty(this, "sizes", {
      writable: false
   });


   this.getSizes = function () {
      return this.sizes;
   }

   this.setActiveSize = function (activeSize) {
      if (this.typeComparator(activeSize, "")) {
         this.activeSize = activeSize;
      } else {
         console.log("ActiveSize must be a string");
      }
   }

   this.getActiveSize = function () {
      return this.activeSize;
   }

   this.setMaterial = function (material) {
      if (this.typeComparator(material, "")) {
         this.material = material;
      } else {
         console.log("Material must be a string");
      }
   }

   this.getMaterial = function () {
      return this.material;
   }

   this.setColor = function (color) {
      if (this.typeComparator(color, "")) {
         this.color = color;
      } else {
         console.log("Color must be a string");
      }
   }

   this.getColor = function () {
      return this.color;
   }

   /**
  * Adds a new value to the "sizes" array
  * @param {*} size value to be added
  */
   this.addSize = function (size) {
      this.sizes.push(size);
   }

   /**
    * Removes a value from the "sizes" array by the given key
    * @param {*} index the index at which to remove the element
    */
   this.deleteSize = function (index) {
      this.sizes.splice(index, 1);
   }


}

function Electronics(id) {
   AbstractProduct.call(this, id);
   this.warranty = null;
   this.power = null;

   this.setWarranty = function (warranty) {
      if (this.typeComparator(warranty, 1)) {
         this.warranty = warranty;
      } else {
         console.log("Warranty must be a number");
      }
   }

   this.getWarranty = function () {
      return this.warranty;
   }

   this.setPower = function (power) {
      if (this.typeComparator(power, 1)) {
         this.power = power;
      } else {
         console.log("Power must be a number");
      }
   }

   this.getPower = function () {
      return this.power;
   }
}
Object.setPrototypeOf(Clothes.prototype, AbstractProduct.prototype);
Object.setPrototypeOf(Electronics.prototype, AbstractProduct.prototype);


let dress = new Clothes("1");
let cap = new Clothes("2");
let jeans = new Clothes("3");


dress.getFullInformation();

let products = [dress, cap, jeans];

let reviewOne = new Review("1");
reviewOne.setRating(2, 5, 10, 8);
let reviewTwo = new Review("2");
reviewTwo.setRating(3, 4, 9, 6);
let reviews = [reviewOne, reviewTwo];

cap.setName("Cap");
jeans.setName("Jeans");
cap.setPrice(68);
jeans.setPrice(5);

let images = ["img1", "img2"];

console.log("!!!!Tests for getters and setters!!!!");

console.log("\n");

dress.setId("1");
console.log("id must be 1");
console.log("id is " + dress.getId());
console.log(dress.getId() === "1" ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setName("Dress");
console.log("Name must be \"Dress\"")
console.log("Name is " + dress.getName());
console.log(dress.getName() === "Dress" ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setDescription("The best dress ever");
console.log("Descriprion must be \"The best dress ever\"");
console.log("Description is: " + dress.getDescription());
console.log(dress.getDescription() === "The best dress ever" ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setPrice(666);
console.log("Price must be 666");
console.log("Price is " + dress.getPrice());
console.log(dress.getPrice() === 666 ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setBrand("The well-known brand");
console.log("Brand must be \"The well-known brand\"");
console.log("Brand is " + dress.getBrand());
console.log(dress.getBrand() === "The well-known brand" ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setActiveSize("S");
console.log("Acrive size must be \"S\"");
console.log("Active size is " + dress.getActiveSize());
console.log(dress.getActiveSize() === "S" ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setQuantity(10);
console.log("Quantity must be 10");
console.log("Quantity is: " + dress.getQuantity());
console.log(dress.getQuantity() === 10 ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setDate(new Date());
console.log(`Date must be ${new Date()}`);
console.log("Date is: " + dress.getDate());
console.log(dress.getDate().toString() === new Date().toString() ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setReviews(reviews);
console.log(`Reviews must be \"${reviews.toString()}\"`);
console.log(`Reviews is " + "${dress.getReviews()}\"`);
console.log(dress.getReviews().toString() === reviews.toString() ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setImages(images);
console.log(`Images must be ${images}`);
console.log("Images is " + dress.getImages());
console.log(dress.getImages() === images ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setMaterial("silk");
console.log("Material must be silk");
console.log("Material is: " + dress.getMaterial());
console.log(dress.getMaterial() === "silk" ? "The test is passed!" : "The test failed");

console.log("\n");

dress.setColor("green");
console.log("Color must be green");
console.log("Color is: " + dress.getColor());
console.log(dress.getColor() === "green" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getReviewById() function!!!");
console.log(`Review must be \"${reviewOne}\"`);
console.log("Review is: " + dress.getReviewById("1"));
console.log(dress.getReviewById("1") === reviewOne ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getImage() function with a parameter!!!");
console.log(`Image must be \"${images[1]}\"`);
console.log("Image is: " + dress.getImage(1));
console.log(dress.getImage(1) === images[1] ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getImage() function with an empty parameter!!!");
console.log(`Review must be \"${images[0]}\"`);
console.log("Image is: " + dress.getImage());
console.log(dress.getImage() === images[0] ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for addSize() function!!!");
dress.addSize("XXX");
console.log(`Sizes must be \"XS,S,M,L,XL,XXL,XXX\"`);
console.log("Sizes is: " + dress.getSizes());
console.log(dress.getSizes().toString() === "XS,S,M,L,XL,XXL,XXX" ? "The test is passed!" : "The test failed");


console.log("\n");

console.log("!!!Test for deleteSize() function!!!");
dress.deleteSize(6);
console.log(`Sizes must be \"XS,S,M,L,XL,XXL\"`);
console.log("Sizes is: " + dress.getSizes());
console.log(dress.getSizes().toString() === "XS,S,M,L,XL,XXL" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for addReview() function!!!");
dress.addReview(new Review("3"));
console.log(`Reviews of the ProductOne must be \"Id of the review is: 1, Id of the review is: 2, Id of the review is: 3"`);
console.log("Reviews of the ProductOne is: " + dress.getReviews());
console.log(dress.getReviews().toString() === " Id of the review is: 1, Id of the review is: 2, Id of the review is: 3" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for deleteReview() function!!!");
dress.deleteReview(new Review("3"));
console.log(`Reviews of the ProductOne must be \"Id of the review is: 1, Id of the review is: 2"`);
console.log("Reviews of the ProductOne is: " + dress.getReviews());
console.log(dress.getReviews().toString() === " Id of the review is: 1, Id of the review is: 2" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getAverageRating() function!!!");
console.log("Average rating of the productOne must be 5.875");
console.log("Average rating of the productOne is: " + dress.getAverageRating());
console.log(dress.getAverageRating() === 5.875 ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getPriceForQuantity() function!!!");
console.log("Price must be $2664");
console.log("Price is: " + dress.getPriceForQuantity(4));
console.log(dress.getPriceForQuantity(4) === 2664 ? "The test is passed!" : "The test failed");



console.log("\n");

console.log("!!!Test for getOrSetAnyProperty() function!!!");
console.log("Price must be 5");
console.log("Price is: " + dress.getOrSetAnyProperty("price", 5));
console.log(dress.getOrSetAnyProperty("price") === 5 ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Tests for only Electronics function!!!");
let laptop = new Electronics("1");
laptop.setWarranty(123456);
laptop.setPower(654321);

laptop.getFullInformation();


