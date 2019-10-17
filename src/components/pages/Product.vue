<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="col-12">
        <Breadcrumb :category="product.title"></Breadcrumb>
      </div>
      <div class="row">
        <div class="col-lg-6 mx-auto">
          <div class="text-center">
            <img :src="product.imageUrl" class="w-100" alt />
          </div>
        </div>
        <div class="col-lg-6 mx-auto">
          <h4 class="my-4">{{ product.title }}</h4>
          <div class="d-flex justify-content-between align-items-baseline my-4">
            <div
              class="h5"
              v-if="product.price == product.origin_price"
            >售價：{{ product.origin_price }} 元</div>
            <div
              class="h6"
              v-if="product.price !== product.origin_price"
            >原價：{{ product.origin_price }} 元</div>
            <div class="h5" v-if="product.price !== product.origin_price">
              <span class="text-danger">特價：</span>
              {{ product.price }} 元
            </div>
          </div>
          <hr />
          <div class="input-group my-4">
            <select class="form-control mr-5" v-model="qty">
              <option value="0" disabled selected>請選擇數量</option>
              <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
            </select>
            <button class="btn btn-customize" @click.prevent="addToCart(product.id, qty)">
              <i class="fas fa-plus"></i>
              加入購物車
            </button>
          </div>
          <table class="table table-responsive">
						<thead>
							<tr>
								<th scope="col">#</th>
                <th scope="col">肩寬</th>
                <th scope="col">全長</th>
                <th scope="col">胸寬</th>
                <th scope="col">腰圍</th>
                <th scope="col">臀圍</th>
                <th scope="col">褲襠</th>
                <th scope="col">褲腿長</th>
                <th scope="col">大腿圍</th>
                <th scope="col">褲管寬</th>								
							</tr>
						</thead>
            <tbody>              
              <tr>
                <td>36</td>
                <td>30.5cm</td>
                <td>137~140cm</td>
                <td>44cm</td>
                <td>90cm</td>
                <td>100cm</td>
                <td>28cm</td>
                <td>67.5cm</td>
                <td>62cm</td>
                <td>38cm</td>
              </tr>
              <tr>
                <td>38</td>
                <td>34cm</td>
                <td>139~142cm</td>
                <td>45cm</td>
                <td>94cm</td>
                <td>102cm</td>
                <td>28.5cm</td>
                <td>68.5cm</td>
                <td>64cm</td>
                <td>39cm</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12 mt-4">
          <h4 class="text-center">商品說明</h4>
          <span>{{ product.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../Breadcrumb";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      isLoading: false,
      product: {},
      productId: "",
      qty: 1
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        console.log(vm.product);
        vm.isLoading = false;
      });
		},
		addToCart(id, n = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;      
      const cart = {
        product_id: id,
        qty: n
      };
      this.$http.post(url, { data: cart }).then(response => {
				this.$bus.$emit("message:push", `${response.data.message}`, "success");        
				this.$bus.$emit("cartQty:refresh");
      });
		},		
  },
  created() {
    this.productId = this.$route.params.productId;
		this.getProduct();		
  }
};
</script>

<style scope>
.btn-customize {
  color: #fff;
  background-color: #8f8260;
  border-color: #8f8260;
}
</style>