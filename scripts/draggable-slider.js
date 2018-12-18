$(document).ready(function () {
    var draggableSliderContainer = document.querySelector(".draggable-slider-container");
    $(draggableSliderContainer).each(function (index,container) {
        var draggableSlider = document.querySelector(".draggable-slider");
        var dragItems = document.querySelectorAll(".slide-fix");
        var slideWidth = $(container).data("slide-width");
        var slideView = $(container).data("slide-view");
        var slideMove = $(container).data("slide-move");
        var active = false;
        var currentX;
        var currentY;
        var xOffset = 0;
        var yOffset = 0;
        var containerWidth = dragItems.length * slideWidth;
        container.style.width = containerWidth + "px";
        draggableSlider.style.width = (slideWidth * slideView) + "px";
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
                // console.log(xOffset);
                if(currentX <= (xOffset-((slideWidth * slideMove)/2))) {
                    console.log("if");
                    xOffset -= (slideWidth * slideMove);
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                }else if(currentX > (xOffset+((slideWidth * slideMove)/2))){
                    console.log("elseif");
                    xOffset += (slideWidth * slideMove);
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                }else{
                    console.log("else");
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