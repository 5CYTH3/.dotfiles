import { Bar } from './bar.js';
import { Drawer } from './drawer/drawer.js';

App.addIcons(`${App.configDir}/assets`)

App.config({
    windows: [
				Bar(0),
				Drawer()
		],
		style: './style.css'
})

