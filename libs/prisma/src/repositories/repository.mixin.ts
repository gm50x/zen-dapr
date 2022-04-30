export function Repository<T>(classRef: new (...args) => T): any {
  class Repository extends (classRef as any) {
    static getModelName(): string {
      return classRef.name;
    }
  }

  return Repository;
}
