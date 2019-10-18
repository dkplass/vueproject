<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <span class="ad">This is what Trend all about.</span>
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item first-item active">
          <div class="ring"></div>          
        </div>
        <div class="carousel-item second-item">
          <div class="ring"></div>          
        </div>
        <div class="carousel-item third-item">
          <div class="ring"></div>          
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="container">
      <div class="category my-4">
        <ul class="list">
          <li class="item text-center col-sm-3 col-3"
            v-for="(category, key) in categories" :key="key"
            @click.prevent="goCategory(category.title)">
            {{ category.title }}            
          </li>          
        </ul>
      </div>
			<section class="index-content mt-4 text-center">
				<div class="row">
          <div class="col-md-6">
            <div class="block-item left-top">
              <div class="layer"></div>
              <div class="advertise">新品上架</div>
            </div>
            <div class="left-bottom bg-light mt-4">
              <h3>電子報訂閱</h3>    
              <ValidationObserver ref="observer" v-slot="{ valid }">          
                <ValidationProvider rules="required|email" name="email" v-slot="{ errors }" slim>
                  <div class="input-group px-4">                                 
                    <input type="text" 
                      class="form-control" 
                      placeholder="電子郵件" 
                      id="email"  
                      v-model="form.email"                        
                      aria-label="Recipient's email"                     
                      aria-describedby="button-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" :disabled="!valid" @click.prevent="subscribe">訂閱</button>                      
                    </div>
                  </div>
                </ValidationProvider>  
              </ValidationObserver>           
            </div>
          </div>
          <div class="col-md-6">
            <div class="right-top bg-light">
              <h3>夏季特賣</h3>
              <router-link to="/shop" class="btn btn-customize">Go Shop</router-link>              
            </div>
            <div class="block-item right-bottom mt-4">
              <div class="layer"></div>              
            </div>
          </div>
        </div>
			</section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {      
      form: {
        email: "",
      },
      categories: [
        { title: '全部' },
        { title: '上衣' },
        { title: '褲裝' },
        { title: '鞋類', },        
			],      
    };
  },
  methods: {
    subscribe() {         
      this.$refs.observer.validate().then((isValid) => {
        if (isValid) {                           
          this.$bus.$emit("message:push", "訂閱成功", "success");
        } else {
          this.$bus.$emit("message:push", "電子郵件格式不符合", "danger");                    
        }
      });
    },
    goCategory(categoryTitle) {
      const vm = this;
      vm.$router.push({ path: '/shop', query: { category: categoryTitle } });
    }
  },
  created() {
    this.$bus.$emit("cartQty:refresh");
    this.$bus.$emit("favorite:refresh");
  }
};
</script>

<style lang="scss" scope>
</style>