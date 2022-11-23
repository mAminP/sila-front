import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import fa from 'vee-validate/dist/locale/fa.json'
import { required } from 'vee-validate/dist/rules'

localize('fa', fa)
extend('required', required)
extend('phoneNumber', {
  validate: (val) => {
    return /^(\+98|0)?9\d{9}$/g.test(val)
  },
  message: 'فرمت شماره موبایل معتبر نیست'
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
