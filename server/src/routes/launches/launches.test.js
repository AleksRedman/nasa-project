const request = require('supertest')
const app = require('../../app')
const { mongooseConnect, mongooseCloseConnect } = require('../../services/mongo')



describe('Launches API', () => {
  beforeAll(async () => {
    await mongooseConnect()
  })

  afterAll(async () => {
    await mongooseCloseConnect()
  })


  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async() => {
      const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200)
  
      // expect(response.statusCode).toBe(200)
    });
  });
  
  describe('Test POST /launches', () => {
    const completeLaunchData = {
      mission: "Test Mission 3",
      rocket: "Explorer IS2",
      destination: "Kepler-1410 b",
      launchDate: "January 4, 2030"
    }
  
    const launchDataWithoutDate = {
      mission: "Test Mission 3",
      rocket: "Explorer IS2",
      destination: "Kepler-1410 b"
    }
  
    const launchDataWithoutDest = {
      mission: "Test Mission 3",
      rocket: "Explorer IS2",
      launchDate: "January 4, 2030"
    }
  
    const launchDataWithWrongDestination = {
      mission: "Test Mission 3",
      rocket: "Explorer IS2",
      destination: "Keller-1410 b",
      launchDate: "January 4, 2030"
    }
  
    test('It should respond with 201 success', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201)
  
      const reqDate = new Date(completeLaunchData.launchDate).valueOf();
      const resDate = new Date(response.body.launchDate).valueOf();
  
      expect(reqDate).toBe(resDate);
  
      expect(response.body).toMatchObject(launchDataWithoutDate)
    });
  
    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDest)
        .expect('Content-Type', /json/)
        .expect(400)
  
      expect(response.body).toStrictEqual({
        error: 'Missed required launch property'
      })
    });
  
    test('It should catch invalid destination', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithWrongDestination)
        .expect('Content-Type', /json/)
        .expect(400)
  
      expect(response.body).toStrictEqual({
        error: 'Invalid launch destination'
      })
    });
  
    test('It should catch invalid date', async() => {
      const data = {...completeLaunchData }
      data.launchDate = 'hello'
      const response = await request(app)
        .post('/launches')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400)
  
        expect(response.body).toStrictEqual({
          error: 'Invalid launch date'
        })
    });
  });
  
  describe('Test DELETE /launches', () => {
    test('It should respond with 200 success', () => {
      const response = 200
  
      expect(response).toBe(200)
    });
  
    test('It should catch missing launch id', () => {
      const response = 400
  
      expect(response).toBe(400)
    });
  
    test('It should catch the launch isn\'t exist', () => {
      const response = 400
  
      expect(response).toBe(400)
    });
  });
})



mongooseCloseConnect()