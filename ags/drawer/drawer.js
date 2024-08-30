
const network = await Service.import('network');

const IconLabel = (icon, label) => Widget.Box({
		vertical: false,
		children: [
				Widget.Icon({
						margin_right: 5,
						icon: icon
				}),
				Widget.Label({
						class_name: 'network_item_label',
						label: label
				})
		]
})

export const drawer_visibility = Variable(false);

export const Drawer = (monitor = 0) => Widget.Window({
		visible: drawer_visibility.bind(),
		monitor,
    name: `drawer${monitor}`,
    anchor: ['top', 'right'],
    exclusivity: 'exclusive',
		class_name: 'drawer',
		margins: [10, 10, 0, 10],
    child: Widget.Box({
				margin: 15,
				hpack: 'center',
				vpack: 'center',
				vertical: true,
				children: [
						// Title
						Widget.Label({
								hpack: 'center',
								vpack: 'start',
								label: 'break(Core)',
						}),
						// Audio section
						Widget.Label({ 
								label: 'Audio :',
								margin_top: 10,
								hpack: 'start',
								vpack: 'start'
						}),
						VolSlider(),
						// Network management
						Widget.Label({ 
								label: 'Network :',
								margin_top: 10,
								hpack: 'start',
								vpack: 'start'
						}),
						NetworkInfos(),
						WifiToggler(),
						// Bluetooth
						Widget.Label({ 
								label: 'Bluetooth :',
								margin_top: 10,
								hpack: 'start',
								vpack: 'start'
						}),
						ConnectedList(),
						// System tray
						SysTray()
				]
		})
});

const audio = await Service.import('audio')

const VolSlider = (type = 'speaker') => Widget.Slider({
		class_name: 'vol_slider',
		hexpand: true,
		drawValue: false,
		onChange: ({ value }) => audio[type].volume = value,
		value: audio[type].bind('volume'),
})

const WifiToggler = () => Widget.Button({
		margin_top: 5,
		class_name: 'neon_button',
		child: Widget.Label({ 
				label: network.wifi.bind('enabled').as(p => p ? 'Disconnect' : 'Connect') 
		}),
		on_clicked: () => network.toggleWifi()
})

const NetworkInfos = () => Widget.Box({
		visible: network.wifi.bind('enabled').as(p => p),
		vertical: true,
		hpack: 'start',
		vpack: 'start',
		children: [
				IconLabel(network.wifi.bind('icon_name'), network.wifi.bind('ssid').as(ssid => ssid || 'Unknown')),
				Widget.Label(network.wifi.internet),
		]
})

const bluetooth = await Service.import('bluetooth')

const ConnectedList = () => Widget.Box({
    setup: self => self.hook(bluetooth, self => {
				self.vertical = true;
        self.children = bluetooth.connected_devices
            .map(({ icon_name, name }) => IconLabel(icon_name + '-symbolic', name))
        self.visible = bluetooth.connected_devices.length > 0;
    }, 'notify::connected-devices'),
})

const systemtray = await Service.import('systemtray')

const SysTrayItem = (item) => Widget.Button({
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

const SysTray = () => Widget.Box({
		spacing: 8,
		margin_top: 15,
    children: systemtray.bind('items').as(i => i.map(SysTrayItem))
})
