$(document).ready(function () {

    var gameType = "";
    var next = {};

    $("#b-exp").css("display", "none");
    $("#r-exp").css("display", "none");
    $("#br-exp").css("display", "none");
    $("#placeholder").css("display", "block");

    $('#runner').runner({
        stopAt: 600000, //10min,
        format: function (value) {
            return Math.round(value / 1000);
        }
    });

    loadBlackGame();

    $('#start-b-btn').click(function () {

        $('#runner').runner('reset');
        $('#runner').runner('start');

        $('.main-table td').removeClass("silver");
        $('.side-table tr:first-child td:first-child').addClass('yellow');

        $("#b-exp").css("display", "none");
        $("#placeholder").css("display", "block");

        next = {number: 1, color: "black"};

    });
    $('#start-r-btn').click(function () {

        $('#runner').runner('reset');
        $('#runner').runner('start');

        $('.main-table td').removeClass("silver");
        $('.side-table tr:first-child td:last-child').addClass('yellow');

        $("#r-exp").css("display", "none");
        $("#placeholder").css("display", "block");

        next = {number: 12, color: "red"};
    });
    $('#start-br-btn').click(function () {

        $('#runner').runner('reset');
        $('#runner').runner('start');

        $('.main-table td').removeClass("silver");
        $('.side-table tr:first-child td:first-child').addClass('yellow');

        $("#br-exp").css("display", "none");
        $("#placeholder").css("display", "block");

        next = {number: 1, color: "black"};
    });

    //region on load number rendering
    var black = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var red = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    $('.main-table td').each(function () {

        var color;

        if (black.length !== 0 && red.length !== 0) {
            color = Math.round(Math.random());
        }
        else if (black.length !== 0 && red.length === 0) {
            color = 0;
        }
        else if (black.length === 0 && red.length !== 0) {
            color = 1;
        }
        var max = color ? red.length : black.length;

        var randIndex = Math.floor(Math.random() * max);

        var newValue = color ? red[randIndex] : black[randIndex];

        color ? red.splice(randIndex, 1) : black.splice(randIndex, 1);

        var newClass = color ? "red" : "black";

        $(this).html(newValue);
        $(this).addClass(newClass);

    });
    //endregion on load number rendering


    $('.main-table td').click(event, function () {

        if(!$(event.target).hasClass('silver'))  {

            var clicked = {
                number: parseInt($(this).text()),
                color: $(this).attr('class')
            }

            if (next.number === clicked.number && next.color === clicked.color) {

                console.log("Correct");

                $(this).addClass('blink-me').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(){$(this).removeClass('blink-me')});

                if (gameType === "black" && next.number === 13) {
                    $('#runner').runner('stop');
                    $('#black-time').html($('#runner').text());

                    $('.side-table td').removeClass("yellow")

                    loadRedGame();

                }
                else if(gameType === "red" && next.number === 1){
                    $('#runner').runner('stop');
                    $('#red-time').html($('#runner').text());

                    $('.side-table td').removeClass("yellow")

                    loadBlackRedGame();
                }
                else if(gameType === "black-red" && next.number === 13){
                    $('#runner').runner('stop');
                    $('#black-red-time').html($('#runner').text());

                    $('.main-table td').addClass("silver");
                    $('.side-table td').removeClass("yellow")

                    alert("You have finished!");
                }
                else {
                    //current = {number: next.number, color: next.color};
                    getNext(gameType);
                    colorNext(next);
                }
            }
            else {
                console.log("Mistake");
                $(this).addClass('blink-me1').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(){$(this).removeClass('blink-me1')});
            }
        }


    });


    function getNext(gameType) {


        if(gameType === "black"){
            if ($.isEmptyObject(next)) {
                next = {number: 1, color: "black"};
            }
            else {
                next.number++;
            }
        }
        else if(gameType === "red"){
            if ($.isEmptyObject(next)) {
                next = {number: 12, color: "red"};
            }
            else {
                next.number--;
            }
        }
        else if(gameType === "black-red"){
            if ($.isEmptyObject(next)) {
                next = {number: 1, color: "black"};
            }
            else {
                if(next.color == "black"){
                    next.color = "red";
                    next.number = 13 - next.number;
                }
                else if(next.color == "red"){
                    next.color = "black";
                    next.number = 14 - next.number;
                }

            }
        }

    }

    function colorNext(next) {

        if(gameType === "black"){

            $('.side-table tr').each(function () {

                var firstChild = $(this).find("td:first");

                if ((parseInt(firstChild.text())) === next.number) {
                    firstChild.addClass("yellow");
                }
                else {
                    firstChild.removeClass("yellow");
                }
            });
        }
        else if(gameType === "red"){

            $('.side-table tr').each(function () {

                var lastChild = $(this).find("td:last");

                if ((parseInt(lastChild.text())) === next.number) {
                    lastChild.addClass("yellow");
                }
                else {
                    lastChild.removeClass("yellow");
                }

            });
        }
        else if(gameType === "black-red"){

            $('.side-table tr').each(function () {

                var firstChild = $(this).find("td:first");
                var lastChild = $(this).find("td:last");

                if(next.color == "black"){
                    if ((parseInt(firstChild.text())) === next.number) {
                        firstChild.addClass("yellow");
                    }
                    else {
                        firstChild.removeClass("yellow");
                        lastChild.removeClass("yellow");
                    }
                }
                else if(next.color == "red"){
                    if ((parseInt(lastChild.text())) === next.number) {
                        lastChild.addClass("yellow");
                        firstChild.removeClass("yellow");
                    }
                    else {
                        lastChild.removeClass("yellow");
                        firstChild.removeClass("yellow");
                    }
                }
            });
        }

    }

    function loadBlackGame(){

        gameType = "black";

        $("#b-exp").css("display", "block");
        $("#placeholder").css("display", "none");
        $('.main-table td').addClass("silver");
        next = {};
    }

    function loadRedGame(){

        gameType = "red";

        $("#r-exp").css("display", "block");
        $("#placeholder").css("display", "none");
        $('.main-table td').addClass("silver");
        next = {};
    }

    function loadBlackRedGame(){

        gameType = "black-red";

        $("#br-exp").css("display", "block");
        $("#placeholder").css("display", "none");
        $('.main-table td').addClass("silver");
        next = {};
    }

});
