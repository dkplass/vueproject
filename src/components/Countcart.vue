<template>
  <span>{{ cartQty }}</span>
</template>

<script>
export default {
	name: 'countcart',
	data() {
    return {
      cartQty: 0,
    };
	},
	methods: {
    updateQty() {
			const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
				// vm.cartdata = response.data.data.carts;    
				vm.cartQty = response.data.data.carts.length;				
        vm.isLoading = false;
      });
		}
	},
	created() {
		const vm = this;  
		vm.updateQty();  
    vm.$bus.$on('cartQty:refresh', () => {
      vm.updateQty();
    });    
  },
}
</script>