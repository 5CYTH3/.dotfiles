import { bind } from "astal";
import Tray from "gi://AstalTray"
import AstalTray from "gi://AstalTray?version=0.1";

import { AudioCenter } from "./control_center/Audio"

const tray = Tray.get_default();

export default function ControlCenter() {
		return <box vertical cssClasses={["Control"]}>			
				<label>Control Center</label>
				<AudioCenter/>
				<box>
				{
						bind(tray, "items").as((items) => items.map(i => <ControlNode item={i} />))
				}
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
		return <button onClicked={self => { bind(item, "activate").as(s => s(0, 0)) }}>
				<box vertical>
						<label>{bind(item, "title")}</label>
						<label>{bind(item, "status").as(s => processStatus(s))}</label>
						<image iconName={bind(item, "iconName")} />
				</box>
		</button>
}
