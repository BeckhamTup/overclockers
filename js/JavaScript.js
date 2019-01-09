var ImageCount = 0;
var slideIndex = 1;

window.onload = function ()
{
    //runs auto slider on load
    ImageSlider();

    //runs manual slider on load
    showDivs(slideIndex);
    
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
    images[ImageCount - 1].style.display = "block";
    //sets 5 seconds before runs again
    setTimeout(ImageSlider, 5000);
}

function DivChange(plusOrminus) {
    showDivs(slideIndex += plusOrminus);
}

function showDivs(slideNum) {
    var i;
    var pictures = document.getElementsByClassName("offerSlides");
    if (slideNum > pictures.length) { slideNum = 1 }
    if (slideNum < 1) { slideNum = pictures.length }
    for (i = 0; i < pictures.length; i++) {
        pictures[i].style.display = "none";
    }
    pictures[slideIndex - 1].style.display = "block";
}




function myFunction() {
    window.open("../Mailing.html", "myWindow", "width=800,height=200"); 
}

$(document).ready(function () {
    console.log("ready!");

    //when button element is clicked this function is activated
    $(".myBtn").click(function () {
        //toggles the display of element (reveals or hides shopping cart)
        $(".overlay").toggle();  
    });

});

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

