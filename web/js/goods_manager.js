$(document).ready( function() {

    bindListElements();
    
    $("#create").click( function() {
        var name = $("#new_item_name").val().trim();
        if (!name) {
            $("#create-error").text("Name can't be empty");
            return false;
        }
        var panel = $("#new_item_name").data("panel");
        var elements = (document.querySelectorAll(panel+' .selectable-row'));
        var names = [];
        for (var i=0; typeof(elements[i])!=='undefined'; i++) {
            names.push(elements[i].getAttribute('data-name'));
        }
        if ($.inArray(name, names) !== -1) {
            $("#create-error").text("Name already exists, use another name.");
            return false;
        }
        var type = $('input[name=new_type]:checked', '#type-selector').val();
        var path = $('#new_item_path').data('new_item_path');
        var p1_cat = $('#p1-path').data('category');
        var p2_cat = $('#p2-path').data('category');
        var createInfo = {};
        createInfo['name'] = name;
        createInfo['type'] = type;
        createInfo['cat'] = path;
        createInfo['p1_cat'] = p1_cat;
        createInfo['p2_cat'] = p2_cat;
        var data = {
            action: 'create',
            data: createInfo
        };
        sendAjaxRequest(data);
        $('#create-element').modal('toggle');
    });
    
    $("#copy").click( function() {
        var from = $('#copy_from_path').data('category');
        var to = $('#copy_to_path').data('category');
        var entries = {categories:[], items:[]};
        $('#copy-list div').each(function() {
            if ($(this).data('type') === 'cat') {
                entries['categories'].push($(this).data('id'));
            } else if ($(this).data('type') === 'g') {
                entries['items'].push($(this).data('id'));
            }
        });
        var p1_cat = $('#p1-path').data('category');
        var p2_cat = $('#p2-path').data('category');
        var copyInfo = {};
        copyInfo['from'] = from;
        copyInfo['to'] = to;
        copyInfo['entries'] = entries;
        copyInfo['p1_cat'] = p1_cat;
        copyInfo['p2_cat'] = p2_cat;
        var data = {
            action: 'copy',
            data: copyInfo
        };
        sendAjaxRequest(data);
        $('#copy-move-elements').modal('toggle');
    });
    
    $("#move").click( function() {
        var from = $('#copy_from_path').data('category');
        var to = $('#copy_to_path').data('category');
        var entries = {categories:[], items:[]};
        $('#copy-list div').each(function() {
            if ($(this).data('type') === 'cat') {
                entries['categories'].push($(this).data('id'));
            } else if ($(this).data('type') === 'g') {
                entries['items'].push($(this).data('id'));
            }
        });
        var p1_cat = $('#p1-path').data('category');
        var p2_cat = $('#p2-path').data('category');
        var moveInfo = {};
        moveInfo['from'] = from;
        moveInfo['to'] = to;
        moveInfo['entries'] = entries;
        moveInfo['p1_cat'] = p1_cat;
        moveInfo['p2_cat'] = p2_cat;
        var data = {
            action: 'move',
            data: moveInfo
        };
        sendAjaxRequest(data);
        $('#copy-move-elements').modal('toggle');
    });
    
    $("#rename").click( function() {
        var id = $("#rename_item_name").data("id");
        var type = $("#rename_item_name").data("type");
        var name = $("#rename_item_name").val();
        if (!name) {
            $("#rename-error").text("Name can't be empty");
            return false;
        }
        var panel = $("#rename_item_name").data("panel");
        var elements = (document.querySelectorAll(panel+' .selectable-row'));
        var names = [];
        for (var i=0; typeof(elements[i])!=='undefined'; i++) {
            names.push(elements[i].getAttribute('data-name'));
        }
        if ($.inArray(name, names) !== -1) {
            $("#rename-error").text("Name already exists, use another name.");
            return false;
        }

        var p1_cat = $('#p1-path').data('category');
        var p2_cat = $('#p2-path').data('category');
        var renameInfo = {};
        renameInfo['id'] = id;
        renameInfo['type'] = type;
        renameInfo['name'] = name;
        renameInfo['p1_cat'] = p1_cat;
        renameInfo['p2_cat'] = p2_cat;
        var data = {
            action: 'rename',
            data: renameInfo
        };
        sendAjaxRequest(data);
        $('#rename-element').modal('toggle');
    });
    
    $("#remove").click( function() {

        var entries = {categories:[], items:[]};
        $('#remove-list div').each(function() {
            if ($(this).data('type') === 'cat') {
                entries['categories'].push($(this).data('id'));
            } else if ($(this).data('type') === 'g') {
                entries['items'].push($(this).data('id'));
            }
        });
        var p1_cat = $('#p1-path').data('category');
        var p2_cat = $('#p2-path').data('category');
        var removeInfo = {};
        removeInfo['entries'] = entries;
        removeInfo['p1_cat'] = p1_cat;
        removeInfo['p2_cat'] = p2_cat;
        var data = {
            action: 'remove',
            data: removeInfo
        };
        sendAjaxRequest(data);
        $('#remove-elements').modal('toggle');
    });
    
    $("#button-create1").click( function () {
        $("#new_item_name").val("");
        $("#create-error").text("");
        $("#new_item_path").text($("#p1-path").text());
        $("#new_item_path").data('new_item_path', $("#p1-path").data("category"));
        $("#new_item_name").data("panel",'#p1');
    });
    
    $("#button-create2").click( function () {
        $("#new_item_name").val("");
        $("#create-error").text("");
        $("#new_item_path").text($("#p2-path").text());
        $("#new_item_path").data('new_item_path', $("#p2-path").data("category"));
        $("#new_item_name").data("panel",'#p2');
    });
    
    $("#button-copy1").click( function () {
        $("#copy_from_path").text($("#p1-path").text());
        $("#copy_to_path").text($("#p2-path").text());
        $("#copy_from_path").data('category', $("#p1-path").data("category"));
        $("#copy_to_path").data('category', $("#p2-path").data("category"));
        $("#copy-list").text("");
        $("#move").hide();
        $("#copy").show();
        $("#copy-descr").show();
        $("#copy-move").text("Copy elements");
        $("#copy-error").text("");
        var selectionList = getSelection('#p1');
        if (!jQuery.isEmptyObject(selectionList)) {
            $.each(selectionList, function( index, value ) {
                var splitted = index.split("-");
                var icon = '';
                if (splitted[1] === 'cat') {
                    icon = '<i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; '
                } else {
                    icon = '<i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '
                }
                $("#copy-list").append('<div class="list-group-item" data-id="'+splitted[2]+'" data-type="'+splitted[1]+'">'+icon+value+'</div>');
            });
            $("#copy").prop('disabled', false);
        } else {
            $("#copy-error").text("Items not selected.");
            $("#copy").prop('disabled', true);
        }
    });
    
    $("#button-copy2").click( function () {
        $("#copy_from_path").text($("#p2-path").text());
        $("#copy_to_path").text($("#p1-path").text());
        $("#copy_from_path").data('category', $("#p2-path").data("category"));
        $("#copy_to_path").data('category', $("#p1-path").data("category"));
        $("#copy-list").text("");
        $("#move").hide();
        $("#copy").show();
        $("#copy-descr").show();
        $("#copy-move").text("Copy elements");
        $("#copy-error").text("");
        var selectionList = getSelection('#p2');
        if (!jQuery.isEmptyObject(selectionList)) {
            $.each(selectionList, function( index, value ) {
                var splitted = index.split("-");
                var icon = '';
                if (splitted[1] === 'cat') {
                    icon = '<i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; '
                } else {
                    icon = '<i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '
                }
                $("#copy-list").append('<div class="list-group-item" data-id="'+splitted[2]+'" data-type="'+splitted[1]+'">'+icon+value+'</div>');
            });
            $("#copy").prop('disabled', false);
        } else {
            $("#copy-error").text("Items not selected.");
            $("#copy").prop('disabled', true);
        }
    });
    
    $("#button-move1").click( function () {
        $("#copy_from_path").text($("#p1-path").text());
        $("#copy_to_path").text($("#p2-path").text());
        $("#copy_from_path").data('category', $("#p1-path").data("category"));
        $("#copy_to_path").data('category', $("#p2-path").data("category"));
        $("#copy-list").text("");
        $("#move").show();
        $("#copy").hide();
        $("#copy-move").text("Move elements");
        $("#copy-descr").hide();
        $("#copy-error").text("");
        var selectionList = getSelection('#p1');
        if (!jQuery.isEmptyObject(selectionList)) {
            $.each(selectionList, function( index, value ) {
                var splitted = index.split("-");
                var icon = '';
                if (splitted[1] === 'cat') {
                    icon = '<i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; '
                } else {
                    icon = '<i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '
                }
                $("#copy-list").append('<div class="list-group-item" data-id="'+splitted[2]+'" data-type="'+splitted[1]+'">'+icon+value+'</div>');
            });
            $("#move").prop('disabled', false);
        } else {
            $("#copy-error").text("Items not selected.");
            $("#move").prop('disabled', true);
        }
        
    });
    
    $("#button-move2").click( function () {
        $("#copy_from_path").text($("#p2-path").text());
        $("#copy_to_path").text($("#p1-path").text());
        $("#copy_from_path").data('category', $("#p2-path").data("category"));
        $("#copy_to_path").data('category', $("#p1-path").data("category"));
        $("#copy-list").text("");
        $("#move").show();
        $("#copy").hide();
        $("#copy-descr").hide();
        $("#copy-move").text("Move elements");
        $("#copy-error").text("");
        var selectionList = getSelection('#p2');
        if (!jQuery.isEmptyObject(selectionList)) {
            $.each(selectionList, function( index, value ) {
                var splitted = index.split("-");
                var icon = '';
                if (splitted[1] === 'cat') {
                    icon = '<i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; '
                } else {
                    icon = '<i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '
                }
                $("#copy-list").append('<div class="list-group-item" data-id="'+splitted[2]+'" data-type="'+splitted[1]+'">'+icon+value+'</div>');
            });
            $("#move").prop('disabled', false);
        } else {
            $("#copy-error").text("Items not selected.");
            $("#move").prop('disabled', true);
        }
    });

    $("#button-rename1").click( function() {
        $("#rename-error").text("");
        var selection = getSingleSelection('#p1');
        if (!jQuery.isEmptyObject(selection)) {
            var splitted = selection.id.split("-");
            $("#rename_item_name").data("id", splitted[2]);
            $("#rename_item_name").data("type", splitted[1]);
            $("#rename_item_name").val(selection.name);
            $("#rename_item_path").text($("#p1-path").text());
            $("#rename_item_name").data("panel",'#p1');
            $("#rename").prop('disabled', false);
        } else {
            $("#rename_item_name").data("id", 0);
            $("#rename_item_name").val("");
            $("#rename_item_path").text("");
            $("#rename-error").text("Item not selected.");
            $("#rename").prop('disabled', true);
        }
    });
    
    $("#button-rename2").click( function() {
        $("#rename-error").text("");
        var selection = getSingleSelection('#p2');
        if (!jQuery.isEmptyObject(selection)) {
            var splitted = selection.id.split("-");
            $("#rename_item_name").data("id", splitted[2]);
            $("#rename_item_name").data("type", splitted[1]);
            $("#rename_item_name").val(selection.name);
            $("#rename_item_path").text($("#p2-path").text());
            $("#rename_item_name").data("panel",'#p2');
            $("#rename").prop('disabled', false);
        } else {
            $("#rename_item_name").data("id", 0);
            $("#rename_item_name").val("");
            $("#rename_item_path").text("");
            $("#rename-error").text("Item not selected.");
            $("#rename").prop('disabled', true);
        }
    });
    
    $("#button-remove1").click( function () {
        $("#remove_path").text($("#p1-path").text());
        $("#remove-list").text("");
        $("#remove-error").text("");
        var selectionList = getStrictSelection('#p1');
        if (!jQuery.isEmptyObject(selectionList)) {
            $.each(selectionList, function( index, value ) {
                var splitted = index.split("-");
                var icon = '';
                if (splitted[1] === 'cat') {
                    icon = '<i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; '
                } else {
                    icon = '<i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '
                }
                $("#remove-list").append('<div class="list-group-item" data-id="'+splitted[2]+'" data-type="'+splitted[1]+'">'+icon+value+'</div>');
            });
            $("#remove").prop('disabled', false);
        } else {
            $("#remove-error").text("Items not selected.");
            $("#remove").prop('disabled', true);
        }
    });
    
    $("#button-remove2").click( function () {
        $("#remove_path").text($("#p1-path").text());
        $("#remove-list").text("");
        $("#remove-error").text("");
        var selectionList = getStrictSelection('#p2');
        if (!jQuery.isEmptyObject(selectionList)) {
            $.each(selectionList, function( index, value ) {
                var splitted = index.split("-");
                var icon = '';
                if (splitted[1] === 'cat') {
                    icon = '<i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; '
                } else {
                    icon = '<i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '
                }
                $("#remove-list").append('<div class="list-group-item" data-id="'+splitted[2]+'" data-type="'+splitted[1]+'">'+icon+value+'</div>');
            });
            $("#remove").prop('disabled', false);
        } else {
            $("#remove-error").text("Items not selected.");
            $("#remove").prop('disabled', true);
        }
    });
    
    $body = $("body");
    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }    
    });

    bindCatNames();
    
});

function sendAjaxRequest(data) {
    $.ajax({
        url: '/site/index',
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            var receivedData = jQuery.parseJSON(data);
            if (($('#p1-path').data('category') !== receivedData.p1.cat_id) || receivedData.p1_force_update === 1) {
                $('#p1-path').text(receivedData.p1.path);
                $('#p1-path').data('category', receivedData.p1.cat_id);
                $('#p1-body').empty();
                var parent1 = receivedData.p1.parent;
                if (receivedData.p1.cat_id > 1) {
                    $("#p1-body").append('<div class="list-group-item" id="p1-cat-'+parent1+'">&nbsp; \
                    <i class="glyphicon glyphicon-arrow-up"></i>&nbsp; <div class="btn btn-default name-clickable">..</div></div>');
                }
                $.each(receivedData.p1.categories, function( index, value ) {
                    $("#p1-body").append('<div class="list-group-item selectable-row" id="p1-cat-'+value['id']+'"  data-name="'+value['name']+'">\
                    <input type="checkbox" id="cb-p1-cat-'+value['id']+'" class=""><label for="cb-p1-cat-'+value['id']+'"></label>&nbsp; \
                    <i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; <div class="btn btn-default name-clickable">'+value['name']+'</div></div>');
                });
                $.each(receivedData.p1.items, function( index, value ) {
                    $("#p1-body").append('<div class="list-group-item selectable-row" id="p1-g-'+value['id']+'" data-name="'+value['name']+'">\
                    <input type="checkbox" id="cb-p1-g-'+value['id']+'" class=""><label for="cb-p1-g-'+value['id']+'"></label>&nbsp; \
                    <i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '+value['name']+'</div>');
                });
            }
            if (($('#p2-path').data('category') !== receivedData.p2.cat_id) || receivedData.p2_force_update === 1) {
                $('#p2-path').text(receivedData.p2.path);
                $('#p2-path').data('category', receivedData.p2.cat_id);
                $('#p2-body').empty();
                var parent2 = receivedData.p2.parent;
                if (receivedData.p2.cat_id > 1) {
                $("#p2-body").append('<div class="list-group-item" id="p2-cat-'+parent2+'">&nbsp; \
                    <i class="glyphicon glyphicon-arrow-up"></i>&nbsp; <div class="btn btn-default name-clickable">..</div></div>');
                }
                $.each(receivedData.p2.categories, function( index, value ) {
                    $("#p2-body").append('<div class="list-group-item selectable-row" id="p2-cat-'+value['id']+'" data-name="'+value['name']+'">\
                    <input type="checkbox" id="cb-p2-cat-'+value['id']+'" class=""><label for="cb-p2-cat-'+value['id']+'"></label>&nbsp; \
                    <i class="glyphicon glyphicon-folder-open color-yellow"></i>&nbsp; <div class="btn btn-default name-clickable">'+value['name']+'</div></div>');
                });
                $.each(receivedData.p2.items, function( index, value ) {
                    $("#p2-body").append('<div class="list-group-item selectable-row" id="p2-g-'+value['id']+'" data-name="'+value['name']+'">\
                    <input type="checkbox" id="cb-p2-g-'+value['id']+'" class=""><label for="cb-p2-g-'+value['id']+'"></label>&nbsp; \
                    <i class="glyphicon glyphicon-file color-gray"></i>&nbsp; '+value['name']+'</div>');
                });
            }

            bindCatNames();
            bindListElements();
            if ((receivedData.error)) {
                alert(receivedData.error);
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    
}

function bindCatNames()
{
    $('.name-clickable').click( function() {
        
        var id_string = $(this).parent().attr('id');
        var splitted = id_string.split("-");
        var id = splitted[2];
        var panel = splitted[0];
        var type = splitted[1];
        if (type !== 'cat') {
            return false;
        }
        var p1_cat = $('#p1-path').data('category');
        var p2_cat = $('#p2-path').data('category');
        if (panel === 'p1') {
            p1_cat = id;
        } else if (panel === 'p2') {
            p2_cat = id;
        }
        var openInfo = {};
        openInfo['p1_cat'] = p1_cat;
        openInfo['p2_cat'] = p2_cat;
        var data = {
            action: 'open',
            data: openInfo
        };
        sendAjaxRequest(data);
    });
}

function bindListElements()
{
    $(".selectable-row").click( function() {
        $(".selectable-row").removeClass("active");
        $(this).addClass("active");
    });
}

function getSelection(panel) {
    var selection = {};
    $(panel + ' .list-group-item input:checked').each(function() {
        selection[$(this).parent().attr('id')] = $(this).parent().data('name');
    });
    if (jQuery.isEmptyObject(selection)) {
        var selected = $(panel + ' .list-group-item.active');
        if (selected.length) {
            selection[selected.attr('id')] = selected.data('name');
        }
    }
    return selection;
}

function getSingleSelection(panel) {
    var selection = {};
    var checked = $(panel + ' .list-group-item input:checked').first();
    if (checked.length) {
        selection.name = checked.parent().data('name');
        selection.id = checked.parent().attr('id');
    } else {
        var selected = $(panel + ' .list-group-item.active');
        if (selected.length) {
            selection.name = selected.data('name');
            selection.id = selected.attr('id');
        }
    }
    return selection;
}

function getStrictSelection(panel) {
    var selection = {};
    $(panel + ' .list-group-item input:checked').each(function() {
        selection[$(this).parent().attr('id')] = $(this).parent().data('name');
    });
    return selection;
}