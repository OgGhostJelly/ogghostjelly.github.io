const startdragging = "startdragging";
const stopdragging = "stopdragging";

var draggable = (function(module){
    const startdraggingEvent = new CustomEvent(startdragging);
    const stopdraggingEvent = new CustomEvent(stopdragging);
    
    return function(elmnt, header) {
        var mouseOffsetX;
        var mouseOffsetY;
        
        function clampToScreen(x, y) {
            const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
            
            return [
                Math.max(Math.min(x, width - elmnt.clientWidth),0),
                Math.max(Math.min(y, height - elmnt.clientHeight),0)];
        }
        
        function setPos(pos) {
            elmnt.style.left = pos[0] + "px";
            elmnt.style.top = pos[1] + "px";
        }
        
        function onDrag(e) {
            e = e || window.event;
            e.preventDefault();
            
            expectedPos = null;
            
            // set the element's new position:
            setPos(clampToScreen(e.pageX - mouseOffsetX, e.pageY - mouseOffsetY));
        }
        
        function onMouseUp() {
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", onMouseUp);
            
            elmnt.dispatchEvent(stopdraggingEvent);
        }
        
        window.addEventListener("resize", (event) => {
            setPos(clampToScreen(elmnt.offsetLeft, elmnt.offsetTop));
        });
        
        new ResizeObserver((entries) => {
            for (const entry of entries) {
                setPos(clampToScreen(elmnt.offsetLeft, elmnt.offsetTop));
            }
        }).observe(elmnt);
        
        ;(header || elmnt).addEventListener("mousedown", function onMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            mouseOffsetX = e.pageX - elmnt.offsetLeft;
            mouseOffsetY = e.pageY - elmnt.offsetTop;
            
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", onMouseUp);
            
            elmnt.dispatchEvent(startdraggingEvent);
        });
    };
}(draggable || {}));