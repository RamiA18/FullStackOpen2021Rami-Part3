require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require('./models/person.js')
// const mongoose = require('mongoose')
// const url = `mongodb+srv://FullStackRami:FullStackRami@phonebook.0r9xf.mongodb.net/persons?retryWrites=true&w=majority`;

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: Number,
//   id: Number,
// });

// const Person = mongoose.model("Person", personSchema);


const app = express();
app.use(express.static("build"));

app.use(cors());

morgan.token("person", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return null;
  }
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const generateNewId = () => {
  return Math.floor(Math.random() * 10000);
};

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});



app.post('/api/persons', (req, res) => {
  const body = req.body
  const filter = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (!body.name) {
     return res.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  if (filter) {
    return res.status(400).json({
      error: "Data already existing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateNewId(),

  })

  person.save()
    .then(savedPerson => { res.json(savedPerson.toJSON()) })
})


// app.post("/api/persons", (req, res) => {
//   const body = req.body;
//   const filter = persons.find(
//     (person) => person.name.toLowerCase() === body.name.toLowerCase()
//   );

//   if (!body.name) {
//     return res.status(400).json({
//       error: "name is missing",
//     });
//   }

//   if (!body.number) {
//     return res.status(400).json({
//       error: "number is missing",
//     });
//   }

//   if (filter) {
//     return res.status(400).json({
//       error: "Data already existing",
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateNewId(),
//   };

//   persons = persons.concat(person);
//   res.json(person);
// });

app.get("/info", (req, res) => {
  const allPersons = persons.length;
  const date = new Date();
  res.send(
    "<p>Phonebook has info for " +
      allPersons +
      " persons </p> <p>" +
      date +
      "</p>"
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
