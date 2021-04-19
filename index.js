const express = require('express')
const app = express()

app.use(express.json())

let persons = [
      { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
      },
      { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
      },
      { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
      },
      { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
      }
    ]

    const generateNewId = () => {
      return Math.floor(Math.random() * 10000);
    }
    
    app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
      }
  })
  
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
  })
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const filter = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number is missing' 
        })
      }

    if (filter) {
        return response.status(400).json({ 
          error: 'Data already existing' 
        })
      }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateNewId(),
    }
  
    persons = persons.concat(person)
    response.json(person)
  })
  
  app.get('/info', (request, response) => {
    const allPersons = persons.length
    const date = new Date()
    response.send('<p>Phonebook has info for ' + allPersons + ' persons </p> <p>' + date + '</p>' )
  })

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})