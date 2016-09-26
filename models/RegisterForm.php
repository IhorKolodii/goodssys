<?php

namespace app\models;

use Yii;
use yii\base\Model;
use app\models\User;

/**
 * RegisterForm is the model behind the login form.
 *
 * @property User|null $user This property is read-only.
 *
 */
class RegisterForm extends Model
{
    public $email;
    public $password;
    public $confirmPassword;

    private $_user = false;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['email', 'password', 'confirmPassword'], 'required'],
            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'email'],
            ['email', 'unique', 'targetClass' => 'app\models\User', 'message' => 'This email address has already been taken.'],
            ['password', 'string', 'min' => 6, 'max' => 255],
            ['password', 'match', 'pattern' => '/^[\w!@#$%^&*+=_-]{6,255}$/', 'message' => 'Password must contain only alphanumeric characters and symbols !@#$%^&*+=_-'],
            //validate pass confirm
            ['confirmPassword', 'validatePasswordConfirm'],
        ];
    }

   
    /**
     * Check password and password confirmation fields have same value
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePasswordConfirm($attribute, $params)
    {
        if ($this->password !== $this->confirmPassword) {
            $this->addError($attribute, 'Passwords doesn\'t match');
        }
    }

    /**
     * Register main action
     * @return boolean 
     */
    public function register()
    {
        if ($this->validate()) {
            $user = new User();
            $user->email = $this->email;
            $user->setPassword($this->password);
            $user->generateAuthKey();
            
            $connection = \Yii::$app->db;
            $transaction = $connection->beginTransaction();
            
            try {
                if ($user->save()) {
                    $transaction->commit();
                    return $user;
                } else {
                    throw Exception('Unable to save user.');
                }
            } catch(Exception $e) {
                $transaction->rollback();
            }

        }

        return null;
    }

}
