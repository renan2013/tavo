/*=========================================================================================
    File Name: jsgrid.js
    Description: jsgrid Datatable.
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Template
    Version: 2.1
    Author: Pixinvent
    Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(document).ready(function () {

    /**************************
    *      Batch Delete       *
    **************************/

    $("#batchDelete").jsGrid({
        width: "100%",
        autoload: true,
        confirmDeleting: false,
        paging: true,
        controller: {
            loadData: function () {
                return db.clients;
            }
        },
        
        fields: [
            {
                headerTemplate: function () {
                    return $("<button>").attr("type", "button").text("Agregar").addClass("btn btn-warning black mr-1")
                        .on("click", function () {
                            deleteSelectedItems();
                        });
                },
                
                itemTemplate: function (_, item) {
                    return $("<input>").attr("type", "checkbox")
                        .prop("checked", $.inArray(item, selectedItems) > -1)
                        .on("change", function () {
                            $(this).is(":checked") ? selectItem(item) : unselectItem(item);
                        });
                },
                align: "center",
                width: 50
            },
            { name: "Name", type: "text", width: 150 },
            { name: "Age", type: "number", width: 50 },
            { name: "Address", type: "text", width: 200 }
        ]
    });


    var selectedItems = [];

    var selectItem = function (item) {
        selectedItems.push(item);
    };

    var unselectItem = function (item) {
        selectedItems = $.grep(selectedItems, function (i) {
            return i !== item;
        });
    };

    var deleteSelectedItems = function () {
        if (!selectedItems.length || !confirm("Are you sure?"))
            return;

        deleteClientsFromDb(selectedItems);

        var $grid = $("#batchDelete");
        $grid.jsGrid("option", "pageIndex", 1);
        $grid.jsGrid("loadData");

        selectedItems = [];
    };

    var deleteClientsFromDb = function (deletingClients) {
        db.clients = $.map(db.clients, function (client) {
            return ($.inArray(client, deletingClients) > -1) ? null : client;
        });
    };

});
