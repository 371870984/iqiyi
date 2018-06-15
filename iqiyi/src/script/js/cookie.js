;(function(){
    //如果登录 顶部显示用户名
    var $box=$('.topNav_left_user');
    var $show_name=$('.topNav_left_username span');//显示姓名盒子
    var $signin_name=$.cookie('username');//读取cookie用户名
    var $signin_btn=$('.topNav_left_login');//隐藏登录注册按钮
    if($signin_name){
        $box.show();
        $show_name.html($signin_name);
        $('.login_username').html($signin_name);
        $signin_btn.hide();
        $('.order_header_btn').hide();
        $('.username').show().html($signin_name);
    }
    var $sign_out=$('.user_operate');//退出按钮
    $sign_out.on('click',function(){
        $.cookie('username',null,{expires:-1});
        window.location.href='index.html';
    });
})();
//购物车
(function(){
    //$.cookie('cart_id','1,2,3,4,5,6',{expires:7});
    //$.cookie('cart_num','2,3,4,5,6,7',{expires:7});
    var $top_num=$('.topNav_cart_num');//顶部购物车件数
    var $right_num=$('.cart_num')//侧边购物车件数
    var ids=[];
    var numbers=[];
    if($.cookie('cart_id')&&$.cookie('cart_num')){
        ids=$.cookie('cart_id').split(',');//读取购物车商品ID
        numbers=$.cookie('cart_num').split(',');//读取购物车商品数量
    }
    //设置购物车商品数量
    $top_num.html(ids.length);
    $right_num.html(ids.length);

    //购物车为空时
    var $empty_box=$('.order_empty');
    //购物车不为空
    var $noempty_box=$('.order_list_box');
    if(ids.length==0){
        $empty_box.show();
        $noempty_box.hide();
    }else{
        $empty_box.hide();
        $noempty_box.show();
    }
})();