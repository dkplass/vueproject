<template>
  <div>
		<div class="container-fluid">	
			<div class="row flex-row customize-height">
				<nav class="navbar customize-navbar navbar-light navbar-expand-lg">
					<div class="fluid-logo">				
						<router-link to="/">
							<img class="img-fluid d-block" src="../assets/logo.png" />
						</router-link>
					</div>
					<button class="btn navbar-toggler fr" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>			  
					
					<div class="collapse navbar-collapse customize-collapse flex-column" id="navbarSupportedContent">
						<div class="logo m-2">				
							<router-link to="/">
								<img class="img-fluid d-block px-4" src="../assets/logo.png" />
							</router-link>
						</div>
						<div class="navigation mt-5">
							<ul class="products-collection pl-0">
								<li>
									<router-link class="link" to="">全部商品</router-link>
									<div class="products-child mt-2">
										<ul class="pl-0">
											<li class>
												<router-link class="link" to="">上衣</router-link>
											</li>
											<li class>
												<router-link class="link" to="">褲子</router-link>
											</li>
											<li class>
												<router-link class="link" to="">鞋</router-link>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
						<div class="social-media row justify-content-center">				
							<span class=""><i class="fab fa-facebook-square icon"></i></span>
							<span class=""><i class="fab fa-instagram icon"></i></span>
							<span class=""><i class="fab fa-youtube icon"></i></span>
						</div>
					</div>
					
																							
				</nav> 
				<main role="main" class="main m-4">
					<router-view></router-view>
				</main> 
			</div>					
		</div>
  </div>
</template>

<script>
</script>

<style lang="scss" scope>
.btn:focus,.btn:active {
  outline: none !important;
  box-shadow: none;
}

.customize-height {
	height: 100vh;
	overflow-y: hidden;
	align-content: flex-start;
}

.customize-navbar {	  
  padding: 0;
	width: 240px;
  height: 100vh;  
}

.logo {
	border: 4px solid black;
}

.fluid-logo {
	display: none;
}

.navigation {	
	font: {
		family: Helvetica, Arial, sans-serif;
		size: 1rem;		
		weight: 500;
	}		

	width: 100%;
	padding: 0 3rem;
  text-transform: uppercase;
  letter-spacing: 3px;  
  line-height: 1.25em;
  margin-bottom: 25px;
	

	ul, li {
		list-style-type: none;
	}

	.link {
		color: #000000;
		text-decoration: none;

		&:hover {
			color: #cc3636;
		}
	}

	// .products-collection {
	// 	padding-left: ;
	// }

	.products-child li {
		padding: .2rem 1rem;
    border-left: 1px solid #999999;		
	}
}

.social-media {
	position: absolute;
	left: 0;
	bottom: 0; 
	width: 100%;
	height: 40px;	

	.icon {
		font-size: 1.2rem;
		margin: 0.2rem;
		color: #636363;
		cursor: pointer;

		&:hover {
			color: #000000;
		}
	}
}

.navbar-light .navbar-toggler {    
  border-color: transparent;
}

.main {
	flex-grow: 1;
	border: 1px solid black;
}

@media (min-width: 992px) {
	.customize-collapse {
		height: 100vh;
		position: relative;
	}	
}

@media (max-width: 991px) {
  .customize-navbar {
		height: 60px;
		width: 100%;		
	}

	.customize-collapse {
		background-color: rgba(0, 0, 0, .9);
	}

	.logo {
		display: none;
	}

	.fluid-logo {
		display: block;
	}

	.navigation {
		.link {
			
			color: #ffffff;
		}

		.products-child li {
			padding-left: 0;
			padding-right: 0;
			border: none;
		}
	}

	.social-media {
		position: relative;
		margin: 0;
		.icon {
			&:hover {
				color: #ffffff;
			}
		}
	}

	.main {
		width: 100%;
	}
}

@media screen and (max-width: 576px) {
	
}
</style>