<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 商品列表 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div> -->
              <div class="h5" v-if="item.price == item.origin_price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price !== item.origin_price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price !== item.origin_price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車清單 -->
    <Cartlist
      :cartdata="cartdata"
      @emitCartItemId="removeCartItem"
      @couponCode="addCouponCode"
      v-if="cartdata.carts && cartdata.carts.length"
    ></Cartlist>

    <!-- 單一商品彈窗 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂單表單 -->
    <div class="my-5 row justify-content-center">
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        class="col-md-6"
        @submit.prevent="createOrder"
      >
        <ValidationProvider rules="required|email" name="email" v-slot="{ errors }" slim>
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="text"
              class="form-control"
              id="useremail"
              v-model="form.user.email"
              :class="{ 'is-invalid': errors[0] }"
              placeholder="請輸入 Email"
            />
            <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" name="name" v-slot="{ errors }" slim>
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="form.user.name"
              :class="{ 'is-invalid': errors[0] }"
              placeholder="輸入姓名"
            />
            <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|phone" name="phone" v-slot="{ errors }" slim>
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              :class="{ 'is-invalid': errors[0] }"
              placeholder="請輸入電話"
            />
            <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" name="address" v-slot="{ errors }" slim>
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="address"
              class="form-control"
              id="useraddress"
              v-model="form.user.address"
              :class="{ 'is-invalid': errors[0] }"
              placeholder="請輸入地址"
            />
            <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name id class="form-control" v-model="form.message" cols="30" rows="10"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Cartlist from "../CartList";

export default {
  components: {
    Cartlist
  },
  data() {
    return {
      products: [],
      product: {},
      cartdata: {},
      status: {
        loadingItem: ""
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      isLoading: false
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        // console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        // console.log(response);
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        // console.log(response);
        vm.status.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.cartdata = response.data.data;
        console.log(vm.cartdata);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then(response => {
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCouponCode(couponCode) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: couponCode
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;

      this.$refs.observer.validate().then((isValid) => {
        if (isValid) {
          this.$http.post(url, { data: order }).then((response) => {     
            this.$bus.$emit("message:push", "訂單已建立", "success");       
            console.log("訂單已建立");
            vm.isLoading = false;

            if(response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }

            // vm.form.user = {
            //   name: "",
            //   email: "",
            //   tel: "",
            //   address: ""
            // };
            
            // requestAnimationFrame(() => {
            //   this.$refs.observer.reset();
            // });
            
          });
        } else {
          console.log("欄位不完整");
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
