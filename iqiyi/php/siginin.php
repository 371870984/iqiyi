<?php
    require('conn.php');
    //echo '123';
    if(isset($_POST['username'])&&isset($_POST['pass'])){
        $username=$_POST['username'];
        $pass=sha1($_POST['pass']);
        $result=mysql_query("select * from user_info where username='$username' and password='$pass'");

        if(mysql_fetch_array($result)){
            echo true;
        }else{
            echo false;
        }
    }

?>