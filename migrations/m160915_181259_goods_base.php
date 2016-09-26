<?php

use yii\db\Migration;

class m160915_181259_goods_base extends Migration
{
    public function safeUp()
    {
        $this->createTable('goods_categories',[
            'id' => $this->primaryKey(),
            'name' => $this->string(150)->notNull(),
            'parent' => $this->integer()->defaultValue(1),
            'additional_info' => $this->text(),
            'CONSTRAINT unique_goods_categories UNIQUE(name, parent)'
            ]);
        $this->createTable('goods',[
            'id' => $this->primaryKey(),
            'name' => $this->string(150)->notNull(),
            'parent' => $this->integer()->defaultValue(1)->notNull(),
            'additional_info' => $this->text(),
            'CONSTRAINT unique_goods UNIQUE(name, parent)'
            ]);
        $this->createIndex(
            'idx-goods-parent',
            'goods',
            'parent'
        );
        $this->addForeignKey(
            'fk-goods-parent',
            'goods',
            'parent',
            'goods_categories',
            'id',
            'CASCADE'
        );
        
        $this->createIndex(
            'idx-goods_cat-parent',
            'goods_categories',
            'parent'
        );
        $this->addForeignKey(
            'fk-goods_cat-parent',
            'goods_categories',
            'parent',
            'goods_categories',
            'id',
            'CASCADE'
        );
        $this->insert('goods_categories', ['id' => '1', 'name' => 'root', 'parent' => null]);
    }

    public function safeDown()
    {
        
        $this->dropForeignKey(
            'fk-goods-parent',
            'goods'
        );

        $this->dropIndex(
            'idx-goods-parent',
            'goods'
        );
        
        $this->dropForeignKey(
            'fk-goods_cat-parent',
            'goods_categories'
        );

        $this->dropIndex(
            'idx-goods_cat-parent',
            'goods_categories'
        );
        $this->dropTable('goods');
        $this->dropTable('goods_categories');
    }
}
