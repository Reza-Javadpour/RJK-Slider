
(function ( $ ) {

    var responsive_mode_991 = false;
    var responsive_mode_767 = false;
    var responsive_mode_480 = false;

    var x_991 = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
    r_991(x_991);
    function r_991(x) {
        if(x.matches) {
            responsive_mode_991 = true;
        }else{
            responsive_mode_991 = false;
        }
    }
    var x_767 = window.matchMedia("(min-width: 481px) and (max-width: 767px)");
    r_767(x_767);
    function r_767(x) {
        if(x.matches) {
            responsive_mode_767 = true;
        }else{
            responsive_mode_767 = false;
        }
    }
    var x_480 = window.matchMedia("(max-width: 480px)");
    r_480(x_480);
    function r_480(x) {
        if(x.matches) {
            responsive_mode_480 = true;
        }else{
            responsive_mode_480 = false;
        }
    }

    // $(window).on("resize",function () {
    //
    // });

    $.fn.rjkSlider = function() {

        return this.each(function() {

            var dragItems = [];
            $(this).children().each(function (i,v) {
                dragItems.push($($(v).children()[0]).children().filter(".slide-fix")[0]);
            });
            var rjkSliderWidth = $(this.parentNode).width();
            var slideCount = $(this).children().length;
            var slideWidth = $(this).data("slide-width");
            var slide_md = $(this).data("slide-md");
            var slide_sm = $(this).data("slide-sm");
            var slide_xs = $(this).data("slide-xs");

            var slideView;
            var slideMove;
            if(responsive_mode_991){
                slideMove = 1;
                slideView = slide_md;
            }else if(responsive_mode_767){
                slideMove = 1;
                slideView = slide_sm;
            }else if(responsive_mode_480){
                slideMove = 1;
                slideView = slide_xs;
            }else{
                slideMove = $(this).data("slide-move");
                slideView = $(this).data("slide-view");
            }
            var active = false;
            var currentX;
            var initialX;
            var xOffset = 0;
            var containerWidth = dragItems.length * slideWidth;
            var dragItemsObj = [];
            var currentML = -(rjkSliderWidth);
            var initialML = currentML;
            var runOnce = true;
            var runOnce_2 = true;
            var runOnce_3 = true;
            var container_margin_left = 0;
            var rjk_container_width = ($(this.parentNode).outerWidth() * 4);
            var clickDetect;

            function initial(dragItem) {
                x_991 = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
                r_991(x_991);
                function r_991(x) {
                    if(x.matches) {
                        responsive_mode_991 = true;
                    }else{
                        responsive_mode_991 = false;
                    }
                }
                var x_767 = window.matchMedia("(min-width: 481px) and (max-width: 767px)");
                r_767(x_767);
                function r_767(x) {
                    if(x.matches) {
                        responsive_mode_767 = true;
                    }else{
                        responsive_mode_767 = false;
                    }
                }
                var x_480 = window.matchMedia("(max-width: 480px)");
                r_480(x_480);
                function r_480(x) {
                    if(x.matches) {
                        responsive_mode_480 = true;
                    }else{
                        responsive_mode_480 = false;
                    }
                }
                if(responsive_mode_991){
                    slideMove = 1;
                    slideView = slide_md;
                }else if(responsive_mode_767){
                    slideMove = 1;
                    slideView = slide_sm;
                }else if(responsive_mode_480){
                    slideMove = 1;
                    slideView = slide_xs;
                }else{
                    slideMove = $(_this).data("slide-move");
                    slideView = $(_this).data("slide-view");
                }
                $(dragItem).css("width",rjkSliderWidth / slideView + "px");
            }

            //   ###   Set width on rjk items :
            this.style.width = (containerWidth * 3) + "px"; /* For Test */

            //   ###   Traslate container on load page :
            $(this).css("transform",("translateX(" + currentML + "px)"));

            //   ###   Push rjk items :
            $(dragItems).each(function (index,dragItem) {
                dragItemsObj.push(dragItem);
            });

            //   ###   Add Repetitive Items Before General Items :
            var itemsCountForLast = dragItemsObj.length - slideView;
            for (var i=dragItemsObj.length; i>= itemsCountForLast+1 ; i--){
                var di = $(dragItemsObj[i-1]).parents(".d-slide").clone();
                this.prepend(di[0]);
            }

            //   ###   Add Repetitive Items After General Items :
            if (!(dragItemsObj.length - slideView) <= slideView){
                for (var i=1; i<= (slideView - (dragItemsObj.length - slideView)) ; i++){
                    var targetItem = $(dragItemsObj[i-1]).parents(".d-slide").clone();
                    this.append(targetItem[0]);
                }
            }

            //   ###   Init Container :
            $(this).css("margin-left","0px");
            refreshDragItems(this);

            //   #################################
            //   #####   MAIN SCRIPT START   #####
            var _this = this;

            $(dragItems).each(function (index,dragItem) {

                //   ###   initial slider when resize page   ###
                $(window).resize(function(){
                    initial(dragItem);
                    rjkSliderWidth = $(_this.parentNode.parentNode).width();
                    slideSize = rjkSliderWidth / slideView;
                    $(_this.childNodes).each(function (i,v) {
                        $(v).css("width", (rjkSliderWidth / slideView) + "px")
                    })
                });

                $(".slide-left").on("click",function () {
                    if (runOnce_3){
                        runOnce = true;
                        runOnce_2 = true;
                        $(_this).css("transition", "0.5s");
                        goLeft(slideSize);
                        setTimeout(function () {
                            $(_this).css("transition","0s");
                        },500);
                        runOnce_3 = false;
                    }
                    if(index === (dragItems.length - 1)){
                        runOnce = true;
                        runOnce_2 = true;
                        runOnce = true;
                        runOnce_2 = true;
                        runOnce_3 = true;
                    }
                });

                $(".slide-right").on("click",function () {
                    if (runOnce_3){
                        $(_this).css("transition", "0.5s");
                        goRight(slideSize);
                        setTimeout(function () {
                            $(_this).css("transition","0s");
                        },500);
                        runOnce_3 = false;
                    }
                    if(index == (dragItems.length - 1)){
                        runOnce = true;
                        runOnce_2 = true;
                        runOnce_3 = true;
                    }
                });

                var slideSize;
                var _dragItem = dragItem;

                //   ###   Find Slide Parent :
                dragItem = $(dragItem).parents(".d-slide")[0];

                $(dragItem).css("width",rjkSliderWidth / slideView + "px");

                slideSize = rjkSliderWidth / slideView;

                //   ###   Event Listener :
                {
                    this.addEventListener("touchstart", dragStart, false);
                    this.addEventListener("touchend", dragEnd, false);
                    this.addEventListener("touchmove", drag, false);
                    this.addEventListener("mousedown", dragStart, false);
                    this.addEventListener("mouseup", dragEnd, false);
                    this.addEventListener("mousemove", drag, false);
                    $(this).on("click",function (e) {
                        var clickMin = clickDetect - 5;
                        var clickMax = clickDetect + 5;
                        if ((currentX < clickMin) || ( currentX > clickMax)){
                            e.preventDefault();
                        }
                    });
                }

                xOffset = -(slideSize * slideView);

                function dragStart(e) {
                    e.preventDefault();
                    runOnce = true;
                    runOnce_2 = true;
                    runOnce_3 = true;
                    dragItem.style.transition = "0s";
                    if (e.type === "touchstart") {
                        initialX = e.touches[0].clientX - xOffset;
                    } else {
                        initialX = e.clientX - xOffset;
                    }
                    if (e.target === dragItem || e.target === _dragItem || $(e.target).hasClass("slide-fix")) {
                        active = true;
                    }
                }

                function dragEnd(e) {
                    $(_this).css("transition", "0.5s");
                    if(currentX <= (xOffset-((slideWidth * slideMove)/2))) {
                        goRight(slideSize);
                    }else if(currentX > (xOffset+((slideSize * slideMove)/2))){
                        goLeft(slideSize);
                    }else{
                        $(_this).css("transform",("translateX(" + xOffset + "px)"));
                    }
                    setTimeout(function () {
                        $(_this).css("transition","0s");
                    },500);
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
                        setTranslate(currentX);
                    }
                    $(_this).parents('rjk-slider').mouseleave(function (e) {
                        active = false;
                        dragEnd(e);
                    });
                    if (runOnce_2){
                        clickDetect = currentX;
                        runOnce_2 = false;
                    }
                }

                function setTranslate(xPos) {
                    $(_this).css("transform",("translateX(" + xPos + "px)"));
                }

                function goRight(_slideSize) {

                    //   ###   Assign new values after swip :
                    if (runOnce){
                        xOffset = xOffset - (slideMove * _slideSize);
                        container_margin_left += (slideMove * _slideSize);
                        initialML = (initialML - (slideView * _slideSize));
                        runOnce = false;
                    }

                    //   ###   swip items to left :
                    $(_this).css("transform",("translateX(" + xOffset + "px)"));
                    var __dragItems = $(_this).children();
                    setTimeout(function () {
                        //   ###   Remove Items from Left :
                        for(var i=0;i<slideMove;i++){
                            $(__dragItems[i]).remove();
                        }

                        $(_this).css("margin-left",(container_margin_left + "px"));

                        //   ###   Remove Items to Right :
                        __dragItems = $(_this).children();
                        $(__dragItems).each(function (index, value) {
                            $(value).data("slide-id");
                        });
                        var lastID = $($(__dragItems).last()[0]).data("slide-id");
                        //   ###   Find First item id for append after old items :
                        var firstNewItemID;
                        if (lastID == slideCount){
                            firstNewItemID = 0
                        }else if(lastID < slideCount){
                            firstNewItemID = lastID ;
                        }
                        //   ###   Append new Items to Right :
                        for (var i=1; i <= slideMove ; i++){
                            var targetItem = $(dragItemsObj[firstNewItemID]).parents(".d-slide").clone();
                            $(targetItem[0]).on("mousedown",function (e) {
                                dragStart(e);
                            });
                            $(targetItem[0]).on("mousemove",function (e) {
                                drag(e);
                            });
                            $(targetItem[0]).on("mouseup",function (e) {
                                dragEnd(e);
                            });
                            $(targetItem[0]).on("touchstart",function (e) {
                                dragStart(e);
                            });
                            $(targetItem[0]).on("touchmove",function (e) {
                                drag(e);
                            });
                            $(targetItem[0]).on("touchend",function (e) {
                                dragEnd(e);
                            });
                            $(targetItem[0]).on("click",function (e) {
                                var clickMin = clickDetect - 5;
                                var clickMax = clickDetect + 5;
                                if ((currentX < clickMin) || ( currentX > clickMax)){
                                    e.preventDefault();
                                }
                            });
                            _this.append(targetItem[0]);
                            firstNewItemID++;
                            //   ###   Check if item counter arrive end of items :
                            if (firstNewItemID == slideCount){
                                firstNewItemID = 0
                            }
                        }
                    },500);
                }

                function goLeft(_slideSize) {
                    //   ###   Assign new values after swip :
                    if (runOnce){
                        xOffset = xOffset + (slideMove * _slideSize);
                        container_margin_left -= (slideMove * _slideSize);
                        initialML = (initialML + (slideView * _slideSize));
                        runOnce = false;
                    }

                    //   ###   swip items to left :
                    $(_this).css("transform",("translateX(" + xOffset + "px)"));

                    var __dragItems = $(_this).children();
                    setTimeout(function () {
                        //   ###   Remove Items from Left :
                        for(var i = dragItems.length;i>(dragItems.length - slideMove);i--){
                            $(__dragItems[i-1]).remove();
                        }

                        $(_this).css("margin-left",(container_margin_left + "px"));

                        __dragItems = $(_this).children();
                        //   ###   Find First item id for append after old items :
                        var firstID = ($($(__dragItems).first()[0]).data("slide-id")) - 1;
                        var lastNewItemID;
                        if (firstID == 0){
                            lastNewItemID = slideCount;
                        }else if(firstID > 0){
                            lastNewItemID = firstID;
                        }

                        //   ###   Append new Items to Right :
                        for (var i=1; i <= slideMove ; i++){
                            var targetItem = $(dragItemsObj[lastNewItemID-1]).parents(".d-slide").clone();
                            $(targetItem[0]).on("mousedown",function (e) {
                                dragStart(e);
                            });
                            $(targetItem[0]).on("mousemove",function (e) {
                                drag(e);
                            });
                            $(targetItem[0]).on("mouseup",function (e) {
                                dragEnd(e);
                            });
                            $(targetItem[0]).on("touchstart",function (e) {
                                dragStart(e);
                            });
                            $(targetItem[0]).on("touchmove",function (e) {
                                drag(e);
                            });
                            $(targetItem[0]).on("touchend",function (e) {
                                dragEnd(e);
                            });
                            $(targetItem[0]).on("click",function (e) {
                                var clickMin = clickDetect - 5;
                                var clickMax = clickDetect + 5;
                                if ((currentX < clickMin) || ( currentX > clickMax)){
                                    e.preventDefault();
                                }
                            });
                            _this.prepend(targetItem[0]);
                            lastNewItemID--;
                            //   ###   Check if item counter arrive end of items :
                            if (lastNewItemID == 0){
                                lastNewItemID = slideCount;
                            }
                        }

                    },500);
                }
            });
            //   #####    MAIN SCRIPT END    #####
            //   #################################

            function aaa() {
                console.log("this is aaa");
            }

            //   ###   Functions :
            function refreshDragItems(t) {
                dragItems = [];
                $(t).children().each(function (i,v) {
                    dragItems.push($($(v).children()[0]).children().filter(".slide-fix")[0]);
                });
            }
        });
        return this;
    };


}( jQuery ));


