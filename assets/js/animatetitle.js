;(function(){
    const title = document.head.getElementsByTagName("title")[0];
     
    function getTimeGreeting() {
        let hour = new Date().getHours();
        if (hour > 18 || hour < 3) {
            return choose(["good evening", "oyasumi"]);
        } else if (hour > 10) {
            return "good afternoon";
        } else {
            return "good morning";
        }
    }
    
    let dialog = (function*(){
        yield texteffects.randomEffect()(getTimeGreeting());
        yield 2000;
        yield texteffects.randomEffect()(choose(["hello o/", "wassup >:D", "hows it going B)"]));
        yield 2000;
        yield texteffects.randomEffect()("welcome to");
        yield 2000;
        yield texteffects.randomEffect()("ogghostjelly");
        yield 3000;
        yield texteffects.randomEffect()("enjoy your stay !!");
        yield 3000;
        
        while (true) {
            yield texteffects.randomEffect()("ogghostjelly");
            yield 3000;
        }
    }());
    
    let tickId;
    let tick = (function(){
        let flashingCursor = false;
        let displayedText = "> ";
        let waitTimestamp;
    
        return function tick(timestamp) {
            function display() {
                title.textContent = displayedText + (!flashingCursor || (timestamp / 500.0 % 1) > 0.5 ? " []" : "");
            }
            
            if (timestamp < waitTimestamp) {
                display()
                tickId = window.requestAnimationFrame(tick);
                return;
            }
            
            let value = dialog.next().value;
            
            if (value.next) {
                dialog = joinGenerator(value, dialog);
            } else if (typeof(value) == "string") {
                displayedText = "> " + value;
                flashingCursor = false;
                waitTimestamp = timestamp + 100;
            } else if (typeof(value) == "number") {
                waitTimestamp = timestamp + value;
                flashingCursor = true;
            }
            
            display()
            tickId = window.requestAnimationFrame(tick);
        }
    }());
    
    document.addEventListener("visibilitychange", (event) => {
        if (document.hidden) {
            window.cancelAnimationFrame(tickId);
            tickId = null;
            title.textContent = "> ogghostjelly []"
        } else if (!tickId) {
            tickId = window.requestAnimationFrame(tick);
        }
    })
    
    if (!document.hidden) {
        tickId = window.requestAnimationFrame(tick);
    }
}())