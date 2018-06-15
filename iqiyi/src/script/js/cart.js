;(function(){
    var ids=[];
    var numbers=[];
    if($.cookie('cart_id')&&$.cookie('cart_num')){
        ids=$.cookie('cart_id').split(',');//读取购物车商品ID
        numbers=$.cookie('cart_num').split(',');//读取购物车商品数量
    }
    
    //检查是否为购物车页面
    var $table=$('.order_list_cont');
    var num=0;//数量
    var price=0;//总价
    var $num_choose=$('.already_choose');//已选多少件
    var $num_price=$('.sum_price');//总价
    for(var i=0;i<ids.length;i++){
        $.ajax({
            url:'../../php/get_details.php',
            dataType:'json',
            async:false,
            data:{"id":ids[i]}
        }).done(function(d){
            //console.log(d);
            var detail=d.detail[0];
            var img=d.img[0];
            var type=d.type[0];
            price+=parseInt(detail.price*(numbers[ids.indexOf(detail.sid)]));
            num+=parseInt(numbers[ids.indexOf(detail.sid)]);
            //插入tr
            $table.append('<tr><th class="cart_select_all"><input type="checkbox" checked class="single" name="'+detail.sid+'" id="'+detail.sid+'"></th><th class="cart_product_detail"><!-- 商品预览图 --><a href="../html/details.html?sid='+detail.sid+'" class="product_img"><img src="'+img.addr_1+'" alt=""></a><!-- 商品链接和商品种类 --><div class="product_info"><div class="product_link"><a href="../html/details.html?sid='+detail.sid+'">'+detail.title+'</a></div><div class="product_type"><span class="product_type_txt">颜色'+type.type_1.split(',')[1]+'</span></div></div></th><th class="cart_product_num"><div class="product_num_box"><span class="product_num_choose" id="'+detail.sid+'"><input type="text" value="'+numbers[ids.indexOf(detail.sid)]+'" maxlength="8" class="num_input"><!-- 没有足够货物添加num_increase_no 和 num_decrease_no 类 --><span class="num_btn"><span class="num_increase"></span><span class="num_decrease"></span></span></span><span class="num_forSale">库存'+type.type_1.split(',')[2]+'件</span></div></th><th class="cart_price"><div class="product_price_box"><em class="product_price" price="'+detail.price+'">'+detail.price*numbers[ids.indexOf(detail.sid)]+'</em></div></th><th class="cart_del"><div class="product_del_box"><a href="javascript:;" class="product_del">删除</a></div></th></tr>');

            //计算总价和数量
            $num_choose.html(num);
            $num_price.html(price);
        });
    }
})();

//购物车加减符号
(function(){
    var $num=0//库存

    var $num_box=$('.product_num_box');//数量box
    
    //更改input数值
    $num_box.find('input').on('blur',function(){
        //console.log($(this).parent().parent().find('.num_forSale').html().replace(/[^0-9]/g,""));
        var $num=$(this).parent().parent().find('.num_forSale').html().replace(/[^0-9]/g,"");
        changenum($(this),$(this).val(),$num);
    });
    //加减按钮
    var $updown_btn=$('.num_btn');//按钮盒子
    $updown_btn.on('click','.num_increase',function(){
        var $that=$(this).parent().parent().find('input');
        var $num=$(this).parent().parent().parent().find('.num_forSale').html().replace(/[^0-9]/g,"");
        var value=$that.val();
        changenum($that,++value,$num);
    });
    $updown_btn.on('click','.num_decrease',function(){
        var $that=$(this).parent().parent().find('input');
        var $num=$(this).parent().parent().parent().find('.num_forSale').html().replace(/[^0-9]/g,"");
        var value=$that.val();
        changenum($that,--value,$num);
    });

    //更改数量
    function changenum($that,value,num,remove=false){//input,input值,库存,是否删除
        if(parseInt(value)>parseInt(num)){
            $that.val(num);
        }else if(parseInt(value)<1){
            $that.val(1);
        }else{
            $that.val(value);
        }
        
        var sid=$that.parent().attr('id');

        var listArr=[];
        listArr=$.cookie('cart_id').split(',');
        var numArr=[];
        numArr=$.cookie('cart_num').split(',');
        //更改cookie对应ID数量
        numArr[parseInt(listArr.indexOf(sid))]=String(parseInt($that.val()));
        console.log(String(numArr));

        //写入cookie
        $.cookie('cart_num',String(numArr),{expires:7});

        //更改单价
        //单独价格box
        var $single_price=$that.parents('tr').find('.product_price');
        //单独价格
        $single_price.html($single_price.attr('price')*parseInt($that.val()));

        change_num();
    }
    function change_num(){
        //读取cookie
        var listArr=[];
        listArr=$.cookie('cart_id').split(',');
        var numArr=[];
        numArr=$.cookie('cart_num').split(',');
        //更改总价 数量
        var $all_choose=$('.already_choose');
        var $all_price=$('.sum_price');
        var num=0;
        var price=0; 
        $('.order_list_cont tr').each(function(index,element){
            if($(this).find('.cart_select_all input').prop('checked')){
                price+=parseInt($(this).find('.product_price').html());
                num+=parseInt(numArr[index]);
            };
        });
        $all_choose.html(num);
        $all_price.html(price);
    }

})();

//删除商品 选择框
(function(){
    //删除商品
    $('.product_del').on('click',function(){
        var sid=$(this).parents('tr').find('.product_num_choose').attr('id');

        del_item(sid);
        change_num();
    });
    //删除选中商品
    $('.del_select').on('click',function(){
        $('.order_list_cont tr').each(function(index,element){
            if($(this).find('.cart_select_all input').prop('checked')){
                var sid=$(this).find('.product_num_choose').attr('id');
                del_item(sid);
            };
        });
        change_num();
    });
    //清空购物车
    $('.clear_cart').on('click',function(){
        $('.order_list_cont tr').each(function(index,element){
            var sid=$(this).find('.product_num_choose').attr('id');
            del_item(sid);
        });
        change_num();
    });

    //选择框
    var $all=$('.all');
    var $inputs=$('.single');
    
    $all.on('click',function(){
        $('.single').prop('checked',$(this).prop('checked'));
        $all.prop('checked',$(this).prop('checked'));
        change_num();
    });

    $inputs.on('click',function(){
        if($('.order_list_cont input:checked').size()==$('.single').size()){
            $all.prop('checked',true);
        }else{
            $all.prop('checked',false);                
        }
        change_num();
    });
    //删除商品函数
    function del_item(id){
        $('.order_list_cont tr').each(function(){
            if($(this).find('.product_num_choose').attr('id')==id){
                //读取cookie
                var listArr=[];
                listArr=$.cookie('cart_id').split(',');
                var numArr=[];
                numArr=$.cookie('cart_num').split(',');

                var index=listArr.indexOf(id);
                listArr.splice(index,1);
                numArr.splice(index,1);
                console.log(listArr);
                console.log(numArr);
                //写入cookie
                $.cookie('cart_id',String(listArr),{expires:7});
                $.cookie('cart_num',String(numArr),{expires:7});
                $(this).remove();
            }
        }); 
    }
    //更改总价 数量函数
    function change_num(){
        //读取cookie
        var listArr=[];
        listArr=$.cookie('cart_id').split(',');
        var numArr=[];
        numArr=$.cookie('cart_num').split(',');
        //更改总价 数量
        var $all_choose=$('.already_choose');
        var $all_price=$('.sum_price');
        var num=0;
        var price=0; 
        //顶部购物车数量
        $top_num=$('.topNav_cart_num');
        //购物车为空时
        var $empty_box=$('.order_empty');
        //购物车不为空
        var $noempty_box=$('.order_list_box');
        console.log(listArr.length);
        if($.cookie('cart_id')==''){
            $empty_box.show();
            $noempty_box.hide();
            $top_num.html(0);
        }else{
            $top_num.html(listArr.length);
            $empty_box.hide();
            $noempty_box.show();
            $('.order_list_cont tr').each(function(index,element){
                if($(this).find('.cart_select_all input').prop('checked')){
                    price+=parseInt($(this).find('.product_price').html());
                    num+=parseInt(numArr[index]);
                };
            });
            $all_choose.html(num);
            $all_price.html(price);
        }
    }
})();
