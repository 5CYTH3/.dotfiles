



// https://docs.gtk.org/gtk3/css-overview.html


const options = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
};

const time = Variable('', {
    poll: [1000, function() {
				let date = new Date();
				let secs = date.getSeconds().toString();
				let mins = date.getMinutes().toString();
				let hours = date.getHours().toString();
				return hours + ":" + mins + ":" + secs;
    }],
})

const Bar = (/** @type {number} */ monitor) => Widget.Window({
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

const audio = await Service.import('audio')

const Rhs = () => Widget.Box({
		class_name: 'rhs',
		hpack: 'end',
		children: [
				VolSlider('speaker')
		]
})

const VolSlider = (type = 'speaker') => Widget.Slider({
		class_name: 'vol_slider',
		hexpand: true,
		drawValue: false,
		onChange: ({ value }) => audio[type].volume = value,
		value: audio[type].bind('volume'),
})

App.config({
    windows: [Bar(0)],
		style: 'style.css'
})
