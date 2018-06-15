<?php

    $id=$_GET['id'];
    //echo $id;
    if(!isset($id)){
        die('非法操作');
    }
    
    
    header('content-type:text/html;charset=utf8');

    $conn=mysql_connect('localhost','root','');

    if(!$conn){
        die('数据库连接失败'.mysql_error());
    }

    mysql_select_db('iqiyi');
    mysql_query('SET NAMES UTF8');

    

    //详细信息
    $item_detail=mysql_query("select * from item_detail where sid='${id}'");

    $detail=Array();
    for($i=0;$i<mysql_num_rows($item_detail);$i++){
        $detail[$i]=mysql_fetch_array($item_detail,MYSQL_ASSOC);
    }

    //商品类型
    $item_type=mysql_query("select * from item_type where sid='${id}'");

    $type=Array();
    for($i=0;$i<mysql_num_rows($item_type);$i++){
        $type[$i]=mysql_fetch_array($item_type,MYSQL_ASSOC);
    }

    //商品图片
    $item_img=mysql_query("select * from item_img_addr where sid='${id}'");

    $img=Array();
    for($i=0;$i<mysql_num_rows($item_img);$i++){
        $img[$i]=mysql_fetch_array($item_img,MYSQL_ASSOC);
    }

    class alldata{

    }
    $alldata=new alldata();
    $alldata->detail=$detail;
    $alldata->type=$type;
    $alldata->img=$img;

    echo json_encode($alldata);
?>