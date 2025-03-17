import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk4"
import { bind, GLib, Variable } from "astal"
import Battery from "gi://AstalBattery"

const now = () =>
  GLib.DateTime.new_now_local().format("%H:%M:%S");

const time = 
		Variable(GLib.DateTime.new_now_local()).poll(1000, () => GLib.DateTime.new_now_local());

function Center() {
		return <label>CABLE CONNECTION LOST</label>
}

function Rhs() {
		let bat = Battery.get_default();
		return <box hexpand halign={Gtk.Align.END} cssClasses={["Rhs"]} >
				<button cssClasses={["Button"]}>
						<label>Menu</label>
				</button>
				<label cssClasses={["Battery"]}>{bind(bat, "percentage").as(p => `${Math.floor(p * 100)}%`)}</label>
		</box>
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssClasses={["bar-container"]} hexpand vexpand>
            <label hexpand halign={Gtk.Align.START} cssClasses={["Time"]}>{time(now)}</label>
						<Center></Center>
						<Rhs></Rhs>
        </centerbox>
    </window>
}
