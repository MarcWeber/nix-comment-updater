// TODO add parameters ?
export function lazyValue<T>(f: (() => T))
  : () => T {
  return (() => {
    let t: T|undefined;
    return () => {
      if (t === undefined) {
        t = f();
      }
      return t;
    };
  })();
}

export function lazyPromise<T>(f: () => Promise<T>)
  : () => Promise<T> {
  return (() => {
    let t: T|undefined;
    return async () => {
      if (t === undefined) {
        t = await  f();
      }
      return t;
    };
  })();
}
