const request = require('supertest');
const app = require('../index.js');

describe('Krishi Suvidha Core APIs', () => {
  // Increase timeout for slower environments
  jest.setTimeout(20000);

  describe('POST /api/soil-analysis', () => {
    it('should return analysis and recommendations for valid payload', async () => {
      const res = await request(app)
        .post('/api/soil-analysis')
        .send({
          location: 'Delhi',
          cropType: 'wheat',
          pH: 6.5,
          nitrogen: 'low',
          phosphorus: 'medium',
          potassium: 'high'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('analysis');
      expect(res.body.analysis).toMatchObject({
        pH: 6.5,
        nitrogen: 'low',
        phosphorus: 'medium',
        potassium: 'high'
      });
      expect(Array.isArray(res.body.recommendations)).toBe(true);
      // should include N recommendation due to "low"
      expect(res.body.recommendations.join(' ')).toMatch(/nitrogen/i);
      expect(['Good', 'Needs Improvement']).toContain(res.body.soilHealth);
    });

    it('should validate missing location', async () => {
      const res = await request(app)
        .post('/api/soil-analysis')
        .send({
          pH: 6.2,
          nitrogen: 'low',
          phosphorus: 'low',
          potassium: 'low'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should suggest lime for acidic soil (pH below 6.0)', async () => {
      const res = await request(app)
        .post('/api/soil-analysis')
        .send({
          location: 'Jaipur',
          cropType: 'wheat',
          pH: 5.5,
          nitrogen: 'medium',
          phosphorus: 'medium',
          potassium: 'medium'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.recommendations.join(' ')).toMatch(/acidic/i);
      expect(res.body.recommendations.join(' ')).toMatch(/lime/i);
    });

    it('should suggest sulfur for alkaline soil (pH above 7.5)', async () => {
      const res = await request(app)
        .post('/api/soil-analysis')
        .send({
          location: 'Pune',
          cropType: 'wheat',
          pH: 8.0,
          nitrogen: 'medium',
          phosphorus: 'medium',
          potassium: 'medium'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.recommendations.join(' ')).toMatch(/alkaline/i);
      expect(res.body.recommendations.join(' ')).toMatch(/sulfur/i);
    });

    it('should classify soil health as Good for pH in [6.0, 7.5]', async () => {
      const res = await request(app)
        .post('/api/soil-analysis')
        .send({
          location: 'Kolkata',
          pH: 6.0,
          nitrogen: 'high',
          phosphorus: 'high',
          potassium: 'high'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.soilHealth).toBe('Good');
    });
  });

  describe('GET /api/weather', () => {
    it('should return weather data for a valid location', async () => {
      const res = await request(app).get('/api/weather').query({ location: 'Delhi' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('location', 'Delhi');
      expect(res.body).toHaveProperty('temperature');
      expect(res.body).toHaveProperty('humidity');
      expect(res.body).toHaveProperty('rainfall');
      expect(res.body).toHaveProperty('windSpeed');
      expect(res.body).toHaveProperty('forecast');
      expect(res.body).toHaveProperty('advisory');
      expect(res.body).toHaveProperty('alerts');
      expect(Array.isArray(res.body.alerts)).toBe(true);
    });

    it('should validate missing location', async () => {
      const res = await request(app).get('/api/weather');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/water-availability', () => {
    it('should return water availability for a location', async () => {
      const res = await request(app).get('/api/water-availability').query({ location: 'Lucknow' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('location', 'Lucknow');
      expect(res.body).toHaveProperty('sources');
      expect(Array.isArray(res.body.sources)).toBe(true);
      expect(res.body).toHaveProperty('overallStatus');
      expect(res.body).toHaveProperty('recommendations');
    });

    it('should validate missing location', async () => {
      const res = await request(app).get('/api/water-availability');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/crop-advice', () => {
    it('should return crop advice for valid payload', async () => {
      const res = await request(app)
        .post('/api/crop-advice')
        .send({
          location: 'Amritsar',
          soilType: 'loamy',
          season: 'Rabi',
          currentCrop: 'wheat'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('recommendedCrops');
      expect(Array.isArray(res.body.recommendedCrops)).toBe(true);
      expect(res.body.recommendedCrops.length).toBeGreaterThan(0);
      expect(res.body).toHaveProperty('diversificationOptions');
      expect(res.body).toHaveProperty('seasonalTips');
    });

    it('should validate missing location', async () => {
      const res = await request(app)
        .post('/api/crop-advice')
        .send({
          soilType: 'sandy',
          season: 'Kharif'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
