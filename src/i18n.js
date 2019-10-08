import Vue from "vue";
import VueI18n from "vue-i18n";
import zhTW from "vee-validate/dist/locale/zh_TW.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: "zhTW",
	messages: {		
		zhTW: {
			fields: {
        email: "電子郵件",
				password: "密碼",
				name: "姓名",
				phone: "電話",
				address: "地址"
			},			
      validation: zhTW.messages
		},
	}
});

export { i18n };