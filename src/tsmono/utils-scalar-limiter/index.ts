/* limiting a resource such as memory 
   use case is chunked / stream like processing for itemstorage
*/

const scalar_limiter = (o:{available: number, depletedHook?: () => void} ) => {

    let available = o.available

    const waiting: {r: any, j: any, amount: number}[]= []

    const amount_available = (a: number) => a <= available || available == o.available // feeling lucky, don't allow a request bigger than planned to cause deadlock

    const release_fun = (amount: number) => () => {
        available += amount;

        while (waiting.length > 0 && amount_available(waiting[0].amount) ){
            const x = waiting.shift()
            if (x){
                available -= amount
                x.r(release_fun(x.amount))
            }
        }

    }

    const lock = async (amount: number): Promise<() => void> => {
        return new Promise((r,j) => {
            if (amount_available(amount)){ available -= amount; r(release_fun(amount)) }
            else {
                waiting.push({amount, r, j})
                if (o.depletedHook) o.depletedHook()
            }
        })
    }

    return {
        available: () => available,
        lock,
        with_lock: async <R>(f: () => Promise<R>):Promise<R> => {
            const release = await lock(1);
            const r = await f();
            release()
            return r
        }
    }
}

export default scalar_limiter
