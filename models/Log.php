<?php
namespace app\models;

use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;


/**
 * Log model
 *
 * @property integer $id
 * @property string $user
 * @property string $useraction
 * @property integer $goods_id
 * @property integer $goods_category_id
 * @property string $entity_name
 * @property string $date
 * @property string $additional_info
 */
class Log extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'log';
    }

}