<?php
namespace app\models;

use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;


/**
 * User model
 *
 * @property integer $id
 * @property string $name
 * @property integer $parent
 * @property string $additional_info
 */
class Goods extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'goods';
    }

    
    
}