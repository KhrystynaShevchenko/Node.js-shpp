
/**
 * Сonstructor function for the class Product
 * @param {*} id Product's key (unique value)
 */
function Product(id) {

  /**
   * compares a type of the objectToCompare to a type of the passed prototype
   * @param {*} objectToCompare object whose type should be compared to the required one
   * @param {*} prototype the prototype with which the comparison is made
   * @returns true - if the types are the same, false - if not 
   */
  function typeComparator(objectToCompare, prototype) {
    let objectToString = Object.prototype.toString;

    if (objectToString.call(objectToCompare) == objectToString.call(prototype)) {
      return true;
    }
    return false;
  }


  this.id = id;
  this.name = null;
  this.description = null;
  this.price = null;
  this.brand = null;
  this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  Object.defineProperty(this, "sizes", {
    writable: false
  });

  this.activeSize = null;
  this.quantity = null;
  this.date = null;
  this.images = null;
  this.reviews = [];


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

  this.setName = function (name) {
    if (typeComparator(name, "")) {
      this.name = name;
    } else {
      console.log("Name must be a string");
    }
  }

  this.getName = function () {
    return this.name;
  }

  this.setDescription = function (description) {
    if (typeComparator(description, "")) {
      this.description = description;
    } else {
      console.log("Description must be a string");
    }
  }

  this.getDescription = function () {
    return this.description;
  }

  this.setPrice = function (price) {
    if (typeComparator(price, 1)) {
      this.price = price;
    } else {
      console.log("Price must be a number");
    }
  }

  this.getPrice = function () {
    return this.price;
  }

  this.setBrand = function (brand) {
    if (typeComparator(brand, "")) {
      this.brand = brand;
    } else {
      console.log("Brand must be a string");
    }
  }

  this.getBrand = function () {
    return this.brand;
  }

  this.getSizes = function () {
    return this.sizes;
  }

  this.setActiveSize = function (activeSize) {
    if (typeComparator(activeSize, "")) {
      this.activeSize = activeSize;
    } else {
      console.log("ActiveSize must be a string");
    }
  }

  this.getActiveSize = function () {
    return this.activeSize;
  }

  this.setQuantity = function (quantity) {
    if (typeComparator(quantity, 1)) {
      this.quantity = quantity;
    } else {
      console.log("Quantity must be a number");
    }
  }

  this.getQuantity = function () {
    return this.quantity;
  }

  this.setDate = function (date) {
    if (typeComparator(date, new Date())) {
      this.date = date;
    } else {
      console.log("Date must be an Object");
    }
  }

  this.getDate = function () {
    return this.date;
  }

  this.setReviews = function (reviews) {
    if (typeComparator(reviews, [])) {
      this.reviews = reviews;
    } else {
      console.log("Reviews must be an array of odjects");
    }
  }

  this.getReviews = function () {
    return this.reviews;
  }

  this.setImages = function (images) {
    if (typeComparator(images, [])) {
      this.images = images;
    } else {
      console.log("Images must be an array of strings");
    }
  }

  this.getImages = function () {
    return this.images;
  }

  /**
   * Returns the "review" object by the given key
   * @param {*} id unique review key
   * @returns review, which corresponds to the transferred id
   */
  this.getReviewById = function (id) {
    return this.reviews.find(item => item.id == id);
  }

  /**
   * Returns the image by the passed parameter, if the parameter was not passed then returns the first image from the array
   * @param {*} index index of image in the array
   * @returns image at the given index
   */
  this.getImage = function (index) {
    return this.images[index] ?? this.images[0];
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

  /**
   * Adds a "review" object to the "reviews" array
   * @param {*} review object to add
   */
  this.addReview = function (review) {
    if (typeComparator(review, new Review()) && this.reviews.find(item => item.id == review.id) == undefined) {
      this.reviews.push(review)
    } else {
      console.log("Can't add a review");
    }
  }


  /**
   * Removes the "review" object from the "reviews" array by the given key (ID)
   * @param {*} id the key by which the deletion will be performed
   */
  this.deleteReview = function (id) {
    let index = this.reviews.findIndex(item => item.id == id);
    this.reviews.splice(index);
  }

  /**
   * Counts the average rating of a product
   * @returns the average rating
   */
  this.getAverageRating = function () {
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
  }

  this.toString = function() {
    return this.getName();
  }
}

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

  this.toString = function() {
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

//create Products and Reviews to test the code
let productOne = new Product("0");
let productTwo = new Product("2");
let productThree = new Product("3");

let products = [productOne, productTwo, productThree];

let reviewOne = new Review("1");
reviewOne.setRating(2, 5, 10, 8);
let reviewTwo = new Review("2");
reviewTwo.setRating(3, 4, 9, 6);
let reviews = [reviewOne, reviewTwo];

productTwo.setName("Shirt");
productThree.setName("T-shirt");
productTwo.setPrice(68);
productThree.setPrice(5);

let images = ["img1", "img2"];

console.log("!!!!Tests for getters and setters!!!!");

console.log("\n");

productOne.setId("1");
console.log("id must be 1");
console.log("id is " + productOne.getId());
console.log(productOne.getId() === "1" ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setName("Dress");
console.log("Name must be \"Dress\"")
console.log("Name is " + productOne.getName());
console.log(productOne.getName() === "Dress" ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setDescription("The best dress ever");
console.log("Descriprion must be \"The best dress ever\"");
console.log("Description is: " + productOne.getDescription());
console.log(productOne.getDescription() === "The best dress ever" ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setPrice(666);
console.log("Price must be 666");
console.log("Price is " + productOne.getPrice());
console.log(productOne.getPrice() === 666 ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setBrand("The well-known brand");
console.log("Brand must be \"The well-known brand\"");
console.log("Brand is " + productOne.getBrand());
console.log(productOne.getBrand() === "The well-known brand" ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setActiveSize("S");
console.log("Acrive size must be \"S\"");
console.log("Active size is " + productOne.getActiveSize());
console.log(productOne.getActiveSize() === "S" ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setQuantity(10);
console.log("Quantity must be 10");
console.log("Quantity is: " + productOne.getQuantity());
console.log(productOne.getQuantity() === 10 ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setDate(new Date());
console.log(`Date must be ${new Date()}`);
console.log("Date is: " + productOne.getDate());
console.log(productOne.getDate().toString() === new Date().toString() ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setReviews(reviews);
console.log(`Reviews must be \"${reviews.toString()}\"`);
console.log(`Reviews is " + "${productOne.getReviews()}\"`);
console.log(productOne.getReviews().toString() === reviews.toString() ? "The test is passed!" : "The test failed");

console.log("\n");

productOne.setImages(images);
console.log(`Images must be ${images}`);
console.log("Images is " + productOne.getImages());
console.log(productOne.getImages() === images ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getReviewById() function!!!");
console.log(`Review must be \"${reviewOne}\"`);
console.log("Review is: " + productOne.getReviewById("1"));
console.log(productOne.getReviewById("1") === reviewOne ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getImage() function with a parameter!!!");
console.log(`Image must be \"${images[1]}\"`);
console.log("Image is: " + productOne.getImage(1));
console.log(productOne.getImage(1) === images[1] ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getImage() function with an empty parameter!!!");
console.log(`Review must be \"${images[0]}\"`);
console.log("Image is: " + productOne.getImage());
console.log(productOne.getImage() === images[0] ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for addSize() function!!!");
productOne.addSize("XXX");
console.log(`Sizes must be \"XS,S,M,L,XL,XXL,XXX\"`);
console.log("Sizes is: " + productOne.getSizes());
console.log(productOne.getSizes().toString() === "XS,S,M,L,XL,XXL,XXX" ? "The test is passed!" : "The test failed");


console.log("\n");

console.log("!!!Test for deleteSize() function!!!");
productOne.deleteSize(6);
console.log(`Sizes must be \"XS,S,M,L,XL,XXL\"`);
console.log("Sizes is: " + productOne.getSizes());
console.log(productOne.getSizes().toString() === "XS,S,M,L,XL,XXL" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for addReview() function!!!");
productOne.addReview(new Review("3"));
console.log(`Reviews of the ProductOne must be \"Id of the review is: 1, Id of the review is: 2, Id of the review is: 3"`);
console.log("Reviews of the ProductOne is: " + productOne.getReviews());
console.log(productOne.getReviews().toString() === " Id of the review is: 1, Id of the review is: 2, Id of the review is: 3" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for deleteReview() function!!!");
productOne.deleteReview(new Review("3"));
console.log(`Reviews of the ProductOne must be \"Id of the review is: 1, Id of the review is: 2"`);
console.log("Reviews of the ProductOne is: " + productOne.getReviews());
console.log(productOne.getReviews().toString() === " Id of the review is: 1, Id of the review is: 2" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for getAverageRating() function!!!");
console.log("Average rating of the productOne must be 5.875");
console.log("Average rating of the productOne is: " + productOne.getAverageRating());
console.log(productOne.getAverageRating() === 5.875 ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for searchProducts() function!!!");
console.log("Found products must be \"Shirt,T-shirt\"");
console.log("Found products is: " + searchProducts(products, "shirt"));
console.log(searchProducts(products, "shirt").toString() === "Shirt,T-shirt" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for sortProducts() function (by price)!!!");
console.log("New product order must be \"T-shirt,Shirt,Dress\"");
sortProducts(products, "price");
console.log("New product order is: " + products);
console.log(products.toString() === "T-shirt,Shirt,Dress" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for sortProducts() function (by name)!!!");
console.log("New product order must be \"Dress,Shirt,T-shirt\"");
sortProducts(products, "name");
console.log("New product order is: " + products);
console.log(products.toString() === "Dress,Shirt,T-shirt" ? "The test is passed!" : "The test failed");

console.log("\n");

console.log("!!!Test for sortProducts() function (by id)!!!");
console.log("New product order must be \"Dress,Shirt,T-shirt\"");
sortProducts(products, "id");
console.log("New product order is: " + products);
console.log(products.toString() === "Dress,Shirt,T-shirt" ? "The test is passed!" : "The test failed");

