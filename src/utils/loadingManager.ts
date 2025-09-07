import { getDefaultStore } from 'jotai';
import { isLoadingAtom } from 'src/jotai/atoms';

class LoadingManager {
  private store = getDefaultStore();

  public increment(): void {
    this.store.set(isLoadingAtom, (count) => count + 1);
  }

  public decrement(): void {
    this.store.set(isLoadingAtom, (count) => Math.max(0, count - 1));
  }

  public reset(): void {
    this.store.set(isLoadingAtom, 0);
  }

  public getCount(): number {
    return this.store.get(isLoadingAtom);
  }
}

export const loadingManager = new LoadingManager();
