export const exception_to_str = (e: any) => {
  if (typeof e == "object") {
      if ('stack' in e){
          // browser chromium like Error object stack contains .message and stack trace
          return e.stack
      } else {
        // chai like exception ?
        const r = [];
        for (const [k, v] of Object.entries(e)) {
          r.push(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);
        }
        return r.join("\n");
      }
  } else if (e && e.trace) {
    return `${e}\n${e.trace}`;
  }
  return JSON.stringify(e);
};
