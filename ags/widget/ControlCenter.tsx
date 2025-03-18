import { bind } from "astal";
import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4"
import Tray from "gi://AstalTray"
import { cc_visible } from "./utils"

const tray = Tray.get_default();

export default function ControlCenter(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
		return <window 
				visible = { bind(cc_visible) }
        cssClasses={["Control"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | RIGHT}
        application={App}
		>
				<centerbox cssClasses={[""]} hexpand vexpand>
						<label>Control Center</label>
						<box>
								
						</box>
						<box>
						{
								bind(tray, "items").as((items) => items.map(i => <ControlNode item={i} />))
						}
						</box>
				</centerbox>
		</window>
}

function ControlNode({ item }: { item: Tray.TrayItem }) {
		return <box>
				<image iconName={item.get_icon_name()} />
				<box>
						<label>{item.get_title()}</label>
						<label>{item.get_status()}</label>

				</box>
		</box>
}
