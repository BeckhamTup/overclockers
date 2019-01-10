var ImageCount = 0;
var slideIndex = 1;
//runs scripts inside on site load
window.onload = function ()
{
    //runs auto slider on load
    ImageSlider();

    //runs manual slider on load
    showDivs(slideIndex);
}
//function used to get user name/display it
function GetName()
{
    //if statement detects if browser supports localStorage
    if (typeof (Storage) !== "undefined") {
        //if statement detects if browser has name information already
        if (localStorage.getItem("name")===null)
        {
            //prompts user for name and sets it as a localStorage variable
            var setname = prompt("Enter your name");
            localStorage.setItem("name", setname);
            //gets name localStorage and displays it in username HTML tag
            document.getElementById("username").innerHTML = localStorage.getItem("name");
        }
        else
        {
            //gets name localStorage and displays it in username HTML tag
            document.getElementById("username").innerHTML = localStorage.getItem("name")
        }
        
    }
    else
    {
        //displays message in username tag
        document.getElementById("username").innerHTML = "Browser does not support web storage";
    }
}

function ImageSlider() {
    //counter
    var i;
    //gets all images with "Slides" class
    var images = document.getElementsByClassName("Slides");

    //loops as many times as there are images
    for (i = 0; i < images.length; i++)
    {
        //changes each to display nothing
        images[i].style.display = "none";
    }

    ImageCount++;

    //resets sliders if imagecount is higher than the number of images there are
    if (ImageCount > images.length)
    {
        ImageCount = 1
    }
    //displays image corralating to count (minus 1 as arrays start at 0)
    images[ImageCount - 1].style.display = "inline-block";
    //sets 5 seconds before runs again
    setTimeout(ImageSlider, 5000);
}

//function called when arrow buttons on slider are pressed
function DivChange(plusOrminus) {
    //depending on which arrow pressed plus or minuses from variable and result sent to next function
    showDivs(slideIndex += plusOrminus);
}

//function used to determine which slide is displayed based on the total
function showDivs(slideNum) {
    //variable used as a counter
    var i;
    //uses class name to collect all images in slider and puts them into a variable
    var pictures = document.getElementsByClassName("offerSlides");
    //sets slide number so that it cannot go outside of the bounds of how many images in the slider
    //if number goes too high it is reset
    if (slideNum > pictures.length)
    {
        slideIndex = 1
    }
    //if number is too low it is set back to highest value to give a loop effect
    if (slideNum < 1)
    {
        slideIndex = pictures.length
    }
    //sets pictures to not display
    for (i = 0; i < pictures.length; i++) {
        pictures[i].style.display = "none";
    }
    //displays image based on slideIndex variable
    pictures[slideIndex - 1].style.display = "inline-block";
}



//function used to open new window with mailing list
function myFunction() {
    window.open("Mailing.html", "myWindow", "width=800,height=300"); 
}

//jquery functions
$(document).ready(function () {
    //displays when jquery is loaded
    console.log("ready!");

    //when button element is clicked this function is activated
    $(".myBtn").click(function () {
        //toggles the display of element (reveals or hides shopping cart)
        $(".overlay").toggle();  
    });

});

//variables with cart info
var data = { "total": 0, "rows": [] };
var totalCost = 0;

$(function () {
    //creates datagrid
    $('#cartcontent').datagrid({
        singleSelect: true
    });
    //allows elements with item class to be draggable
    $('.item').draggable({
        revert: true,
        //gives dragged element clone effect
        proxy: 'clone',
        //function when the user starts to drag an element
        onStartDrag: function () {

            //removes cursor
            $(this).draggable('options').cursor = 'not-allowed';
            //allows the dragged element to stay on top of other elements
            $(this).draggable('proxy').css('z-index', 10);
        },
        //function for when dragging stops
        onStopDrag: function () {
            //brings back cursor
            $(this).draggable('options').cursor = 'move';
        }
    });

    //allows elements to be dropped onto class overlay (shopping cart)
    $('.overlay').droppable({
        //allows for cursor when entering the droppable zone
        onDragEnter: function (e, source) {
            $(source).draggable('options').cursor = 'auto';
        },
        //removes cursor when in non draggable area
        onDragLeave: function (e, source) {
            $(source).draggable('options').cursor = 'not-allowed';
        },
        //when the user drops and element the name and price associated with the p tag are stored as variables and added as a product using the addProduct function
        onDrop: function (e, source) {
            var name = $(source).find('p:eq(0)').html();
            var price = $(source).find('p:eq(1)').html();
            //removes "£" from cost to allow for addition
            addProduct(name, parseFloat(price.split('£')[1]));
        }
    });
});

//uses sent name and price details to add to the table
function addProduct(name, price) {
    function add() {
        for (var i = 0; i < data.total; i++) {
            //stores row number by looping until counter reaches total data
            var row = data.rows[i];
            //if row name already exists plus 1 is added to the quantity in basket
            if (row.name == name) {
                row.quantity += 1;
                //after adding one to the quantity the value is returned
                return;
            }
        }
        //adds to the data total to keep track of table size
        data.total += 1;
        //if new element is dropped it's infomation is pushed into the grid
        data.rows.push({
            name: name,
            quantity: 1,
            price: price
        });
    }
    add();
    //adds price of any new items to basket total
    totalCost += price;
    //loads cartcontent in datagrid
    $('#cartcontent').datagrid('loadData', data);
    //loads total
    $('div.cart .total').html('Total: £' + totalCost);
   // var ItemStore = getElementsById("table")
    //localStorage.setItem("MyCart", ItemStore);
}

