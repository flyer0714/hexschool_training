var apiPath = 'https://course-ec-api.hexschool.io/';

const obj = {
  data: {
    uuid: "4c1fd165-c0f3-4508-9a76-f53243608e00",
    products: [],
  },
  getData() {
    const vm = this;
    const url = `${apiPath}api/${vm.data.uuid}/ec/products`;
    axios.get(url)
        .then(function(res) {
              console.log("res", res)
              vm.data.products = res.data.data;
              vm.render();
              })
        .catch(function(err){
            console.log('error', err);  
    })
  },
  render() {
      const vm = this;
      const app = document.getElementById('app');
      const products = vm.data.products;
      let str = "";
      products.forEach(item => {
        str += `
          <div class="card">
            <img src="${ item.imageUrl[0] }" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${ item.title }</h5>
              <p class="card-text">${ item.content }</p>
              <div class="d-flex justify-content-between p-3">
                <div class="d-flex justify-content-end align-items-center">
                  <span class="lineThrough">NT ${item.origin_price} 元</span>
                  <span class="textRed ml-4">NT ${item.price} 元</span>
                </div>
              </div>
            </div>
          </div>`;
      });
      app.innerHTML = str;
  }
}

obj.getData();
