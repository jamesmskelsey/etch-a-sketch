$(document).ready(function() {
    
    // Default state of page
    var brushColor = "black";
    var leftMouseDown = false;
    var numBox = 16;
    
    // Set up potential brush modes as "default" "darken" "lighten"
    
    var brushMode = 1;
    
    // Initial page set up
    canvasSetup(numBox);
    
    // mouse listeners
    $("body").on("mousedown", function(event) {
        if (event.which === 1 ) {
            
            leftMouseDown = true;//code
        }
        
    });
    
    $("body").on("mouseup", function(event) {
        if (event.which === 1 ) {
            leftMouseDown = false;//code
        }
    });
    
    $(".canvas").on("mouseenter", ".canvas-block", function() {
        if (leftMouseDown === true) {
        var div = $(this);
        draw($(this), brushMode, brushColor);
        }
    });
    
    $(".canvas").on("mousedown", ".canvas-block", function(event) {
        if (leftMouseDown === true) {
        event.preventDefault();
        
        draw($(this), brushMode, brushColor);
        }
        });
    
    // button listeners
    
    $("#default").on("click", function() {
        brushMode = 1;
        highlightSelectedBrush($(this));
    });
    
    $("#darken").on("click", function() {
        brushMode = 2;
        highlightSelectedBrush($(this));
    });
    
    $("#lighten").on("click", function() {
        brushMode = 3;
        highlightSelectedBrush($(this));
    });
    
    $("#eraser").on("click", function() {
        brushColor = "#eee";
        brushMode = 4;
        highlightSelectedBrush($(this));
        
    });
    
    $("#reset").on("click", function() {
        $(".canvas").effect("explode").delay(250); 
        $(".canvas-block").css({"background-color": "#eee"});
        $(".canvas .canvas-block").fadeTo(0, 0)
    });
    
    $("#resize").on("click", function() {
        numBox = prompt("How many boxes across should the canvas be? ( 1 - 128 ) ");    
        canvasSetup(numBox);
    });
    
    
    
    
    
    $("#black").on("click", function() {
        brushColor = "#000";
        highlightSelectColor($(this));
    });
    $("#red").on("click", function() {
        brushColor = "#F00";
        highlightSelectColor($(this));
    });
    $("#green").on("click", function() {
        brushColor = "#0F0";
        highlightSelectColor($(this));
    });
    $("#blue").on("click", function() {
        brushColor = "#00F";
        highlightSelectColor($(this));
    });
    $("#purple").on("click", function() {
        brushColor = "#909";
        highlightSelectColor($(this));
    });
     
});

function draw(div, brushMode, brushColor) {
    // TODO: Include the damn div in the damn arguments!!!!!
    //alert("in draw" + brushMode + "is brush mode");
    
            switch (brushMode) {
                
            case 1:
                //alert("case 1 ");
                div.css("background-color", brushColor);
                div.css({
                    opacity: function( index, value ) {
                        return parseFloat ( value ) + 1;
                    }
                });
                break;
            case 2:
                div.css("background-color", brushColor);
                div.css({
                    opacity: function( index, value ) {
                        return parseFloat ( value ) + .1;
                    }
                });
                break;
            case 3:
                div.css("background-color", brushColor);
                div.css({
                    opacity: function( index, value ) {
                        return parseFloat ( value ) - .1;
                    }
                });
                break;
            case 4:
                div.css("background-color", brushColor);
                div.css({
                    opacity: function( index, value ) {
                        return 0;
                    }
                });
                break;
            default:
                alert("Error: brushMode not detected.");
            }
        
}

function highlightSelectColor( button ) {
    $(".color-button").removeClass("selected");
    button.addClass("selected");
}

function highlightSelectedBrush( button ) {
    $(".brush-mode").removeClass("selected-brush");
    button.addClass("selected-brush");
}

function canvasSetup(numBox) {
    // Get rid of any old ones on the page (reusable code for the win)
    $(".canvas-block").remove();
    $(".canvas-row").remove();
 
    // built in width/height of the canvas. could change this to be dynamic but I like the way it looks forced to 600.
    var canvasWidth = 600;
    var canvasHeight = 600;
    
    // before creating the boxes, set their final size to "(width/height of the container) / number of boxes"
    
    var boxWidth = canvasWidth / numBox;
    var boxHeight = canvasHeight / numBox;
    
    // Following code works well to create a single huge grid of canvas boxes. Very slow. Took it out for obvious reasons.
    /*
    for ( var i = 1; i <= (numBox * numBox); i++ ) {
        $(".block-template").last().clone().appendTo( $(".canvas") );
        $(".canvas .block-template").addClass("canvas-block").removeClass("block-template");
    }*/
    
    
    // bit of anti-breakage first. We could go over 128, but it freezes the page. Besides, 128^2 divs is a lot of divs to have.
    // Also, numBox MUST be a number or else... who knows what will happen.
    if (isNaN(numBox) ) {
        numBox = 16;
    } else if (numBox > 128 ) { // also, avoid negative numbers
        numBox = 128;
    } else if (numBox <= 0) {
        numBox = 1
    }
    
    // create class="row-template" divs until we've reached the number of boxes... appendTo "canvas"
    // as we create each, fill it with blocks of class="block-template" append each to "row.template".last
    // this should create a faster search index through the DOM for finding each block...
    // after testing... it seems to be a bit faster... but not as much as I thought. Wonder if tables would be faster.
    var progress = 0;
    for ( var i = 1; i <= numBox; i++) {
        $(".row-template").last().clone().appendTo( $(".canvas") );
        $(".canvas .row-template").addClass("canvas-row").removeClass("row-template"); 
        for (var j = 1; j <= numBox; j++ ) {
            $(".block-template").last().clone().appendTo( $(".canvas-row").last() );
            $(".canvas-row .block-template").addClass("canvas-block").removeClass("block-template");
        }
    }
    
    // Set the final values for the row/column widths. Very tably, because I was already set up with divs and didn't
    // want to break it with tables. 
    $(".canvas-row").css({
        "width": canvasWidth,
        "height": boxHeight
        });
    
    $(".canvas-block").css({
        "width": boxWidth,
        "height": boxHeight,
        
        });
    
    
}