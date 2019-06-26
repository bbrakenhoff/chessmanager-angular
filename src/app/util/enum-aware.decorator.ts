export function EnumAware(enums: Array<{ name: string; type: any }>) {
  // tslint:disable-next-line: ban-types
  return (constructor: Function) => {
    for (const e of enums) {
      constructor.prototype[e.name] = e.type;
    }
  };
}
