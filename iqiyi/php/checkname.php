<?php
    require('conn.php');

    //检查用户名
    if(isset($_GET['checkname'])){
        $checkname=$_GET['checkname'];
        $result=mysql_query("select username from user_info where username='${checkname}'");

        $arrayuser=Array();
        if(mysql_num_rows($result)==0){
            echo '0';
        }else{
            echo '1';
        }
    }
    //注册新用户
    if(isset($_POST['username'])&&isset($_POST['pass'])&&isset($_POST['email'])){
        $username=$_POST['username'];
        $pass=sha1($_POST['pass']);
        $email=$_POST['email'];
        $query="insert user_info value(default,'$username','$pass','$email')";
        mysql_query($query);
        echo '1';
    }
    
?>