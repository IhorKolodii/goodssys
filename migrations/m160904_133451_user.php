<?php

use yii\db\Migration;

class m160904_133451_user extends Migration
{
    public function safeUp()
    {
        $this->createTable('user',[
            'id' => 'pk',
            'email' => \yii\db\Schema::TYPE_STRING . ' NOT NULL',
            'password_hash' => \yii\db\Schema::TYPE_STRING . ' NOT NULL',
            'auth_key' => \yii\db\Schema::TYPE_STRING,
            'created_at' => \yii\db\Schema::TYPE_TIMESTAMP,
            'updated_at' => \yii\db\Schema::TYPE_TIMESTAMP,
            ]);
    }

    public function safeDown()
    {
        $this->dropTable('user');
    }

}
