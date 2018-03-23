$(window).load(function() {
    sliderLeft=$('#thumbnailScroller .container').position().left;
    padding=$('#parent_container').css('paddingRight').replace("px", "");
    sliderWidth=$(window).width()-padding;
    $('#thumbnailScroller').css('width',sliderWidth);
    var totalContent=0;
    $('#thumbnailScroller .content').each(function () {
        totalContent+=$(this).innerWidth();
        $('#thumbnailScroller .container').css('width',totalContent);
    });
    $('#thumbnailScroller').mousemove(function(e){
        if($('#thumbnailScroller  .container').width()>sliderWidth){
            var mouseCoords=(e.pageX - this.offsetLeft);
            var mousePercentX=mouseCoords/sliderWidth;
            var destX=-(((totalContent-(sliderWidth))-sliderWidth)*(mousePercentX));
            var thePosA=mouseCoords-destX;
            var thePosB=destX-mouseCoords;
            var animSpeed=600; //ease amount
            var easeType='easeOutCirc';
            if(mouseCoords==destX){
                $('#thumbnailScroller .container').stop();
            }
            else if(mouseCoords>destX){
                $('#thumbnailScroller .container').stop().animate({left: -thePosA}, animSpeed,easeType);
            }
            else if(mouseCoords<destX){
                $('#thumbnailScroller .container').stop().animate({left: thePosB}, animSpeed,easeType);
            }
        }
    });
    $('#thumbnailScroller  .thumb').each(function () {
        $(this).fadeTo(fadeSpeed, 0.6);
    });
    var fadeSpeed=200;
    $('#thumbnailScroller .thumb').hover(
    function(){ //mouse over
        $(this).fadeTo(fadeSpeed, 1);
    },
    function(){ //mouse out
        $(this).fadeTo(fadeSpeed, 0.6);
    }
);
});
$(window).resize(function() {
    $('#thumbnailScroller .container').stop().animate({left: sliderLeft}, 400,'easeOutCirc');
    $('#thumbnailScroller').css('width',$(window).width()-padding);
    sliderWidth=$(window).width()-padding;
});