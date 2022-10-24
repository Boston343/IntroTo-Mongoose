import mongoose from "mongoose";

// -----------------------------------------------------------------------------------
// Fruit example
// this will connect to the db "fruitsDB", and will create it if it doesn't already exist
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
});

// mongoose will auto make it plural "fruits"
const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid fruit.",
});

// save your new fruit into the database
apple.save();

const banana = new Fruit({
    name: "banana",
    rating: 10,
    review: "Best.",
});

const kiwi = new Fruit({
    name: "kiwi",
    rating: 6,
    review: "Alright, a lot of effort for little gain.",
});

const blueberry = new Fruit({
    name: "blueberry",
    rating: 9,
    review: "Superfood!",
});

blueberry.save();

// -----------------------------------------------------------------------------------
// insert many example
// Fruit.insertMany([banana, kiwi], (err, fruits) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fruits);
//     }
// });

// -----------------------------------------------------------------------------------
// Person example, and relationship example

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema,
});

// mongoose will auto make it plural "fruits"
const Person = mongoose.model("Person", peopleSchema);

// const john = new Person({
//     name: "John",
//     age: 37,
// });

const amy = new Person({
    name: "Amy",
    age: 12,
    favoriteFruit: banana,
});

// save your new person into the database
// john.save();
// amy.save();

// -----------------------------------------------------------------------------------
// deleteOne example. This is synchronous and uses "await" rather than a callback function
const deletedFruit = await Fruit.deleteOne({ name: "Apple" });
if (deletedFruit.deletedCount === 1) {
    console.log("Apple was deleted.");
} else {
    console.log("There was an error and Apple was not deleted.");
}

// -----------------------------------------------------------------------------------
// deleteMany. This is synchronous and uses "await" rather than a callback function
// const deletedPeople = await Person.deleteMany({ name: "John" });
// if (deletedPeople.deletedCount >= 1) {
//     console.log(deletedPeople.deletedCount + " Johns were deleted.");
// } else {
//     console.log("There was an error and Johns were not deleted.");
// }

// -----------------------------------------------------------------------------------
// Find example. "fruits" is an array of objects
Fruit.find((err, fruits) => {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();

        fruits.forEach((fruit) => {
            console.log(fruit.name);
        });
    }
});

// -----------------------------------------------------------------------------------
// Update example. These are async and for some reason this needs to be after find function...
// Fruit.updateOne({ name: "banana" }, { rating: 8 }, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated the document");
//     }
// });

Person.updateOne({ name: "John" }, { favoriteFruit: blueberry }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated the document");
    }
});
