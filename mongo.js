const mongoose = require("mongoose");
const password = process.argv[2];
const url = `mongodb+srv://FullStackRami:FullStackRami@phonebook.0r9xf.mongodb.net/persons?retryWrites=true&w=majority`;

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({})
  .then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} - ${person.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(
      `Added ${process.argv[3]} - number: ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
}
