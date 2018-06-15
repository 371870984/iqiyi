<?php

    require('conn.php');

    //搜索热词
    $search_hot_result=mysql_query('select * from search_suggest');

    $search_hot=Array();
    for($i=0;$i<mysql_num_rows($search_hot_result);$i++){
        $search_hot[$i]=mysql_fetch_array($search_hot_result,MYSQL_ASSOC);
    }

    //搜索框右侧广告
    $search_right_ad_result=mysql_query('select * from search_right_ad');

    $search_right_ad=Array();
    for($i=0;$i<mysql_num_rows($search_right_ad_result);$i++){
        $search_right_ad[$i]=mysql_fetch_array($search_right_ad_result,MYSQL_ASSOC);
    }

    //banner图片地址
    $banner_result=mysql_query('select * from banner_img');

    $banner=Array();
    for($i=0;$i<mysql_num_rows($banner_result);$i++){
        $banner[$i]=mysql_fetch_array($banner_result,MYSQL_ASSOC);
    }

    //拉取每日精选--信息
    $every_result=mysql_query('select * from item_detail');

    $every=Array();
    for($i=0;$i<mysql_num_rows($every_result);$i++){
        $every[$i]=mysql_fetch_array($every_result,MYSQL_ASSOC);
    }
    //拉取每日精选--图片
    $every_img_result=mysql_query('select * from item_img_addr');

    $every_img=Array();
    for($i=0;$i<mysql_num_rows($every_img_result);$i++){
        $every_img[$i]=mysql_fetch_array($every_img_result,MYSQL_ASSOC);
    }

    //拉取热销榜单
    $hot_result=mysql_query('select * from hot_sale');

    $hot=Array();
    for($i=0;$i<mysql_num_rows($hot_result);$i++){
        $hot[$i]=mysql_fetch_array($hot_result,MYSQL_ASSOC);
    }

    //今日特卖
    $today_result=mysql_query('select * from today_sale');

    $today=Array();
    for($i=0;$i<mysql_num_rows($today_result);$i++){
        $today[$i]=mysql_fetch_array($today_result,MYSQL_ASSOC);
    }
    
    //热门推荐
    $hot_suggest_result=mysql_query('select * from hot_suggest');

    $hot_suggest=Array();
    for($i=0;$i<mysql_num_rows($hot_suggest_result);$i++){
        $hot_suggest[$i]=mysql_fetch_array($hot_suggest_result,MYSQL_ASSOC);
    }

    //中部广告图片middle_img_ad
    $mid_ad_result=mysql_query('select * from middle_img_ad');

    $mid_ad=Array();
    for($i=0;$i<mysql_num_rows($mid_ad_result);$i++){
        $mid_ad[$i]=mysql_fetch_array($mid_ad_result,MYSQL_ASSOC);
    }

    //合并数据
    class alldata{

    }
    $alldata=new alldata();
    $alldata->search_hot=$search_hot;
    $alldata->search_right_ad=$search_right_ad;
    $alldata->banner_img=$banner;
    $alldata->everyday_info=$every;
    $alldata->everyday_img=$every_img;
    $alldata->hot_sale=$hot;
    $alldata->today=$today;
    $alldata->hot_suggest=$hot_suggest;
    $alldata->mid_ad=$mid_ad;
    echo json_encode($alldata);
?>