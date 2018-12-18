$(document).ready(function () {
    var draggableSlider = document.querySelector(".draggable-slider");
    $(draggableSlider).each(function (index,container) {
        var dragItems = document.querySelectorAll(".slide-fix");
        var slideWidth = $(container).data("slide-width");
        var active = false;
        var currentX;
        var currentY;
        var xOffset = 0;
        var yOffset = 0;

        $(dragItems).each(function (index,dragItem) {
            var _dragItem = dragItem;
            var parentFind = false;
            while(! parentFind){
                if($(dragItem).hasClass("d-slide")){
                    parentFind = true;
                }else{
                    dragItem = dragItem.parentNode;
                }
            }

            container.addEventListener("touchstart", dragStart, false);
            container.addEventListener("touchend", dragEnd, false);
            container.addEventListener("touchmove", drag, false);

            container.addEventListener("mousedown", dragStart, false);
            container.addEventListener("mouseup", dragEnd, false);
            container.addEventListener("mousemove", drag, false);

            function dragStart(e) {
                dragItem.style.transition = "0s";
                if (e.type === "touchstart") {
                    initialX = e.touches[0].clientX - xOffset;
                    initialY = e.touches[0].clientY - yOffset;
                } else {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;
                }
                if (e.target === dragItem || e.target === _dragItem) {
                    active = true;
                }
            }

            function dragEnd(e) {
                dragItem.style.transition = "1s";
                if(currentX <= (xOffset-(slideWidth/2))) {
                    xOffset -= slideWidth;
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                }else if(currentX > (xOffset+(slideWidth/2))){
                    xOffset += slideWidth;
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                }else{
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                    initialX = 0;
                    initialY = 0;
                }
                setTimeout(function () {
                    dragItem.style.transition = "0s";
                },1000);
                active = false;
            }

            function drag(e) {
                if (active) {
                    e.preventDefault();
                    if (e.type === "touchmove") {
                        currentX = e.touches[0].clientX - initialX;
                    } else {
                        currentX = e.clientX - initialX;
                    }
                    setTranslate(currentX, currentY, dragItem);
                }
            }

            function setTranslate(xPos, yPos, el) {
                el.style.transform = "translate3d(" + xPos + "px, " + 0 + "px, 0)";
            }
        });
    });
});