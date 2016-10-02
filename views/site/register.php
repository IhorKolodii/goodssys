<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model app\models\LoginForm */
use app\assets\LoginAsset;
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

LoginAsset::register($this);
$this->title = 'Register';
//$this->params['breadcrumbs'][] = $this->title;
?>
<div class="vcenter">
    <div class="site-login">
        <h1><?= Html::encode($this->title) ?></h1>

        <p>Please fill out the following fields to register:</p>

        <?php $form = ActiveForm::begin([
            'id' => 'register-form',
            'options' => ['class' => 'form-horizontal'],
            'enableAjaxValidation' => true,
            'enableClientValidation' => false,
            'fieldConfig' => [
                'template' => "{label}\n<div class=\"\">{input}</div>\n<div class=\"\">{error}</div>",
                'labelOptions' => ['class' => 'control-label'],
            ],
        ]); ?>

            <?= $form->field($model, 'email')->textInput(['type' => 'email', 'autofocus' => true, 'required' => true]) ?>

            <?= $form->field($model, 'password')->passwordInput(['required' => true, 'pattern' => '^[\w!@#$%^&*+=_-]{6,255}$']) //  ?> 

            <?= $form->field($model, 'confirmPassword')->passwordInput(['required' => true]) ?>

            <div class="form-group">
                <div>
                    <?= Html::submitButton('Register', ['class' => 'btn btn-primary', 'name' => 'login-button']) ?>
                </div>
            </div>

        <?php ActiveForm::end(); ?>

    </div>
</div>