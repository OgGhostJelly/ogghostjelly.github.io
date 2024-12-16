const dialog = (function(){
    let module = {}

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    module.type = (text, to, sleepTimes = { " ": 0, "!": 500, "?": 500, ".": 500, ",": 250 }, defaultSleepTime = 50) => {
        return new Promise(async resolve => {
            let i = 0;

            while (i < text.length) {
                await to(text[i])
                if (sleepTimes[text[i]] != undefined) {
                    if (sleepTimes[text[i]] > 0) {
                        await sleep(sleepTimes[text[i]])
                    }
                } else {
                    await sleep(defaultSleepTime)
                }
                i++;
            }
            resolve()
        })
    }

    return module
})()