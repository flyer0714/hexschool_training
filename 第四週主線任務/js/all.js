import pagination from './pagination.js';
import modal from './modal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);

new Vue({
    el: '#app',
    data: {
      // 產品資料
      products: [],
      pagination: {},
      // 暫存/新增區: 避免直接動到儲存data
      tempProduct: {
        imageUrl:[]
      },
      // 儲存 uuid 和 apiPath
      api: {
        uuid: '4c1fd165-c0f3-4508-9a76-f53243608e00',
        path: 'https://course-ec-api.hexschool.io/api/',
      },
      token: '',
      isNew: ''
    },
    methods: {
      // 彈出視窗: 判斷 isNew 行為, 彈出相對應視窗並提供資料 item
      openModal(isNew, item) {
        switch(isNew){
          case 'new': 
            // console.log('new');
            this.tempProduct = { imageUrl: [] };
            this.tempProduct = {};
            $("#productModal").modal('show');
            break;
          case 'edit': 
            // 列表資料缺少 描述 這項資料, 須重新取得
            // 使用 api/{uuid}/admin/ec/product/{id} 取得單一商品細節
            const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
            axios.get(url)
            .then(res => {
              this.tempProduct = Object.assign({}, item);
              $("#productModal").modal('show');
            }).catch(error => {
              console.log(error)
            })
            
            break;
          case 'delete': 
            // console.log('delete');
            this.tempProduct = Object.assign({}, item);
            $("#delProductModal").modal('show');
            break;  
          default:
            break;
        }
      },
      // 更新資料 data
      /* 使用 PATCH api/{uuid}/admin/ec/product/{id} 這支api , 不須使用 updateProduct 函式
      updateProduct() {
        // * 開啟 modal 後, 按下確認鍵的瞬間, 判斷 id 是否存在, 存在則更新資料, 不存在就加入資料
        if(this.tempProduct.id) {
          const id = this.tempProduct.id;
          console.log(`updateProduct id=${id}`)
          this.products.forEach((item, i) => {
            if(item.id === id){
              this.products[i] = this.tempProduct;
            }
          })
        // 不存在 id, 用時間做為新 id 寫入 tempProduct 再將它 push 到 products  
        }else {
          const id = new Date().getTime();
          this.tempProduct.id = id;
          this.products.push(this.tempProduct);
        }
        // 完成後清空 tempProduct 以放入下筆資料
        this.tempProduct = {};
        // 隱藏(關閉)互動視窗
        $("#productModal").modal('hide');  
      },
      */
      // 刪除資料
      delProduct() {
        if(this.tempProduct.id) {
          const id = this.tempProduct.id;
          this.products.forEach((item, i) => {
            if(item.id == id) {
              this.products.splice(i, 1);
              this.tempProduct = {};  
            }
          })
        }
        $("#delProductModal").modal("hide");
      },
      // 初始化頁面及分頁
      getProducts(num = 1) {
        console.log(num)
        const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
        axios.get(url)
          .then( res => {
            console.log('getPage')
            console.log(res)
            this.products = res.data.data;
            this.pagination = res.data.meta.pagination;
            // 關閉 modal 
            if (this.tempProduct.id) {
              this.tempProduct = {
                imageUrl: []
              };
              $("#productModal").modal('hide'); 
            }
          }).catch(error => {
            console.log(error)
          })
      }
    },
    created() {
      // token 作為預設值, 放 created 就可以, 不用放在 getProducts 內
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      this.getProducts();
    },
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


