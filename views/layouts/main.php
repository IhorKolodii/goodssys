<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => 'Smiss test task',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-static-top',
        ],
    ]);
    $navWidgetOptions = [
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [],
    ];
    if (Yii::$app->user->isGuest) {
        $navWidgetOptions['items'][] = ['label' => 'Login', 'url' => ['/site/login']];
        $navWidgetOptions['items'][] = ['label' => 'Register', 'url' => ['/site/register']];
    } else {
        $navWidgetOptions['items'][] = ['label' => 'Goods manager', 'url' => ['/site/index']];
        $navWidgetOptions['items'][] = 
                '<li>'
                . Html::beginForm(['/site/logout'], 'post', ['class' => 'navbar-form'])
                . Html::submitButton(
                    'Logout (' . Yii::$app->user->identity->email . ')',
                    ['class' => 'btn btn-link']
                )
                . Html::endForm()
                . '</li>';
    }
    echo Nav::widget($navWidgetOptions);
    NavBar::end();
    ?>

    <div class="container">
        <?= $content ?>
    </div>
</div>

<footer class="footer ">
    <div class="container">
        <p class="pull-left">&copy; Igor Kolodiy <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
