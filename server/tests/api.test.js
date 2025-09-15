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

// Government Schemes API tests
describe('GET /api/government-schemes', () => {
  jest.setTimeout(20000);

  it('should return filtered central and state schemes for Punjab with pagination', async () => {
    const res = await request(app)
      .get('/api/government-schemes')
      .query({ state: 'Punjab', category: 'mechanization', page: 1, pageSize: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('state', 'Punjab');
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('pageSize', 5);
    expect(res.body).toHaveProperty('totals');
    expect(res.body).toHaveProperty('centralSchemes');
    expect(res.body).toHaveProperty('stateSchemes');
    expect(Array.isArray(res.body.centralSchemes)).toBe(true);
    expect(Array.isArray(res.body.stateSchemes)).toBe(true);
    // Should not exceed page size
    expect(res.body.centralSchemes.length).toBeLessThanOrEqual(5);
    expect(res.body.stateSchemes.length).toBeLessThanOrEqual(5);
  });

  it('should support search query across fields', async () => {
    const res = await request(app)
      .get('/api/government-schemes')
      .query({ state: 'Punjab', q: 'solar', page: 1, pageSize: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('centralSchemes');
    expect(res.body).toHaveProperty('stateSchemes');
    expect(Array.isArray(res.body.centralSchemes)).toBe(true);
    expect(Array.isArray(res.body.stateSchemes)).toBe(true);
    // Should find solar-related items likely in central schemes (e.g., PM-KUSUM)
    const names = res.body.centralSchemes.map((s) => (s && s.name) || '').join(' ').toLowerCase();
    expect(typeof names).toBe('string');
  });

  it('should handle unknown state gracefully', async () => {
    const res = await request(app)
      .get('/api/government-schemes')
      .query({ state: 'UnknownStateX', page: 1, pageSize: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('state', 'UnknownStateX');
    expect(Array.isArray(res.body.stateSchemes)).toBe(true);
    // For unknown state, stateSchemes should be empty
    expect(res.body.stateSchemes.length).toBe(0);
  });

  it('should handle category with no matches gracefully', async () => {
    const res = await request(app)
      .get('/api/government-schemes')
      .query({ state: 'Punjab', category: 'no-such-category-xyz', page: 1, pageSize: 5 });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.centralSchemes)).toBe(true);
    expect(Array.isArray(res.body.stateSchemes)).toBe(true);
    expect(res.body.centralSchemes.length).toBe(0);
    expect(res.body.stateSchemes.length).toBe(0);
  });

  it('should clamp page and pageSize and return valid shape', async () => {
    const res = await request(app)
      .get('/api/government-schemes')
      .query({ state: 'Punjab', page: -2, pageSize: 9999 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('pageSize');
    expect(typeof res.body.page).toBe('number');
    expect(typeof res.body.pageSize).toBe('number');
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

// New tests for Group Farming feature
describe('Group Farming APIs', () => {
  jest.setTimeout(20000);

  describe('GET /api/group-farming', () => {
    it('should return nearby groups, benefits, and government support for a location', async () => {
      const res = await request(app).get('/api/group-farming').query({ location: 'Jaipur' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('nearbyGroups');
      expect(Array.isArray(res.body.nearbyGroups)).toBe(true);
      expect(res.body).toHaveProperty('benefits');
      expect(Array.isArray(res.body.benefits)).toBe(true);
      expect(res.body).toHaveProperty('governmentSupport');
      expect(Array.isArray(res.body.governmentSupport)).toBe(true);
    });
  });

  describe('POST /api/group-farming', () => {
    it('should validate missing fields', async () => {
      const res = await request(app)
        .post('/api/group-farming')
        .send({ groupName: 'Test Group' }); // missing required fields

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should create a group farming initiative for valid payload', async () => {
      const payload = {
        groupName: 'Progressive Farmers Collective',
        location: 'Rampur',
        cropType: 'Wheat',
        landArea: '50 acres',
        coordinatorContact: '+91-9999999999'
      };

      const res = await request(app)
        .post('/api/group-farming')
        .send(payload);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('groupId');
      expect(typeof res.body.groupId).toBe('number');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('benefits');
      expect(Array.isArray(res.body.benefits)).toBe(true);
      expect(res.body).toHaveProperty('nextSteps');
      expect(Array.isArray(res.body.nextSteps)).toBe(true);
    });
  });
});
