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
        
        window.addEventListener("resize", (event) => {
            setPos(clampToScreen(elmnt.offsetLeft, elmnt.offsetTop));
        });
        
        new ResizeObserver((entries) => {
            for (const entry of entries) {
                setPos(clampToScreen(elmnt.offsetLeft, elmnt.offsetTop));
            }
        }).observe(elmnt);

        function registerEvents(start, move, end, transformEvent = (e) => e) {
            function onDrag(e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                e = transformEvent(e);
                
                expectedPos = null;
                
                // set the element's new position:
                setPos(clampToScreen(e.pageX - mouseOffsetX, e.pageY - mouseOffsetY));
            }
            
            function onDragStop() {
                document.removeEventListener(move, onDrag);
                document.removeEventListener(end, onDragStop);
                
                elmnt.dispatchEvent(stopdraggingEvent);
            }
            
            ;(header || elmnt).addEventListener(start, function onDragStart(e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                e = transformEvent(e);

                // get the mouse cursor position at startup:
                mouseOffsetX = e.pageX - elmnt.offsetLeft;
                mouseOffsetY = e.pageY - elmnt.offsetTop;
                
                document.addEventListener(move, onDrag);
                document.addEventListener(end, onDragStop);
                
                elmnt.dispatchEvent(startdraggingEvent);
            });
        }

        registerEvents("mousedown", "mousemove", "mouseup")
        registerEvents("touchstart", "touchmove", "touchend", (e) => e.touches[0])
    };
}(draggable || {}));