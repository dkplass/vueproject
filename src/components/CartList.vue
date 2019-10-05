<!-- 購物車清單 -->
<template>
  <table class="table table-md custom-table-width justify-content-center">
    <thead>
      <tr>        
        <th scope="col">品名</th>
        <th scope="col">數量</th>
        <th scope="col">單價</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in cartlist" :key="key">        
        <td width="120">{{ item.product.title }}</td>
        <td width="60">{{ item.qty }}</td>
        <td width="60">{{ item.product.price | currency }}</td>
      </tr>      
    </tbody>
		<caption>
			<div class="text-right">
				<span>總計：{{ cartdata.total }}</span>
			</div>
			<div class="text-right">
				<span>折扣價：{{ cartdata.final_total }}</span>
			</div>
		</caption>
  </table>
</template>

<script>
export default {
	name: "Cartlist",
	props: ["cartdata"],	
	computed: {
		cartlist() {
			const vm = this;			
			return vm.cartdata.carts;
		}
	}
}
</script>

<style scoped>
.table {
	margin: auto;
}

.custom-table-width {
	max-width: 700px;
}
</style>