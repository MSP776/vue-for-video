import 'lib-flexible/flexible'

import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1. 引入你需要的组件
import {
	Button,
	Tabbar,
	TabbarItem,
	Tab,
	Tabs,
	Swipe,
	SwipeItem,
	Image as VanImage,
	Lazyload,
	Icon,
	Sticky
} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);
app.use(Button)
	.use(Tab)
	.use(Tabs)
	.use(Tabbar)
	.use(TabbarItem)
	.use(store)
	.use(router)
	.use(Swipe)
	.use(SwipeItem)
	.use(VanImage)
	.use(Lazyload)
	.use(Icon)
	.use(Sticky)
	.mount('#app')
	
