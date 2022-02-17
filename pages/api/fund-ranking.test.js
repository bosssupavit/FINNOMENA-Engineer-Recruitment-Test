import fundRanking from './fund-ranking'
import { createMocks } from 'node-mocks-http';

describe('/api/fund-ranking)', () => {
  it('should return status 200 when have query time ', async () => {
    const { req, res } = createMocks({
        method: 'GET',
        query: {
          time: '1D',
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(200);
  })

  it('should return status 500 when dont have query time', async () => {
    const { req, res } = createMocks({
        method: 'GET',
        query: {
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(500);
  })

  it('should return status 404 when method POST', async () => {
    const { req, res } = createMocks({
        method: 'POST',
        query: {
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(404);
  })

  it('should return status 404 when method PUT', async () => {
    const { req, res } = createMocks({
        method: 'PUT',
        query: {
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(404);
  })

  it('should return status 404 when method DELETE', async () => {
    const { req, res } = createMocks({
        method: 'DELETE',
        query: {
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(404);
  })

  it('should return status 404 when method HEAD', async () => {
    const { req, res } = createMocks({
        method: 'HEAD',
        query: {
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(404);
  })

  it('should return status 404 when method PATCH', async () => {
    const { req, res } = createMocks({
        method: 'PATCH',
        query: {
        },
      });

    await fundRanking(req, res)
    expect(res._getStatusCode()).toBe(404);
  })
})
