export class BidirectionMap<K, V> {
  private readonly keyToValue = new Map<K, V>();

  private readonly valueToKey = new Map<V, K>();

  public keys() {
    return this.keyToValue.keys();
  }

  public values() {
    return this.valueToKey.keys();
  }

  public set(key: K, value: V): void {
    if (this.keyToValue.has(key)) {
      const oldValue = this.keyToValue.get(key);
      if (oldValue) {
        this.valueToKey.delete(oldValue);
      }
    }
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }

  public get(key: K): V | undefined {
    return this.keyToValue.get(key);
  }

  public getKey(value: V): K | undefined {
    return this.valueToKey.get(value);
  }

  public hasKey(key: K): boolean {
    return this.keyToValue.has(key);
  }

  public hasValue(value: V): boolean {
    return this.valueToKey.has(value);
  }

  public deleteKey(key: K): void {
    const value = this.keyToValue.get(key);
    if (!value) {
      throw new Error('key not found');
    }

    this.valueToKey.delete(value);
    this.keyToValue.delete(key);
  }

  public deleteValue(value: V): void {
    const key = this.valueToKey.get(value);
    if (!key) {
      throw new Error('value not found');
    }

    this.keyToValue.delete(key);
    this.valueToKey.delete(value);
  }

  public clear(): void {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }

  public get size(): number {
    return this.keyToValue.size;
  }
}
