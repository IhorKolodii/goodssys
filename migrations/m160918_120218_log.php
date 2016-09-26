<?php

use yii\db\Migration;

class m160918_120218_log extends Migration
{
    public function safeUp()
    {
        $this->createTable('log',[
            'id' => 'pk',
            'user' => \yii\db\Schema::TYPE_STRING,
            'action' => \yii\db\Schema::TYPE_STRING,
            'goods_id' => \yii\db\Schema::TYPE_INTEGER,
            'goods_category_id' => \yii\db\Schema::TYPE_INTEGER,
            'entity_name' => \yii\db\Schema::TYPE_STRING,
            'date' => \yii\db\Schema::TYPE_TIMESTAMP,
            'additional_info' => \yii\db\Schema::TYPE_TEXT,
            ]);
        $this->createIndex(
            'idx-log-goods_id',
            'log',
            'goods_id'
        );
        $this->addForeignKey(
            'fk-log-goods_id',
            'log',
            'goods_id',
            'goods',
            'id',
            'CASCADE'
        );
        $this->createIndex(
            'idx-log-goods_category_id',
            'log',
            'goods_category_id'
        );
        $this->addForeignKey(
            'fk-log-goods_category_id',
            'log',
            'goods_category_id',
            'goods_categories',
            'id',
            'CASCADE'
        );
    }

    public function safeDown()
    {
        $this->dropForeignKey(
            'fk-log-goods_id',
            'log'
        );

        $this->dropIndex(
            'idx-log-goods_id',
            'log'
        );
        $this->dropForeignKey(
            'fk-log-goods_category_id',
            'log'
        );

        $this->dropIndex(
            'idx-log-goods_category_id',
            'log'
        );
        $this->dropTable('log');
    }
}
