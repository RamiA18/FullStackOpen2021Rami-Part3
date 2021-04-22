require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person.js");
const app = express();

morgan.token("person", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  } else {
    return null;
  }
});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

const generateNewId = () => {
  return Math.floor(Math.random() * 10000);
};

app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({}).then((persons) => {
    res.send(
      `<p> Phonebook has information of ${persons.length} people as of now </p><p>Current time: ${date}</p>`
    );
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (_req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (_req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

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

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateNewId(),
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson.toJSON()))
    .catch((error) => next(error));
});

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, _req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "Improper id format" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
