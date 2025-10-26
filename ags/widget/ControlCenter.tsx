import { createBinding, For, With } from "ags";
import Tray from "gi://AstalTray"
import AstalTray from "gi://AstalTray?version=0.1";

import { AudioCenter } from "./control_center/Audio"
import { NetworkCenter } from "./control_center/Network";
import { Gtk } from "ags/gtk4";

const tray = Tray.get_default();

export default function ControlCenter() {
		const b_tray = createBinding(tray, "items");
		return <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["Control"]}>			
				<label label="Control Center"/>
				<AudioCenter/>
				<NetworkCenter/>
				<box>
						<For each={b_tray}>
								{(item) => <ControlNode item={item} />}
						</For>
				</box>
		</box>
}

const processStatus = (s: AstalTray.Status) => {
		if (s == AstalTray.Status.PASSIVE) {
				return 'PASSIVE'
		} else if (s == AstalTray.Status.ACTIVE) {
				return 'ACTIVE'
		} else if (s == AstalTray.Status.NEEDS_ATTENTION) {
				return 'ATTENTION'
		} else {
				return 'PROCESS ERR' 
		}
} 

function ControlNode({ item }: { item: Tray.TrayItem }) {
		const b_title = createBinding(item, "title");
		const b_status = createBinding(item, "status");
		const b_icon_name = createBinding(item, "icon_name");
		
		const b_activate = createBinding(item, "activate");

		return <button onClicked={self => { b_activate(s => s(0, 0)) }}>
				<box orientation={Gtk.Orientation.VERTICAL}>
						<With value={b_title}>
								{(v) => <label label={v}/>}
						</With>
						<With value={b_status}>
								{(v) => <label label={processStatus(v)}/> }
						</With>
						<With value={b_icon_name}>
								{(i) => <image icon_name={i} />}
						</With>
				</box>
		</button>
}
