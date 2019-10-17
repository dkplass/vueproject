<template>
	<div>
		<loading :active.sync="isLoading"></loading>
		<div class="container">			
			<ul class="row step">
				<li class="col-4 text-center" :class="{'active': step === 1}">確認購物車明細</li>
				<li class="col-4 text-center" :class="{'active': step === 2}">填寫購物人資訊</li>
				<li class="col-4 text-center" :class="{'active': step === 3}">付款/完成訂單</li>
			</ul>
			<template v-if="step === 1">
				<Cartlist
					:cartdata="cartdata"
					@emitCartItemId="removeCartItem"
					@couponCode="addCouponCode"
					v-if="cartdata.carts && cartdata.carts.length"
				></Cartlist>
				<div class="mb-4 step-btn">
					<router-link to="/shop" class="btn btn-secondary float-left">
						<i class="fas fa-arrow-left"></i>
						繼續購買
					</router-link>
					<a href="#" class="btn btn-danger d-inline-block float-right" @click.prevent="step = 2">
						下一步，填寫訂購資料
						<i class="fas fa-arrow-right"></i>
					</a>
				</div>				
			</template>
			<div v-if="step === 2" class="my-5 row justify-content-center">								
				<ValidationObserver
					ref="observer"
					v-slot="{ invalid }"
					tag="form"
					class="col-md-6 mx-auto"
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
					<div class="col-12 mb-4 mt-5 step-btn">
						<router-link to="/shop" class="btn btn-secondary float-left">
							<i class="fas fa-arrow-left"></i>
							上一步，確認購物車明細
						</router-link>
						<button class="btn btn-danger d-inline-block float-right" :disabled="invalid">
							下一步，完成訂單/付款
							<i class="fas fa-arrow-right"></i>
						</button>
					</div>
				</ValidationObserver>								
			</div>
			<div v-if="step === 3" class="my-5 row justify-content-center">
				<form class="col-md-6" @submit.prevent="payOrder">
					<table class="table">
						<thead>
							<th>品名</th>
							<th>數量</th>
							<th>單價</th>
						</thead>
						<tbody>
							<tr v-for="item in order.products" :key="item.id">
								<td class="align-middle">{{ item.product.title }}</td>
								<td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
								<td class="align-middle text-right">{{ item.final_total }}</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td colspan="2" class="text-right">總計</td>
								<td class="text-right">{{ order.total }}</td>
							</tr>
						</tfoot>
					</table>

					<table class="table">
						<tbody>
							<tr>
								<th width="100">Email</th>
								<td>{{ order.user.email }}</td>
							</tr>
							<tr>
								<th>姓名</th>
								<td>{{ order.user.name }}</td>
							</tr>
							<tr>
								<th>收件人電話</th>
								<td>{{ order.user.tel }}</td>
							</tr>
							<tr>
								<th>收件人地址</th>
								<td>{{ order.user.address }}</td>
							</tr>
							<tr>
								<th>付款狀態</th>
								<td>
									<span v-if="!order.is_paid">尚未付款</span>
									<span v-else class="text-success">付款完成</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="text-right" v-if="order.is_paid === false">
						<button class="btn btn-danger">確認付款去</button>
					</div>
				</form>
			</div>
		</div>		
	</div>
</template>

<script>
import Cartlist from "../CartList";

export default {
	components: {
    Cartlist
  },
  data() {
    return {
			step: 1,      
			cartdata: {}, 			
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
			},
			orderId: "",
			order: {
				user: {},
			},
      isLoading: false
    };
	},
	methods: {
		getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.cartdata = response.data.data;      
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
				this.$bus.$emit("cartQty:refresh");
      });
		},
		addCouponCode(couponCode) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: couponCode
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then((response) => {
				if(response.data.success) {
					this.$bus.$emit("message:push", `${response.data.message}`, "success");
				} else {
					this.$bus.$emit("message:push", `${response.data.message}`, "danger");
				}				
        
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
            vm.isLoading = false;
						
            if(response.data.success) {
							vm.orderId = response.data.orderId;  
							vm.getOrder();
							vm.step = 3;            
            }
          });
        } else {
					this.$bus.$emit("message:push", "欄位不完整", "success");           
          vm.isLoading = false;
        }
      });
		},
		getOrder() {
			const vm = this;
			const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
			vm.step = 3;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
				console.log(vm.order);    
				vm.order = response.data.order;          
        vm.isLoading = false;
      });
		},
		payOrder() {
			const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {    				
				if(response.data.success) {
					this.$bus.$emit("message:push", `${response.data.message}`, "success"); 
					this.$bus.$emit("cartQty:refresh");
					this.getOrder();
				} else {
					this.$bus.$emit("message:push", `${response.data.message}`, "danger"); 
					this.$bus.$emit("cartQty:refresh");
					this.getOrder();
				}
				vm.isLoading = false;
      });
		}
	},
	created() {
		this.getCart();
	}
}
</script>

<style lang="scss" scope>
.step {
	margin: 3rem 0;
	overflow: hidden;
	list-style-type: none;	
	padding: 0;	
	li {		
		color: #000000;
		text-transform: uppercase;
		font-size: 1rem;	
		position: relative;		
		@for $i from 1 through 3 {			
			&:nth-child(#{$i}) {
				&:before {
					content: "#{$i}";
					counter-increment: step;
					width: 20px;
					line-height: 20px;
					display: block;
					font-size: 10px;
					border: 1px solid #8f8260;
					color: #333;
					background-color: #ffffff;
					border-radius: 3px;
					margin: 0 auto 5px auto;
				}
			}
		}	
		
	}
	li + li {
		&:after {
			content: '';
			width: 100%;
			height: 2px;
			background-color: #8f8260;
			position: absolute;
			left: -50%;
			top: 9px;
			z-index: -1;
		}	
	}

	li.active:before, li.active:after {
		background-color: #8f8260;
		color: white;
	}
}

.step-btn {
	overflow: hidden;
}

@media (max-width: 576px) {
	.step {
		li {
			font-size: .6rem;
		}
	}
}
</style>