<?php
namespace app\assets;

use yii\web\AssetBundle;
 
class GoodsManagerAsset extends AssetBundle
{
    public $basePath = '@webroot'; 
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
    ];
    public $js = [
        'js/goods_manager.js',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'app\assets\AppAsset'
    ];
}