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
      this.$http.get(url).then(response => {				
				vm.cartQty = response.data.data.carts.length;				        
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