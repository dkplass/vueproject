<template>
	<div>
		<nav aria-label="breadcrumb" class="bg-light mt-4">
			<ol class="breadcrumb">				
				<li class="breadcrumb-item" 
					v-for="(breadcrumb, key) in breadcrumbList"
					:key="key"
					@click="routeTo(key)"
					:class="{'active': breadcrumb.link}">{{ breadcrumb.name }}</li>
				<li class="breadcrumb-item active" v-if="category">{{ category }}</li>				
			</ol>
		</nav>
	</div>
</template>
<script>
export default {
	name: 'Breadcrumb',
	props: ['category'],
	data() {
		return {
			breadcrumbList: [],
		}
	},
	methods: {
		updateBreadcrumbList() {
			const vm = this;
			vm.breadcrumbList = vm.$route.meta.breadcrumb;					
		},
		routeTo(routeGo) {
			const vm = this;			
			if(vm.breadcrumbList[routeGo].link) {
				this.$router.push(vm.breadcrumbList[routeGo].link)
			}
		}
	},
	watch: {
		'$route' (to, from) {
			// 監聽$route變化
			// const toDepth = to.path.split('/').length
			// const fromDepth = from.path.split('/').length
			// this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
			this.updateBreadcrumbList();
		}
	},
	mounted() {
		this.updateBreadcrumbList();
	}
}
</script>
<style>
.breadcrumb-item {
	cursor: pointer;
}
</style>