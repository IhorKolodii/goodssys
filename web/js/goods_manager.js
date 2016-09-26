$(document).ready( function() {

    bindListElements();
    
    $("#create").click( function() {
        var name = $("#new_item_name").val().trim();
        if (!name) {
            $("#create-error").text("Name can't be empty");
            return false;
        }
        
        var elements = (document.getElementsByClassName('selectable-row'));
        var names = [];
        for (var i=0; typeof(elements[i])!=='undefined'; i++) {
            names.push(elements[i].getAttribute('data-name'));
        }
        var type = $('input[name=new_type]:checked', '#type-selector').val();
        if ($.inArray(name, names) !== -1) {
            $("#create-error").text("Name already exists, use another name.");
            return false;
        }
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
    
    $("#button-create1").click( function () {
        $("#new_item_name").val("");
        $("#create-error").text("");
        $("#new_item_path").text($("#p1-path").text());
        $("#new_item_path").data('new_item_path', $("#p1-path").data("category"));
    });
    
    $("#button-create2").click( function () {
        $("#new_item_name").val("");
        $("#create-error").text("");
        $("#new_item_path").text($("#p2-path").text());
        $("#new_item_path").data('new_item_path', $("#p2-path").data("category"));
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
        var selectionList = getSelection('#p1');
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
        var selectionList = getSelection('#p2');
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
        var selectionList = getSelection('#p1');
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
        var selectionList = getSelection('#p2');
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