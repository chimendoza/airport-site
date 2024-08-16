import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {nl2br,inputType,maxChar} from "@/util/directives";

import axios from 'axios'

const DEV_API='http://localhost:8007/api/v1';
const PROD_API='https://yourdomain.com/api/v1';


const apiUrl=process.env.NODE_ENV === 'development'?DEV_API:PROD_API;


const api = axios.create({
  baseURL: apiUrl,
});






const app = createApp(App)

app.config.globalProperties.$api = api;
app.config.globalProperties.$apiUrl = 'http://localhost:8006/api/v1';





app.directive('type',inputType);
app.directive('maxchars',maxChar);
app.directive('nl2br',nl2br);


app.component('VueDatePicker', VueDatePicker);

app.use(router)
app.mount('#app')
