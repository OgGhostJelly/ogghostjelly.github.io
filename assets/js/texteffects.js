var texteffects = (function(module){
    function choose(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    function randomString(length) {
        let string = "";
        for (let i = 0; i < length; i++) {
            string += choose("!@#$%^&*+|:<>?~-=;/\\");
        }
        return string;
    }
    
    function shuffleString(string) {
        let a = string.split(""),
            n = a.length;
        for(let i = n - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }
    
    module.randomEffect = function() {
        return choose(Object.values(module.effect));
    };
    
    module.effect = {};
    
    module.effect.typewriter = function*(text) {
        for (let i = 0; i < text.length; i++) {
            yield text.slice(0, i + 1);
        }
    };
    
    module.effect.collapsing = function*(text, fill) {
        if (text.length % 2 != 0) {
            console.warn(`'collapsingText(${text}, ${fill})': doesn't support text with odd numbered length yet!`);
        }
        
        fill = fill || randomString(text.length);
        
        for (let i = 0; i < text.length / 2; i++) {
            yield text.slice(0, i + 1) +
                fill.slice(i + 1, text.length - i - 1) +
                text.slice(text.length - i - 1);
        }
    };
    
    module.effect.inOut = function*(text) {
        if (text.length % 2 != 0) {
            console.warn(`'inOutText(${text})': doesn't support text with odd numbered length yet!`);
        }
        
        let halfLength = text.length / 2;
        
        for (let i = 0; i < halfLength; i++) {
            yield text.slice(halfLength - i - 1, halfLength) +
                text.slice(halfLength, halfLength + i + 1);
        }
    };
    
    module.effect.shuffle = function*(text, times) {
        times = times || text.length - 1;
        
        for (let i = 0; i < times; i++) {
            yield shuffleString(text);
        }
        yield text;
    };
    
    module.effect.scroll = function*(text) {
        for (let i = 0; i < text.length + 1; i++) {
            yield text.slice(i) + text.slice(0, i);
        }
    };
    
    return module;
}(texteffects || {}));