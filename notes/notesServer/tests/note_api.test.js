const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/note')
const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes.map((note) => new Note(note))
  await Promise.all(noteObjects.map((note) => note.save()))
})

describe('When there are initially some notes saved', () => {
  test('notes are returned as JSON', async () => {
    console.log('in test')
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('all notes are returned', async () => {
    console.log('in test')
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((r) => r.content)
    expect(contents).toContain('Browser can execute only JavaScript')
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with 404 if note does not exist', async () => {
    const id = await helper.nonExistingId()

    await api.get(`/api/notes/${id}`).expect(404)
  })

  test('fails with 400 if given id is invalid', async () => {
    const invalidId = '124141413'

    await api.get(`/api/notes/${invalidId}`).expect(400)
  })
})

describe('addition of new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making new calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    const contents = notesAtEnd.map((r) => r.content)
    expect(contents).toContain('async/await simplifies making new calls')
  })

  test('fails if data is invalid', async () => {
    const newNote = {
      important: true,
    }

    await api.post('/api/notes').send(newNote).expect(400)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)
    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(notesAtStart.length - 1)
    const contents = notesAtEnd.map((r) => r.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
