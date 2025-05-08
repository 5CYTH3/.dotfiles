import Wp from "gi://AstalWp"
import { bind } from "astal";

const wp = Wp.get_default() as Wp.Wp;
const audio = wp.audio;

export function AudioCenter() {
		return <box vertical cssClasses={["audio"]}>
				<label>devices: { bind(audio, "devices").as(devices => devices.map(d => d.get_active_profile())) }</label>
				<> { bind(audio, "default_speaker").as(s => <AudioDevice speakers={s}/>) } </>
		</box>
}

function AudioDevice({ speakers }: { speakers: Wp.Endpoint }): JSX.Element {
		return <box vertical cssClasses={["dev"]}>
				<box>
						<image cssClasses={["icon"]} iconName={speakers.icon}/>
						<label>{ bind(speakers, "name") }</label>
				</box>
				<label>{ bind(speakers, "volume").as(v => `Volume: ${Math.floor(v * 100)}%`) }</label>
				<slider hexpand min={0.0} onChangeValue={ (self) => speakers.volume = self.value } value={ bind(speakers, "volume") } />
		</box>
}
