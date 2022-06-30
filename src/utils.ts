export const action = async <P>(msg: string, f: () => Promise<P>) => {
    console.log(`>> ${msg} start`)
    const r = await f()
    console.log(`<< ${msg} ended`);
    return r
}
