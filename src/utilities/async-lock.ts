/**
 * A simple async lock implementation. This lock is not reentrant.
 */
export class AsyncLock {
  private locked: boolean = false;

  private waitingResolvers: (() => void)[] = [];

  /**
   *  Acquire the lock. If the lock is already acquired, the next caller  wait until it is released.
   * @returns a promise that resolves when the lock is acquired
   */
  async acquire(): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waitingResolvers.push(resolve);
    });
  }

  /**
   * Release the lock. If there are waiting promises, resolve the first one.
   */
  release(): void {
    if (this.waitingResolvers.length > 0) {
      const resolve = this.waitingResolvers.shift()!;
      resolve();
    } else {
      this.locked = false;
    }
  }
}
