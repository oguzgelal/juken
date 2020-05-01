import resource from 'src/models/resource';
import storage from 'src/models/storage';
import sleep from 'src/utils/test/sleep';

describe('resouce', () => {

  beforeEach(() => {
    jest.setTimeout(10000);
  });
  
  test('generates keys correctly', () => {
    const k1 = resource.key({ name: 'test' });
    const k2 = resource.key({ name: 'test' }, '123');
    const k3 = resource.key({ name: 'test' }, ['123']);
    const k4 = resource.key({ name: 'test' }, ['123', '123']);
  
    expect(k1).toBe('test');
    expect(k2).toBe('test_123');
    expect(k3).toBe('test_123');
    expect(k4).toBe('test_123_123');
  })

  test('caching mechanism should work', async () => {
    
    const sources = [
      // indefinite cache
      {
        name: 'test2_1',
        cache: true,
        _exVal: 'res1',
        _exNumRead: 1,
        _exCache: true,
      },
      // no cache
      {
        name: 'test2_2',
        cache: false,
        _exVal: 'res2',
        _exNumRead: 2,
        _exCache: false,
      },
      // 1 second cache period
      {
        name: 'test2_3',
        cache: 1,
        _exVal: 'res3',
        _exNumRead: 2,
        _exCache: true,
      },
      // 3 second cache period
      {
        name: 'test2_4',
        cache: 10,
        _exVal: 'res4',
        _exNumRead: 1,
        _exCache: true,
      },
      // 1 day cache period
      {
        name: 'test2_5',
        cache: 1,
        cacheUnit: 'day',
        _exVal: 'res5',
        _exNumRead: 1,
        _exCache: true,
      },
      // cache omitted
      {
        name: 'test2_6',
        _exVal: 'res6',
        _exNumRead: 2,
        _exCache: false,
      },
    ];

    // generate mock functions
    const mocks = sources.map(() => jest.fn())

    // generate fetch functions
    const fetchFn = (s, i) => {
      return new Promise(r => {
        mocks[i]();
        r(s._exVal);
      });
    }

    // call get the first time
    const results1 = await Promise.all(sources.map((s, i) => {
      return resource.get(s)(() => fetchFn(s, i));
    }))
     
    // wait for 3 seconds
    await sleep(3000);
    
    // call get the second time
    const results2 = await Promise.all(sources.map((s, i) => {
      return resource.get(s)(() => fetchFn(s, i));
    }))

    // fetch data from storage
    const storageCheck = await Promise.all(sources.map(s => {
      return storage.get(resource.key(s));
    }))

    // were anything ever written to the storage for resources above
    expect(storageCheck.map(v => !!v)).toEqual(sources.map(s => s._exCache))
    
    // check number of reads from the storage
    expect(mocks.map(m => m.mock.calls.length)).toEqual(sources.map(s => s._exNumRead));
    
    // check fetch / read results
    expect(results1).toEqual(sources.map(s => s._exVal));
    expect(results2).toEqual(sources.map(s => s._exVal));
  })
})