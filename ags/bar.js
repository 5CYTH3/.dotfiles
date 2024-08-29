// https://docs.gtk.org/gtk3/css-overview.html

import { drawer_visibility } from "./drawer/drawer.js";

/* TIME WIDGETS
 * */

const time = Variable('', {
    poll: [1000, function() {
				let date = new Date();
				let secs = date.getSeconds().toString();
				let mins = date.getMinutes().toString();
				let hours = date.getHours().toString();
				return hours + ":" + mins + ":" + secs;
    }],
})

/* BAR 
 * */
export const Bar = (/** @type {number} */ monitor) => Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
		class_name: 'bar',
		margins: [10, 9],
    child: Widget.CenterBox({
        start_widget: Widget.Label({
						class_name: 'time',
            hpack: 'start',
            label: time.bind(),
        }),
				center_widget: Widget.Label({
						margin: 13,
						label: 'NETRUNNER PORTAL -- 1.1.0'
				}),
        end_widget: Rhs(),
    }),
})

const battery = await Service.import('battery')

const Rhs = () => Widget.Box({
		class_name: 'rhs',
		vexpand: false,
		hpack: 'end',
		vpack: 'center',
		spacing: 8,
		children: [
				Widget.Fixed({
						child: Widget.Button({
								vexpand: false,
								class_name: 'neon_button',
								on_clicked: () => drawer_visibility.value = !drawer_visibility.value,
								child: Widget.Label({ 
										label: 'Menu' 
								})
						}),
				}),
				
				Widget.Label({ 
						class_name: 'battery',
						label: battery.bind('percent').as(p => `${p}%`) 
				})
		]
})
