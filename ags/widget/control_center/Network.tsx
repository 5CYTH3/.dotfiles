import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { createBinding, With } from "ags"
import { Gtk } from "ags/gtk4";
import { Object } from "gnim/gobject";

const nw = AstalNetwork.get_default() as AstalNetwork.Network
const wifi = nw.wifi
const wired = nw.wired

function Wifi({ enabled }: { enabled: boolean }): Object {
		// Device is the builtin device (like wifi or eth interface)
		const active_conn = createBinding(wifi, "active_connection");
		const active_ap = createBinding(wifi, "active_access_point");
		const internet = createBinding(wifi, "internet");
		const ssid = createBinding(wifi, "ssid");
		const icon_name = createBinding(wifi, "icon_name");

		if (enabled) {
				return <box orientation={Gtk.Orientation.VERTICAL}>
						<label halign={Gtk.Align.START} label="Wifi enabled" />
						<With value={active_ap}>
								{(ap) => 
										<box>
												<image icon_name={ap.get_icon_name()}/>
												<label halign={Gtk.Align.START} label={`Active AP: ${ap.get_ssid()}`} />
										</box>
								}
						</With>
				</box>
		} else {
				return <label label="Wifi disabled" />
		}

}

function Wired() {}

export function NetworkCenter() {
		const b_wifi_enabled = createBinding(wifi, "enabled");
		return <box margin_top={10}>
				<With value={b_wifi_enabled}>
						{(enabled) => <Wifi enabled />}
				</With>
		</box>
}
