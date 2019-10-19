<template>
	<div>		
		<div class="container">
			<div class="col-12">
				<Breadcrumb></Breadcrumb>
				<div class="flip-game">
					<div class="event-card bg-dark row mx-auto">
						<div class="col-12 top">
							<div class="prize-name">點擊按鈕抽獎</div>							
						</div>						
						<div class="col-12 bottom">
							<div class="event-btn btn-start" @click="start" v-if="status  === false">開始抽獎</div>
							<div class="event-btn btn-start" @click="stop" v-else="status  === true">停止</div>
						</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery';
import Breadcrumb from '../Breadcrumb';

export default {
	components: {
		Breadcrumb,		
	},
	data() {
		return {
			status: false,
			coupon: [
        {
          couponId: 1,
          name: '九折優惠卷代碼',
          coupon_code: '9off',
        },
        {
          couponId: 2,
          name: '八折優惠卷代碼',
          coupon_code: '8off',
        },
        {
          couponId: 3,
          name: '七折優惠卷代碼',
          coupon_code: '7off',
        },        
      ],
			timeout: null
		}
	},
	methods: {
		start() {
			const vm = this;			
			let $start = document.querySelector(".event-btn");			
			let $prize = document.querySelector(".prize-name");			
			
			if(!vm.status) {				
				// $start.textContent = '停止';
				$start.classList.add("s-move");        				
				
				vm.timeout = setInterval(()=> {
					let random = parseInt(Math.random() * vm.coupon.length);
					let randomName = `${vm.coupon[random].name}`;
					$prize.textContent = randomName;														
				}, 10);
				
				vm.status = true;
			} 			
		},
		stop() {
			// $start.textContent = '開始抽獎';  
			const vm = this;      							
			let $prize = document.querySelector(".prize-name");	
			clearInterval(vm.timeout);			
			if(vm.status) {	
				for(let i = 1; i <= 15; i++) {						 
					(function(j){						
						setTimeout(() => {
							let random = parseInt(Math.random() * vm.coupon.length);
							let randomName = `${vm.coupon[random].name}`;							
							$prize.textContent = randomName;								
							
							if(j === 15) {
								randomName = `恭喜獲得 ${vm.coupon[random].name} 請複製代碼 ${vm.coupon[random].coupon_code}`;
								$prize.textContent = randomName;
							}
						}, i * j * 12);											
					}(i));
				}					 
				vm.status = false;						
			}
		},				
	},
	watch: {
		
	}

}
</script>

<style lang="scss" scope>
$height: 64px;
$width: 180px;

.flip-game {
	padding: 4rem 0;
	.event-card {
		width: 100%;		
		border: 2px solid	#8f8260;	
	}

	.bottom {
		height: 200px;
		.event-btn {
			position: absolute;		
			width: $width;
			height: $height;
			line-height: $height;
			text-align: center;
			cursor: pointer;
			font-size: 2rem;
			transition: .2s all;
			box-sizing: border-box;
			color: #ffffff; 		
			border: 1px solid #ffffff;   
			transform: translate(-50%, -50%);
			left: 50%;
			top: 50%;
		}

		.btn-start {    
			&:hover {
				text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
				box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
			}
			
			&::after {
				position: absolute;
				content: "";
				top: -10px;
				left: -10px;
				right: -10px;
				bottom: -10px;
				transition: 
						.5s outline-color, 
						.5s outline, 
						.5s transform;
				transition-timing-function: cubic-bezier(0.2, .8, 0.25, .8);
				transform: scale3d(1.1, 1.3, 0);
				outline: 0px solid;
				outline-color: rgba(255, 255, 255, .05);
				outline-offset: -10px;
			}
			
			&:hover::after {
				top: 10px;
				left: 10px;
				right: 10px;
				bottom: 10px;
				transform: scale(1);
				outline: 1px solid;
				outline-color: rgba(255, 255, 255, 0.6);
				outline-offset: 10px;
				transition: .5s outline-offset cubic-bezier(0.2, .8, 0.25, .8),.5s outline-color cubic-bezier(0.2, .8, 0.25, .8),.5s outline cubic-bezier(0.2, .8, 0.25, .8);
			}
			
			&:active {
				mix-blend-mode: overlay;
			}
		}
	}

	.top {
		height: 200px;
		.prize-name {
			width: 100%;				
			text-align: center;
			position: absolute;
			font-size: 2rem;
			line-height: 1;
			transition: .2s all;
			color: #fff;
			transform: translate(-50%, -50%);
			left: 50%;
			top: 50%;
			transition: .1s all;
		}
	}

	.s-move {
    top: 80%;
	}
}
</style>