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
        // var first, last;

        var dragItemsObj = [];

        container.style.width = (containerWidth * 2) + "px"; /* For Test */
        draggableSlider.style.width = (slideWidth * slideView) + "px";

        $(dragItems).each(function (index,dragItem) {
            dragItemsObj.push(dragItem);
            var _dragItem = dragItem;
            var parentFind = false;
            while (!parentFind) {
                if ($(dragItem).hasClass("d-slide")) {
                    parentFind = true;
                } else {
                    dragItem = dragItem.parentNode;
                }
            }
            // if ($(dragItem).data("slide-id") == 1) {
            //     first = dragItem;
            // }
            // if ($(dragItem).data("slide-id") == 6) {
            //     last = dragItem;
            // }
            // if ($(dragItem).data("slide-id") == 1){
            //     var el = $(dragItem).clone();
            //     // $(container).prepend(last);
            //     $(el).insertBefore($(first));
            // }
            // if ($(dragItem).data("slide-id") == 2){
            //     var el = $(dragItem).clone();
            //     // $(container).prepend(last);
            //     $(el).insertBefore($(first));
            // }
            // if ($(dragItem).data("slide-id") == 3){
            //     var el = $(dragItem).clone();
            //     // $(container).prepend(last);
            //     $(el).insertBefore($(first));
            // }
            // if ($(dragItem).data("slide-id") == 4){
            //     var el = $(dragItem).clone();
            //     // $(container).prepend(last);
            //     $(el).insertBefore($(first));
            // }
            // if ($(dragItem).data("slide-id") == 5){
            //     var el = $(dragItem).clone();
            //     // $(container).prepend(last);
            //     $(el).insertBefore($(first));
            // }
            // if ($(dragItem).data("slide-id") == 6){
            //     var el = $(dragItem).clone();
            //     // $(container).prepend(last);
            //     $(el).insertBefore($(first));
            // }

        });

        var itemsCountForLast = dragItemsObj.length - slideView;
        for (var i=dragItemsObj.length; i>= itemsCountForLast+1 ; i--){
            var di = $(dragItemsObj[i-1].parentNode.parentNode).clone();
            container.prepend(di[0]);
        }
        console.log((dragItemsObj.length - slideView) == slideView);
        console.log((dragItemsObj.length - slideView));
        if (!(dragItemsObj.length - slideView) <= slideView){
            console.log("if run");
            for (var i=1; i<= (slideView - (dragItemsObj.length - slideView)) ; i++){
                console.log("for run");
                var di = $(dragItemsObj[i-1].parentNode.parentNode).clone();
                container.append(di[0]);
            }
        }

        dragItems = document.querySelectorAll(".slide-fix");

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

            dragItem.style.transform = "translate3d(" + -(slideWidth * slideView) + "px, " + 0 + "px, 0)";
            xOffset = -(slideWidth * slideView);

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
                if(currentX <= (xOffset-((slideWidth * slideMove)/2))) {
                    xOffset -= (slideWidth * slideMove);
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                }else if(currentX > (xOffset+((slideWidth * slideMove)/2))){
                    xOffset += (slideWidth * slideMove);
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