<?php
namespace app\models;

use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
use app\models\Log;

/**
 * GoodsCategories model
 *
 * @property integer $id
 * @property string $name
 * @property integer $parent
 * @property string $additional_info
 */
class GoodsCategories extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'goods_categories';
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if ($this->getIsNewRecord()) {
            $result = $this->insert($runValidation, $attributeNames);
            if ($result) {
                $logEntry = new Log();
                $logEntry->user = Yii::$app->user->identity->email;
                $logEntry->action = "Create new category in category: ".$this->parent;
                $logEntry->goods_category_id = $this->id;
                $logEntry->entity_name = $this->name;
                $logEntry->save();
            }
            return $result;
        } else {
            $result = $this->update($runValidation, $attributeNames) !== false;
            if ($result) {
                $logEntry = new Log();
                $logEntry->user = Yii::$app->user->identity->email;
                $logEntry->action = "Updated category, parent category: ".$this->parent;
                $logEntry->goods_category_id = $this->id;
                $logEntry->entity_name = $this->name;
                $logEntry->save();
            }
            return $result;
        }
    }
    
}
