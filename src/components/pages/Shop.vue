<template>
	<div>
		<loading :active.sync="isLoading"></loading>
		<div class="container">			
			<Breadcrumb :category="category"></Breadcrumb>
			<div class="category-tab w-100">
				<ul class="col-12 nav nav-pills nav-fill">					
					<li class="col-3 py-2 nav-item" >
						<a class="category-tab-link" 
							href="#"
							:class="{'active' : category == '全部'}"
							@click.prevent="category = '全部'">全部</a>						
					</li>
					<li class="col-3 py-2 nav-item">
						<a class="category-tab-link" 
							href="#"
							:class="{'active' : category == '上衣'}"
							@click.prevent="category = '上衣'">上衣</a>
					</li>
					<li class="col-3 py-2 nav-item">
						<a class="category-tab-link" 
							href="#"
							:class="{'active' : category == '褲裝'}"
							@click.prevent="category = '褲裝'">褲裝</a>
					</li>
					<li class="col-3 py-2 nav-item">
						<a class="category-tab-link" 
							href="#"
							:class="{'active' : category == '鞋類'}"
							@click.prevent="category = '鞋類'">鞋類</a>
					</li>					
				</ul>
			</div>
			<div class="row mt-4">
				<div class="col-md-4 mb-4" v-for="item in showActiveProduct" :key="item.id">
					<div class="card h-100 border-0 shadow-sm">
						<div
							style="height: 250px; background-size: cover; background-position: center"
							:style="{backgroundImage: `url(${item.imageUrl})`}"
						></div>
						<div class="card-body">
							<span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
							<h5 class="card-title">
								<a href="#" class="text-dark">{{ item.title }}</a>
							</h5>
							<p class="card-text">{{ item.content }}</p>
							<div class="d-flex justify-content-between align-items-baseline">
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
		</div>
	</div>
</template>
<script>
import Breadcrumb from '../Breadcrumb';

import scrollReveal from 'scrollreveal';

export default {
	components: {
		Breadcrumb,		
	},	
	data() {
    return {
			products: [],
			showProducts: [],			
			category: "全部",
			breadcrumb: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
			},
			scrollReveal: scrollReveal() //註冊 scrollReveal
    };
	},
	methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {											
				vm.products = Object.values(response.data.products).map(item => item);	        
				vm.isLoading = false;								
      });
		}
	},
	computed: {
		showActiveProduct() {
			const vm = this;	
			vm.isLoading = true;	

			if(vm.category === "上衣") {
				vm.showProducts.length = 0;

				vm.products.forEach(function(item, index) {        
					if (item.is_enabled === 1 && item.category === "上衣") {            
						vm.showProducts.push(item);
					}								
				});

				vm.isLoading = false;	

				return vm.showProducts;

			} else if(vm.category === "褲裝") {
				vm.showProducts.length = 0;

				vm.products.forEach(function(item, index) {        
					if (item.is_enabled === 1 && item.category === "褲裝") {            
						vm.showProducts.push(item);
					}								
				});

				vm.isLoading = false;	

				return vm.showProducts;
			} else if(vm.category === "鞋類") {
				vm.showProducts.length = 0;

				vm.products.forEach(function(item, index) {        
					if (item.is_enabled === 1 && item.category === "鞋類") {            
						vm.showProducts.push(item);
					}								
				});

				vm.isLoading = false;	

				return vm.showProducts;
			} else {
				vm.showProducts.length = 0;	

				vm.products.forEach(function(item, index) {        
					if (item.is_enabled === 1) {            
						vm.showProducts.push(item);
					}								
				});	
				
				vm.isLoading = false;	

				return vm.showProducts;
			}			
		},		
	},
	created() {
		this.getProducts();  		
	},
	updated() {
		this.scrollReveal.reveal('.card', {
			distance: '0px',			
    	duration: 500, 	
			delay: 0,
			easing: 'linear',			
			mobile: true,					
		});
	}	
}
</script>
<style lang="scss" scope>
.category-tab {	
	font-size: 1rem;	
	overflow: hidden;

	ul, li {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	li {
		float: left;
		text-align: center;
		cursor: default;

		.category-tab-link {
			position: relative;
			display: block;
			overflow: hidden;
			width: 70%;		
			line-height: 2rem;	
			color: #5a5a5a;
			padding: .4rem .6rem;
			cursor: pointer;
			border-bottom: 1px solid rgb(143, 130, 96);
			z-index: 2;			

			&:before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;			
				background-color: rgb(143, 130, 96);	
				z-index: -1;
				-webkit-transform: translateX(-100%);
								transform: translateX(-100%);
				transition: all .5s;
			}

			&:hover {		
				color: #fff;						
				text-decoration: none;
			}	
			
			&:hover:before {				
				-webkit-transform: translateX(0);
							  transform: translateX(0);
			}
		}

		

		.category-tab-link.active {
			color: #fff;
			background-color: rgb(143, 130, 96);

			&:hover:before {
				background-color: rgb(143, 130, 96);
				-webkit-transform: translateX(-100%);
							  transform: translateX(-100%);
			}
		}
	}
	
}
</style>