import { AsyncLock } from '../../src/utilities/async-lock';

describe('AsyncLock', () => {
  let lock: AsyncLock;

  beforeEach(() => {
    lock = new AsyncLock();
  });

  it('should acquire the lock immediately if not locked', async () => {
    await expect(lock.acquire()).resolves.toBeUndefined();
  });

  it('should queue acquire calls if already locked', async () => {
    await lock.acquire();
    let acquired = false;
    const p = lock.acquire().then(() => {
      acquired = true;
    });
    // Should not resolve immediately
    expect(acquired).toBe(false);
    lock.release();
    await p;
    expect(acquired).toBe(true);
  });

  it('should release the lock and allow next in queue to acquire', async () => {
    await lock.acquire();
    let acquired1 = false;
    let acquired2 = false;
    const p1 = lock.acquire().then(() => {
      acquired1 = true;
    });
    const p2 = lock.acquire().then(() => {
      acquired2 = true;
    });
    lock.release(); // Should resolve p1
    await p1;
    expect(acquired1).toBe(true);
    expect(acquired2).toBe(false);
    lock.release(); // Should resolve p2
    await p2;
    expect(acquired2).toBe(true);
  });

  it('should not be reentrant (lock stays locked if reacquired by same flow)', async () => {
    await lock.acquire();
    let acquired = false;
    const p = lock.acquire().then(() => {
      acquired = true;
    });
    expect(acquired).toBe(false);
    lock.release();
    await p;
    expect(acquired).toBe(true);
  });

  it('should not throw if release is called when not locked', () => {
    expect(() => lock.release()).not.toThrow();
  });

  it('should allow multiple queued acquires and releases', async () => {
    await lock.acquire();
    const order: number[] = [];
    const p1 = lock.acquire().then(() => {
      order.push(1);
    });
    const p2 = lock.acquire().then(() => {
      order.push(2);
    });
    const p3 = lock.acquire().then(() => {
      order.push(3);
    });
    lock.release();
    await p1;
    lock.release();
    await p2;
    lock.release();
    await p3;
    expect(order).toEqual([1, 2, 3]);
  });
});
