<!-- 購物車清單 -->
<template>
	<div>
		<table class="table table-md custom-table-width justify-content-center">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">品名</th>
					<th scope="col">數量</th>
					<th scope="col">單價</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, key) in cartlist" :key="key">
					<td width="30" class="align-middle"><button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"><i class="fas fa-trash-alt"></i></button></td>
					<td width="120" class="align-middle">
						{{ item.product.title }}
						<div class="text-success" v-if="item.coupon">
							已套用優惠卷
						</div>
					</td>
					<td width="60" class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
					<td width="60" class="align-middle text-right">{{ item.final_total | currency }}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3" class="text-right">總計：</td>
					<td class="text-right">{{ cartdata.total }}</td>
				</tr>
				<tr v-if="cartdata.final_total !== cartdata.total">
					<td colspan="3" class="text-right text-success">折扣價：</td>
					<td class="text-right text-success">{{ cartdata.final_total }}</td>
				</tr>
			</tfoot>    
		</table>
		<div class="input-group mb-3 input-group-sm custom-coupon-area">
			<input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
			<div class="input-group-append">
				<button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
			</div>
		</div>
	</div>
  
</template>

<script>
export default {
  name: "Cartlist",
	props: ["cartdata"],
	data() {
		return {
			coupon_code: '',
		}
	},
	methods: {
		removeCartItem(id) {
			console.log(id);
      this.$emit("emitCartItemId", id);
		},
		addCouponCode() {
			this.$emit("couponCode", this.coupon_code);
		}
	},
  computed: {
    cartlist() {
			console.log(this.cartdata);
      const vm = this;
      return vm.cartdata.carts;
    }
  }
};
</script>

<style scoped>
.table {
  margin: auto;
}

.custom-table-width {
  max-width: 700px;
}

.custom-coupon-area {
	width: 100%;
	max-width: 700px;
  margin: auto;	
}
</style>