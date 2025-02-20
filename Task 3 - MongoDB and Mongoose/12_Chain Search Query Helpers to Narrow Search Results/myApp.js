// Load environment variables from a .env file into process.env
require('dotenv').config();

// Debugging: Print the MongoDB connection string to the console
console.log("MONGO_URI:", process.env.MONGO_URI);

// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect(
  "mongodb+srv://Joyline:Joyline123@freecodecamp.b4blf.mongodb.net/?retryWrites=true&w=majority&appName=FreeCodeCamp",
  { useNewUrlParser: true, useUnifiedTopology: true } // Options for better compatibility
);

// Define a schema for the "Person" collection
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // "name" field is required
  age: Number, // "age" field is optional and stores a number
  favoriteFoods: [String] // "favoriteFoods" is an array of strings
});

// Create a Mongoose model based on the schema
const Person = mongoose.model("Person", personSchema);

// Function to create and save a single person document
const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  // Save the document to the database
  newPerson.save((err, data) => {
    if (err) return done(err); // Handle errors
    done(null, data); // Pass the saved document to the callback
  });
};

// Function to create multiple person documents at once
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Function to find all people with a given name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Function to find a single person based on a favorite food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Function to find a person by their ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Function to find a person by ID, update their favorite foods, and save the document
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"; // Food item to add

  // Find the person by ID
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    // Add a new food to the person's favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // Save the updated document
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// Function to find a person by name and update their age
const findAndUpdate = (personName, done) => {
  const ageToSet = 20; // New age to set

  Person.findOneAndUpdate(
    { name: personName }, // Search for a person by name
    { age: ageToSet }, // Update their age
    { new: true }, // Return the updated document
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

// Function to remove a person by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson); // Return the removed document
  });
};

// Function to remove all people with a specific name
const removeManyPeople = (done) => {
  const nameToRemove = "Mary"; // Name of people to delete

  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result); // Return the result of the delete operation
  });
};

// Function to find people who like a specific food, sort, limit results, and exclude age
const queryChain = (done) => {
  const foodToSearch = "burrito"; // Food item to search for

  Person.find({ favoriteFoods: foodToSearch }) // Find people who like the specified food
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit the results to 2 documents
    .select("-age") // Exclude the "age" field from the results
    .exec((err, data) => { // Execute the query
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
 * You completed these challenges, let's go celebrate!
 */

// ----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

// Export functions and the model for use in other files
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
