import Wp from "gi://AstalWp"
import { Accessor, createBinding, For, With } from "ags";
import { Gtk } from "ags/gtk4";
import AstalWp from "gi://AstalWp?version=0.1";

const wp = Wp.get_default() as Wp.Wp;
const audio = wp.audio;

export function AudioCenter() {
		const b_default_speaker = createBinding(audio, "default_speaker");
		const b_devices = createBinding(audio, "devices");
		return <box margin_top={10} orientation={Gtk.Orientation.VERTICAL} cssClasses={["audio"]}>
				<With value={b_default_speaker}>
						{(s) => <AudioDevice speaker={s} />}
				</With>
				<For each={b_devices}>
						{(device: AstalWp.Device) => <label label={device.get_description()} />}
				</For>
		</box>
}

function AudioDevice({ speaker }: { speaker: Wp.Endpoint }): JSX.Element {
		const b_name = createBinding(speaker, "name");
		const b_volume = createBinding(speaker, "volume");
		return <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["dev"]}>
				<box>
						<image class="icon" iconName={speaker.get_icon()}/>
						<With value={b_name}>
								{(name) => <label label={name} />}
						</With>
				</box>
				<With value={b_volume}>
						{(volume) => <label label={`Volume: ${Math.floor(volume * 100)}%`}/>}
				</With>
				<With value={b_volume}>
						{(volume) => 
								<slider 
										class="vol_slider" 
										hexpand 
										min={0.0} 
										onChangeValue={ (self) => speaker.set_volume(self.value) }
										value={ volume } 
								/>
						}
				</With>
		</box>
}
