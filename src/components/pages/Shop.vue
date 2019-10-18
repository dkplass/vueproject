<template>
	<div>
		<loading :active.sync="isLoading"></loading>
		<div class="container">			
			<div class="col-12">
				<Breadcrumb :category="category"></Breadcrumb>				
				<form class="form-inline input-group mb-3 search" @submit.prevent="search">
          <input type="text" class="form-control" placeholder="search" v-model="searchText">
          <div class="input-group-append">
            <button class="input-group-text bg-light">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
			</div>			
			<div class="category-tab w-100">
				<ul class="col-12 nav nav-pills nav-fill">					
					<li class="col-3 py-2 nav-item"
						v-for="(categoryTab, index) in categories" :key="index">
						<a class="category-tab-link" 
							href="#/shop"
							:class="{'active': category == categoryTab.title}"
							@click="getCategory(categoryTab.title)">{{ categoryTab.title }}</a>						
					</li>									
				</ul>				
			</div>
			<div class="row mt-4">
				<div class="col-12 my-2 text-left text-muted"  v-if="filter">
					<span v-if="filterProducts.length === 0">
						未找到任何有關 "{{ filter }}" 的商品
					</span>
					<span v-else>
						總共找到 {{ filterProducts.length }} 樣有關 "{{ filter }}" 的商品
					</span>
				</div>				
				<div class="col-md-4 mb-4" v-for="item in filterProducts" :key="item.id">
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
              	<div class="h6" v-if="item.price !== item.origin_price">原價 {{ item.origin_price }} 元</div>
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
								@click.prevent="addToCart(item.id, qty)"
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
			breadcrumb: [],
			filter: '',
			categories: [
        { title: '全部' },
        { title: '上衣' },
        { title: '褲裝' },
        { title: '鞋類', },        
			],
			category: '全部',
			searchText: '',
      product: {},      
      isLoading: false,
      status: {
        loadingItem: ""
			},
			scrollReveal: scrollReveal() //註冊 scrollReveal
    };
	},
	methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {													
				vm.products = response.data.products;				
				vm.isLoading = false;								
      });
		},
		getProduct(id) {
			const vm = this;			
			vm.$router.push(`/shop/${id}`);	
		},
		getQuery() {
			const vm = this;
      if (vm.$route.query.category) {
        vm.category = vm.$route.query.category;
      }
    },
		getCategory(category) {
      const vm = this;
			vm.category = category;
			
      if (vm.filter) {
        vm.filter = '';
			}			
    },
		search() {
			const vm = this;
      vm.filter = vm.searchText;
			vm.searchText = '';						
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
	computed: {
		filterProducts() {
			const vm = this;			

      if (vm.filter) {
				vm.category = '全部';					
        return vm.products.filter(item => item.title.indexOf(vm.filter) !== -1);
			}
			
      if (vm.category !== '全部') {				
        return vm.products.filter(item => item.category === vm.category);
			}
												
			return vm.products;						
    },			
	},
	created() {
		this.getQuery();
		this.getProducts();
		this.$bus.$emit("favorite:refresh");  		
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
			margin: 0 auto;
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
				-webkit-transform: translateX(-102%);
								transform: translateX(-102%);
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

.search {	
	margin: .6rem 0		
}
</style>