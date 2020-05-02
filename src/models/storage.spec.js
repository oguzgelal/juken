import storage from 'src/models/storage';

describe('storage', () => {
  
  test('it can write and read', async () => {
    await storage.set('test', 'data');
    const res = await storage.get('test');
    expect(res).toEqual('data');
  });

  test('it can clear', async () => {
    await storage.set('test1', 'data1');
    await storage.set('test2', 'data2');
    await storage.clear();
    expect(await storage.get('test1')).toEqual(null);
    expect(await storage.get('test2')).toEqual(null);
  });

  test('it can get stored keys', async () => {
    await storage.clear();
    await Promise.all([
      storage.set('test1', 'data1'),
      storage.set('test2', 'data2'),
      storage.set('test3', 'data3'),
    ])
    const keys = await storage.getKeys();
    expect(keys).toEqual([ 'test1', 'test2', 'test3' ]);
  });

  test('it can remove item', async () => {
    await storage.clear();
    await storage.set('test', 'data');
    await storage.removeItem('test');
    const removedData = await storage.get('test');
    expect(removedData).toBe(null);
  })

  test('it can remove multiple items at once', async () => {
    await storage.clear();
    await Promise.all([
      storage.set('test1', 'data1'),
      storage.set('test2', 'data2'),
      storage.set('test3', 'data3'),
    ]);
    await storage.removeItems([ 'test1', 'test2' ]);
    const remainingKeys = await storage.getKeys();
    expect(remainingKeys).toEqual([ 'test3' ]);
  })
})