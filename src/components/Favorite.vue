<template>
	<div>
		<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="getFavorite">
			<i class="fas fa-heart fa-lg"></i>
			<span class="badge badge-pill badge-danger customize-badge">{{ favoriteQty }}</span>
		</button>	
		<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
			<div class="d-flex favorite-list mb-1" v-for="favoriteItem in favorite" :key="favoriteItem.id">
				<button type="button" 
					class="btn text-danger btn-sm mx-1"
					@click.prevent="deleteFavoriteItem(favoriteItem.id)">
					<i class="fas fa-trash-alt"></i>
				</button>
				<a class="dropdown-item" href="#" >{{ favoriteItem.title }}</a>					
			</div>
		</div>	
	</div>
</template>

<script>
export default {
	name: 'favorite',
	data() {
    return {
			favoriteQty: 0,
			favoriteLocalStorage: JSON.parse(window.localStorage.getItem("favoriteStoredId")) || [],
			favorite: [],
			products: [],
    };
	},
	methods: {
		getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;    
      this.$http.get(url).then((response) => {													
				vm.products = response.data.products;															
			});						
		},	
		getFavorite() {
			const vm = this;
			vm.getProducts();	
			vm.favorite = [];
			vm.fetch();								
			vm.products.forEach(function(item, index) {
        vm.favoriteLocalStorage.forEach(function(i){
          if (item.id === i) {            
            vm.favorite.push(item);
          }
        });
			});			
		},
		deleteFavoriteItem(id) {
			const vm = this;          
      let $id = id;      
      let result = vm.favoriteLocalStorage.map(function(productItem){
        return productItem
			}).indexOf($id); 
			vm.favoriteLocalStorage.splice((result), 1);
			localStorage.setItem("favoriteStoredId", JSON.stringify(vm.favoriteLocalStorage));   
			vm.getFavorite();
			vm.updateQty();
		},
		fetch(){
			// 重新取得 LocalStorage
			const vm = this;
			vm.favoriteLocalStorage.length = 0;
			vm.favoriteLocalStorage = JSON.parse(window.localStorage.getItem("favoriteStoredId"));		
    },	
    updateQty() {
			// 更新我的最愛數量
			const vm = this;
			vm.fetch();	
			vm.getFavorite();
			vm.favoriteQty = vm.favoriteLocalStorage.length;
		}
	},	
	created() {
		const vm = this; 				  	
    vm.$bus.$on('favorite:refresh', () => {															
			vm.updateQty();								
		});  				
	}
}
</script>

<style lang="scss" scope>
.favorite-list {
	font-size: .6rem;
	line-height: 2;
}
</style>