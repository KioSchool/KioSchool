import { getDefaultStore } from 'jotai';
import { loadingCountAtom } from 'src/jotai/atoms';

class LoadingManager {
  private store = getDefaultStore();

  public increment(): void {
    this.store.set(loadingCountAtom, (count) => count + 1);
  }

  public decrement(): void {
    this.store.set(loadingCountAtom, (count) => Math.max(0, count - 1));
  }

  public reset(): void {
    this.store.set(loadingCountAtom, 0);
  }

  public getCount(): number {
    return this.store.get(loadingCountAtom);
  }
}

export const loadingManager = new LoadingManager();
