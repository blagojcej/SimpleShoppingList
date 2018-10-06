var currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();

    //Initialize items array of the current shopping list object
    currentList.items = new Array();

    // Web Service Call
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList/",
        data: currentList,
        success: function (result) {
            showShoppingList();
        }//,
        //error: function() {
        //    console.error("Something bad happened! :(");
        //}
    });

    //showShoppingList();
}

function showShoppingList() {
    //Change the whole HTML
    $("#shoppingListTitle").html(currentList.name);

    //Empty the shopping list
    $("#shoppingListItems").empty();

    //Hide the first view and show the second view
    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

    $("#newItemName").focus();
    $("#newItemName").keyup(function (event) {
        if (event.keyCode === 13) {
            addItem();
        }
    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    newItem.shoppingListId = currentList.id;

    //Put new item into array of items
    //currentList.items.push(newItem);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/Item/",
        data: newItem,
        success: function (result) {
            currentList = result;
            drawItems();
            $("#newItemName").val();
        }//,
        //error: function() {
        //    console.error("Something bad happened! :(");
        //}
    });

    console.log(currentList);
    //drawItems();

    $("#newItemName").val("");
}

function drawItems() {
    //Empty ul
    var $list = $("#shoppingListItems").empty();

    //Foer each item in currentList.items
    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        //Add list item with name of the current item and id item_1
        var $li = $("<li>").html(currentItem.name)
            .attr("id", "item_" + i);
        var $deleteBtn =
            $("<button onclick='deleteItem(" + currentItem.id + ")'>D</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + currentItem.id + ")'>C</button>").appendTo($li);

        if (currentItem.checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(itemId) {
    //currentList.items.splice(itemId, 1);
    //drawItems();

    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "api/Item/" + itemId,
        success: function (result) {
            currentList = result;
            drawItems();
        }//,
        //error: function() {
        //    console.error("Something bad happened! :(");
        //}
    });
}

function checkItem(itemId) {
    //if ($("#item_" + index).hasClass("checked")) {
    //    $("#item_" + index).removeClass("checked");
    //} else {
    //    $("#item_" + index).addClass("checked");
    //}

    //var item = currentList.items[itemId];
    //item.checked = !item.checked;

    var changedItem = {};

    for (var i = 0; i < currentList.items.length; i++) {
        if (currentList.items[i].id === itemId) {
            changedItem = currentList.items[i];
            break;
        }
    }

    changedItem.checked = !changedItem.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Item/" + itemId,
        data: changedItem,
        success: function (result) {
            currentList = result;
            drawItems();
        }//,
        //error: function() {
        //    console.error("Something bad happened! :(");
        //}
    });
}

function getShoppingListById(id) {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function(result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }//,
        //error: function() {
        //    console.error("Something bad happened! :(");
        //}
    });

    //Mocking code
    /*
    console.log(id);

    currentList.name = "Mock Shopping List";
    currentList.items = [
        {
            name: "Milk"
        },
        {
            name: "Cornflakes"
        },
        {
            name: " Strawberries"
        }
    ];

    showShoppingList();
    drawItems();
    */
}

$(document).ready(function () {
    console.info("ready");

    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function(event) {
        if (event.keyCode === 13) {
            createShoppingList();
        }
    });

    //Get the id of shopping list
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex !== -1) {
        //We are adding 4 at the end because we have 4 characters in idIndex
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
});