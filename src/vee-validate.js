import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend, configure } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { i18n } from "./i18n";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);

    return i18n.t(`validation.${values._rule_}`, values);
  }
});

// Install required rule and message.
extend("required", required);

// Install email rule and message.
extend("email", email); 

// Custom Taiwan phone number.
extend('phone', {
  validate: (value) => {
    var mobileReg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
    var phoneReg = /^0\d{2,3}-?\d{7,8}$/;
    
    return mobileReg.test(value) || phoneReg.test(value);    
  },  
  message: '不符合手機或市話格式'
});