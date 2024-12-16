const daynight = (function(){
    function colorInterpolate(colorA, colorB, t) {
        const colorVal = (prop) =>
            colorA[prop] * (1.0 - t) + colorB[prop] * t;
        return { r: colorVal('r'), g: colorVal('g'), b: colorVal('b') }
    }

    let module = {}
    // CONFIG: Change this to set the default day type
    let isDay = false

    const dayColor = { r: 0, g: 0, b: 0 }
    const nightColor = { r: 255, g: 255, b: 255 }
    const backgroundDayColor = { r: 234.0, g: 223.0, b: 192.0 }
    const backgroundNightColor = { r: 1.0, g: 10.0, b: 27.0 }
    let backgroundColor = isDay ? backgroundDayColor : backgroundNightColor
    let color = isDay ? dayColor : nightColor

    module.isDay = () => isDay
    module.isNight = () => !isDay
    module.toDay = () => isDay = true
    module.toNight = () =>  isDay = false
    module.dayColor = backgroundDayColor
    module.nightColor = backgroundNightColor

    let lastTime = 0;
    function tick(time) {
        const delta = time - lastTime;
        lastTime = time;

        backgroundColor = colorInterpolate(
            backgroundColor,
            isDay ? backgroundDayColor : backgroundNightColor,
            1.0 - Math.exp(-0.001 * delta)
        )

        color = colorInterpolate(
            color,
            isDay ? dayColor : nightColor,
            1.0 - Math.exp(-0.001 * delta)
        )

        if (document.body) {
            document.body.style.backgroundColor = "rgb("+Math.round(backgroundColor.r)+", "+Math.round(backgroundColor.g)+", "+Math.round(backgroundColor.b)+")"
            document.body.style.color = "rgb("+Math.round(color.r)+", "+Math.round(color.g)+", "+Math.round(color.b)+")"
        }

        requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    return module
})()