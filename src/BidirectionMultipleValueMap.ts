export class BidirectionMultipleValueMap<K, V> {
  private readonly keyToValue = new Map<K, V[]>();

  private readonly valueToKey = new Map<V, K>();

  public keys() {
    return this.keyToValue.keys();
  }

  public values() {
    return this.valueToKey.keys();
  }

  public set(key: K, value: V): void {
    if (this.valueToKey.get(value) === key) {
      return;
    }

    let values = this.keyToValue.get(key);
    if (values === undefined) {
      values = [];
      this.keyToValue.set(key, values);
    }

    values.push(value);

    const oldKey = this.valueToKey.get(value);
    if (oldKey !== undefined) {
      const oldValues = this.keyToValue.get(oldKey);
      if (oldValues === undefined) {
        throw new Error('in-consistent data');
      }
      const index = oldValues.indexOf(value);
      if (index === -1) {
        throw new Error('in-consistent data');
      }
      oldValues.splice(index, 1);
    }

    this.valueToKey.set(value, key);
  }

  public get(key: K): V[] | undefined {
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

    value.forEach((v) => {
      this.valueToKey.delete(v);
    });
    this.keyToValue.delete(key);
  }

  public deleteValue(value: V): void {
    const key = this.valueToKey.get(value);
    if (!key) {
      throw new Error('value not found');
    }

    const values = this.keyToValue.get(key);
    if (!values) {
      throw new Error('in-consistent data');
    }
    const index = values.indexOf(value);
    if (index === -1) {
      throw new Error('in-consistent data');
    }
    values.splice(index, 1);
    if (values.length === 0) {
      this.keyToValue.delete(key);
    }
    this.valueToKey.delete(value);
  }

  public clear(): void {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }

  public get size(): number {
    return this.keyToValue.size;
  }

  public get valueSize(): number {
    return this.valueToKey.size;
  }
}

export type MultipleValueDoublyMap<K, V> = BidirectionMultipleValueMap<K, V>;
