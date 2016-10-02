<?php
use app\assets\GoodsManagerAsset;
use yii\web\View;

GoodsManagerAsset::register($this);
/* @var $this yii\web\View */

$this->title = 'Smiss test task';
?>
<div class="row">
    <div class="text-center">
        <h3>Goods manager</h3>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <div class="panel panel-primary" id="p1">
            <div class="panel-heading bold" id="p1-path" data-category="1">
                /root
            </div>
            <div class="panel-body">
                <div class="list-group main-panel" id="p1-body">
                    <?php foreach ($manager->rootCategories as $category): ?>
                    <div class="list-group-item selectable-row" id="<?= 'p1-cat-'.$category['id'] ?>" data-name="<?= $category['name'] ?>">
                        <input type="checkbox" id="<?= 'cb-p1-cat-'.$category['id'] ?>" class=""><label for="<?= 'cb-p1-cat-'.$category['id'] ?>"></label>
                        &nbsp; <i class="glyphicon glyphicon-folder-open color-yellow"></i>
                        &nbsp; <div class="btn btn-default name-clickable"><?= $category['name'] ?></div>
                    </div>
                    <?php endforeach; ?>
                    <?php foreach ($manager->rootGoods as $goods): ?>
                    <div class="list-group-item selectable-row" id="<?= 'p1-g-'.$goods['id'] ?>" data-name="<?= $goods['name'] ?>">
                        <input type="checkbox" id="<?= 'cb-p1-g-'.$goods['id'] ?>" class=""><label for="<?= 'cb-p1-g-'.$goods['id'] ?>"></label>
                        &nbsp; <i class="glyphicon glyphicon-file color-gray"></i>
                        &nbsp; <?= $goods['name'] ?>
                    </div>
                    <?php endforeach; ?>
                </div>
                <div class="buttons-panel">
                    <div class="btn-toolbar text-center">
                        <div class="btn-group">
                            <div class="btn btn-success" data-toggle="modal" data-target="#create-element" id="button-create1">New</div>
                            <div class="btn btn-primary" data-toggle="modal" data-target="#copy-move-elements" id="button-copy1">Copy</div>
                            <div class="btn btn-primary" data-toggle="modal" data-target="#copy-move-elements" id="button-move1">Move</div>
                            <div class="btn btn-primary" data-toggle="modal" data-target="#rename-element" id="button-rename1">Rename</div>
                            <div class="btn btn-danger" data-toggle="modal" data-target="#remove-elements" id="button-remove1">Delete</div>
                            <div class="btn btn-info" data-toggle="modal" data-target="#log" id="button-log1">Log</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div><div class="col-lg-6">
        <div class="panel panel-primary" id="p2">
            <div class="panel-heading bold" id="p2-path" data-category="1">
                /root
            </div>
            <div class="panel-body">
                <div class="list-group main-panel" id="p2-body">
                    <?php foreach ($manager->rootCategories as $category): ?>
                    <div class="list-group-item selectable-row" id="<?= 'p2-cat-'.$category['id'] ?>"  data-name="<?= $category['name'] ?>">
                        <input type="checkbox" id="<?= 'cb-p2-cat-'.$category['id'] ?>" class=""><label for="<?= 'cb-p2-cat-'.$category['id'] ?>"></label>
                        &nbsp; <i class="glyphicon glyphicon-folder-open color-yellow"></i>
                        &nbsp; <div class="btn btn-default name-clickable"><?= $category['name'] ?></div>
                    </div>
                    <?php endforeach; ?>
                    <?php foreach ($manager->rootGoods as $goods): ?>
                    <div class="list-group-item selectable-row" id="<?= 'p2-g-'.$goods['id'] ?>"  data-name="<?= $goods['name'] ?>">
                        <input type="checkbox" id="<?= 'cb-p2-g-'.$goods['id'] ?>" class=""><label for="<?= 'cb-p2-g-'.$goods['id'] ?>"></label>
                        &nbsp; <i class="glyphicon glyphicon-file color-gray"></i>
                        &nbsp; <?= $goods['name'] ?>
                    </div>
                    <?php endforeach; ?>
                </div>
                <div class="buttons-panel">
                    <div class="btn-toolbar text-center">
                        <div class="btn-group">
                            <div class="btn btn-success" data-toggle="modal" data-target="#create-element" id="button-create2">New</div>
                            <div class="btn btn-primary" data-toggle="modal" data-target="#copy-move-elements" id="button-copy2">Copy</div>
                            <div class="btn btn-primary" data-toggle="modal" data-target="#copy-move-elements" id="button-move2">Move</div>
                            <div class="btn btn-primary" data-toggle="modal" data-target="#rename-element" id="button-rename2">Rename</div>
                            <div class="btn btn-danger" data-toggle="modal" data-target="#remove-elements" id="button-remove2">Delete</div>
                            <div class="btn btn-info" data-toggle="modal" data-target="#log" id="button-log2">Log</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
<div class="row control-panel">
</div>


<?php
\Yii::$app->view->on(View::EVENT_END_BODY, function () {
    $modals = <<<HTML
<div class="modal fade" id="create-element">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create element</h4>
            </div>
            <div class="modal-body">
                <div class="panel-group">
                    <div class="panel panel-primary">
                        <div class="panel-heading">Path: <span id="new_item_path" data-category="1"></span></div>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="new_item_name_descr">Name</span>
                    <input type="text" class="form-control" aria-describedby="new_item_name_descr" id="new_item_name" data-panel="">
                </div>
                <h5>Type</h5>
                <form class="form-group" id="type-selector">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-default active">
                            <input type="radio" id="new_type_cat" name="new_type" value="cat" checked /> Category
                        </label> 
                        <label class="btn btn-default">
                            <input type="radio" id="new_type_item" name="new_type" value="item" /> Item
                        </label> 
                    </div>
                </form>
                <div id="create-error" class="bg-danger">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="button" id="create">Create</button>
                <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>
     
<div class="modal fade" id="copy-move-elements">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="copy-move">Copy elements</h4>
                <p id="copy-descr" class="bg-info">Categories will be copied without content!</p>
            </div>
            <div class="modal-body">
                <div class="panel-group">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <strong>From:</strong> <span id="copy_from_path" data-category="1"></span><br>
                            <strong>To:</strong> <span id="copy_to_path" data-category="1"></span>
                        </div>
                    </div>
                </div>
                <h5>Items:</h5>
                <div class="panel panel-primary">
                    <div class="panel-body">
                        <div class="list-group modal-panel" id="copy-list">
                            
                        </div>
                    </div>
                </div>
                <div id="copy-error" class="bg-danger"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="button" id="move">Move</button>
                <button class="btn btn-success" type="button" id="copy">Copy</button>
                <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="rename-element">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Rename element</h4>
            </div>
            <div class="modal-body">
                <div class="panel-group">
                    <div class="panel panel-primary">
                        <div class="panel-heading">Path: <span id="rename_item_path"></span></div>
                    </div>
                </div>
                <form class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon" id="rename_item_name_descr">Name</span>
                        <input type="text" class="form-control" aria-describedby="rename_item_name_descr" id="rename_item_name">
                    </div>
                </form>
                <div id="rename-error" class="bg-danger">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="button" id="rename">Rename</button>
                <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="remove-elements">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Remove elements</h4>
                <p class=" bg-danger">Warning: Items will be removed permanently!</p>
            </div>
            <div class="modal-body">
                <div class="panel-group">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <strong>Path:</strong> <span id="remove_path"></span><br>
                        </div>
                    </div>
                </div>
                <h5>Items:</h5>
                <div class="panel panel-primary">
                    <div class="panel-body">
                        <div class="list-group modal-panel" id="remove-list">
                            
                        </div>
                    </div>
                </div>
                <div id="remove-error" class="bg-danger"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" id="remove">Delete</button>
                <button class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>
            
<div class="modal fade" id="log">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Log</h4>
            </div>
            <div class="modal-body">
                <div class="panel-group">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <strong>Item:</strong> <span id="log-name"></span><br>
                            <strong>Type:</strong> <span id="log-type"></span><br>
                            <strong>Path:</strong> <span id="log-path"></span><br>
                        </div>
                    </div>
                </div>
                <h5>Events:</h5>
                <div class="panel panel-primary">
                    <div class="panel-body">
                        <div class="list-group modal-panel" id="log-list">
                            
                        </div>
                    </div>
                </div>
                <div id="log-error" class="bg-danger"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
            
<div class="modal-load"></div>
HTML;
    echo $modals;
});
?>

