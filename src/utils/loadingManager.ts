import { getDefaultStore } from 'jotai';
import { isLoadingAtom } from 'src/jotai/atoms';

class LoadingManager {
  private count = 0;

  private store = getDefaultStore();

  public increment(): void {
    this.count++;
    this.store.set(isLoadingAtom, this.count);
  }

  public decrement(): void {
    this.count = Math.max(0, this.count - 1);
    this.store.set(isLoadingAtom, this.count);
  }

  public reset(): void {
    this.count = 0;
    this.store.set(isLoadingAtom, this.count);
  }

  public getCount(): number {
    return this.count;
  }
}

export const loadingManager = new LoadingManager();
