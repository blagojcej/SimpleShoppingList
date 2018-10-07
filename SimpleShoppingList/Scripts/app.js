var currentList = {};

function createShoppingList() {
    //Only for testing purpose, id is integer
    //currentList.id = "test";
    currentList.name = $("#shoppingListName").val();

    //Initialize items array of the current shopping list object
    currentList.items = new Array();

    // Web Service Call
    $.ajax({
        type: "POST",
        dataType: "json",
        //Web service with Mocking list without database
        //url: "api/ShoppingList/",
        //Web service using database
        url: "api/ShoppingListsEF/",
        data: currentList,
        success: function (result) {
            //Web service using database
            currentList = result;
            showShoppingList();
            //Add history or state of the application
            history.pushState({ id: result.id }, result.name, "?id=" + result.id);
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

    $("#newItemName").val("");
    $("#newItemName").focus();
    $("#newItemName").unbind("keyup");
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
        //Web service with Mocking list without database
        //url: "api/Item/",
        //Web service using database
        url: "api/ItemsEF/",
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
        //Web service with Mocking list without database
        //url: "api/Item/" + itemId,
        //Web service using database
        url: "api/ItemsEF/" + itemId,
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
        //Web service with Mocking list without database
        //url: "api/Item/" + itemId,
        //Web service using database
        url: "api/ItemsEF/" + itemId,
        data: changedItem,
        success: function (result) {
            //Web service with Mocking list without database
            //currentList = result;
            //Web service using database
            changedItem = result;
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
        //Web service with Mocking list without database
        //url: "api/ShoppingList/" + id,
        //Web service using database
        url: "api/ShoppingListsEF/" + id,
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

function hideShoppingList() {
    $("#createListDiv").show();
    $("#shoppingListDiv").hide();

    $("#shoppingListName").val("");
    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function (event) {
        if (event.keyCode === 13) {
            createShoppingList();
        }
    });
}

$(document).ready(function () {
    console.info("ready");

    hideShoppingList();

    $("#shoppingListName").val("");
    $("#shoppingListName").focus();
    $("#shoppingListName").unbind("keyup");
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

    window.onpopstate = function(event) {
        if (event.state === null) {
            //hide shopping list
            hideShoppingList();
        } else {
            getShoppingListById(event.state.id);
        }
    };
});