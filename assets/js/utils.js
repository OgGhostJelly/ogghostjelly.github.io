function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function lerp(Y, X, t) {
    return X*t + Y*(1-t)
}

function* joinGenerator(a, b) {
    yield* a;
    yield* b;
}