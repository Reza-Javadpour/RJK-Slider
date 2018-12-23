$(document).ready(function () {
    var draggableSliderContainer = document.querySelector(".draggable-slider-container");
    $(draggableSliderContainer).each(function (index,container) {
        var draggableSlider = document.querySelector(".draggable-slider");
        var draggableSliderWidth = $(container.parentNode).width();
        var dragItems = document.querySelectorAll(".slide-fix");
        var slideCount = document.querySelectorAll(".d-slide").length;
        var slideWidth = $(container).data("slide-width");
        var slideView = $(container).data("slide-view");
        var slideMove = $(container).data("slide-move");
        var active = false;
        var currentX;
        var currentY;
        var xOffset = 0;
        var yOffset = 0;
        var containerWidth = dragItems.length * slideWidth;
        var dragItemsObj = [];

        container.style.width = (containerWidth * 3) + "px"; /* For Test */

        $(dragItems).each(function (index,dragItem) {
            dragItemsObj.push(dragItem);
        });

        var itemsCountForLast = dragItemsObj.length - slideView;
        for (var i=dragItemsObj.length; i>= itemsCountForLast+1 ; i--){
            var di = $(dragItemsObj[i-1].parentNode.parentNode).clone();
            container.prepend(di[0]);
        }

        if (!(dragItemsObj.length - slideView) <= slideView){
            for (var i=1; i<= (slideView - (dragItemsObj.length - slideView)) ; i++){
                var targetItem = $(dragItemsObj[i-1].parentNode.parentNode).clone();
                container.append(targetItem[0]);
            }
        }

        refreshDragItems();
        $(dragItems).each(function (index,dragItem) {
            var slideSize;
            var _dragItem = dragItem;

            findSlideParent(dragItem);
            function findSlideParent() {
                var parentFind = false;
                while(! parentFind){
                    if($(dragItem).hasClass("d-slide")){
                        parentFind = true;
                    }else{
                        dragItem = dragItem.parentNode;
                    }
                }
            }

            $(dragItem).css("width",draggableSliderWidth / slideView + "px");
            slideSize = draggableSliderWidth / slideView;

            container.addEventListener("touchstart", dragStart, false);
            container.addEventListener("touchend", dragEnd, false);
            container.addEventListener("touchmove", drag, false);
            container.addEventListener("mousedown", dragStart, false);
            container.addEventListener("mouseup", dragEnd, false);
            container.addEventListener("mousemove", drag, false);

            dragItem.style.transform = "translate3d(" + -(slideSize * slideView) + "px, " + 0 + "px, 0)";
            xOffset = -(slideSize * slideView);

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
                    goRight(slideSize);
                }else if(currentX > (xOffset+((slideSize * slideMove)/2))){
                    xOffset += (slideSize * slideMove);
                    dragItem.style.transform = "translate3d(" + xOffset + "px, " + 0 + "px, 0)";
                    goLeft(slideSize);
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

        function goRight(_slideSize) {
            var __dragItems = $(".d-slide");
            for(var i=0;i<slideMove;i++){
                $(__dragItems[i]).remove();
            }

            __dragItems = $(".d-slide");
            containerPaddingLeft = parseInt($(container).css("padding-left").slice(0,-2) ) + (slideMove * slideWidth);
            $(container).css("padding-left",containerPaddingLeft + "px");

            var lastID = $($(__dragItems).last()[0]).data("slide-id");
            for (var i=lastID +1; i< (lastID + 1 + slideView) ; i++){
                var targetItem = $(dragItemsObj[i-1].parentNode.parentNode).clone();
                container.append(targetItem[0]);
                $(targetItem[0]).css("transform","translate( -" + (slideMove * slideWidth * 2) + "px , 0)");
            }
            refreshDragItems();
            dragItems = document.querySelectorAll(".slide-fix");
        }

        function goLeft(_slideSize) {
            var __dragItems = $(".d-slide");

            //#####  Delete Right side items :
            for(var i=(__dragItems.length - slideMove);i<(__dragItems.length);i++){
                $(__dragItems[i]).remove();
            }
            //#####  Add Padding Right for new Items :
            containerPaddingRight = parseInt($(container).css("padding-right").slice(0,-2) ) + (slideMove * slideWidth);
            $(container).css("padding-right",containerPaddingRight + "px");

            //#####  Find First Item ID :
            __dragItems = $(".d-slide");
            var firstID = $($(__dragItems).first()).data("slide-id");
            if(firstID < slideView){
                if(firstID - slideView <= 0) {
                    firstID = firstID - slideView + slideCount;
                }
            }

            var targetItem;
            for (var i=firstID; i< (firstID + slideView) ; i++){
                if(i <= slideCount){
                    targetItem = $(dragItemsObj[i-1].parentNode.parentNode).clone();
                    container.append(targetItem[0]);
                    $(targetItem[0]).css("transform","translate( -" + (slideMove * _slideSize * 3) + "px , 0)");
                }else{
                    var _i = i - slideCount;
                    targetItem = $(dragItemsObj[_i-1].parentNode.parentNode).clone();
                    container.append(targetItem[0]);
                    $(targetItem[0]).css("transform","translate( -" + (slideMove * _slideSize * 3) + "px , 0)");
                }
            }
            refreshDragItems();
        }

        function refreshDragItems() {
            dragItems = document.querySelectorAll(".slide-fix");
        }

    });
});