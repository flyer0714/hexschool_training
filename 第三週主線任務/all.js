

new Vue({
    el: '#app',
    data: {
      products: [
          {
          id: 1586934917210,
          unit: "台",
          category: "掌上主機",
          title: "Switch",
          origin_price: 20000,
          price: 9980,
          description: "想玩就玩",
          content: "動森太好玩惹",
          is_enabled: 1,
          imageUrl:
            "https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        },
        {
          id: 1196934917910,
          unit: "台",
          category: "主機",
          title: "PS5 Wifi",
          origin_price: 29999,
          description: "次世代超強規格",
          content: "我也想要換一台 PS5 Wifi",
          price: 9487,
          is_enabled: 0,
          imageUrl:
            "https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        }
      ],
      tempProduct: {}
    },
    methods: {
      // 開啟互動視窗
      openModal(event, item) {
        switch(event){
          case 'new': 
            console.log('new');
            this.tempProduct = {};
            $("#productModal").modal('show');
            break;
          case 'edit': 
            console.log('edit');
            this.tempProduct = Object.assign({}, item);
            $("#productModal").modal('show');
            break;
          case 'delete': 
            console.log('delete');
            this.tempProduct = Object.assign({}, item);
            $("#delProductModal").modal('show');
            break;  
          default:
            break;
        }
      },
      // 更新資料
      updateProduct(){
        if(this.tempProduct.id) {
          const id = this.tempProduct.id;
          this.products.forEach((item, i) => {
            if(item.id == id){
              item = this.tempProduct;
            }
          })
        }else {
          const id = new Date().getTime();
          this.tempProduct.id = id;
          this.product.push(this.tempProduct);
          
        }
        // 完成後清空 tempProduct 以放入下筆資料
        this.tempProduct = {};
        // 隱藏(關閉)互動視窗
        $("#productModal").modal('hide');  
      }
    }
})


/* 建構資料
id: 日期/時間 - number(integer)
title：商品名稱 - string
category：商品分類 - string
content：商品敘述 - string
description：商品說明 - string
imageUrl：商品圖片 - string
enabled：是否上架 - boolean
origin_price：原價 - number(integer)
price：售價 - number(integer)
unit：單位 - string
*/


