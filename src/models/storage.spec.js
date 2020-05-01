import storage from 'src/models/storage';

describe('storage', () => {
  test('can store', async () => {
    await storage.set('test', 'data');
    const res = await storage.get('test');
    expect(res).toEqual('data');
  })
})