import Battery from "gi://AstalBattery"
import ControlCenter from "./ControlCenter";
import Mpris from "gi://AstalMpris";
import { createPoll } from "ags/time";
import GLib from "gi://GLib?version=2.0";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { Accessor, createBinding, With } from "gnim";
import app from "ags/gtk4/app";


const now = () =>
  GLib.DateTime.new_now_local().format("%H:%M:%S") || "ERROR";

function MediaPlayer({ player }: { player: Mpris.Player | undefined }) {
		if (!player) return <box/>;

		const b_title = createBinding(player, "title")((t) => t || "Unknown Track");
		const b_artist = createBinding(player, "artist")((a) => a || "Unknown Artist");
		const b_play_icon = createBinding(player, "playback_status")((s) =>
				s === Mpris.PlaybackStatus.PLAYING
						? "media-playback-pause-symbolic"
						: "media-playback-start-symbolic",
		);

		return <box>
				<With value={(b_title)}>
						{(title) => <label label={title}/>}
				</With>
				<label label=" | "/>
				<With value={(b_artist)}>
						{(artist) => <label label={artist}/>}
				</With>
				<With value={b_play_icon}>
						{(icon) => <image margin_start={10} icon_name={icon} />}
				</With>
		</box>
}

function Rhs() {
		let bat = Battery.get_default();
		const b_battery = createBinding(bat, "percentage")(p => `${Math.floor(p * 100)}%`);
		return <box hexpand halign={Gtk.Align.END} cssClasses={["Rhs"]} >
				<menubutton cssClasses={["Button"]}>
						<label label="Menu" />
						<popover has_arrow={false}>
								<ControlCenter />
						</popover>
				</menubutton>
				<With value={b_battery}>
						{(value) => <label class="Battery" label={value} />}
				</With>
		</box>
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
		const time = createPoll("", 1000, "date");

		const mpris = Mpris.get_default();
		const b_players = createBinding(mpris, "players");
    return <window
        visible
				name="Bar"
        class="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={app}
		>
				<centerbox class="bar-container" vexpand hexpand>
						<box $type="start">
								<With value={time}>
										{(t) => <label class="Time" label={t} />}
								</With>
						</box>
						<box $type="center">
								<With value={b_players}>
										{ (players) => <MediaPlayer player={players[0]}/> }
								</With>
						</box>
						<Rhs $type="end" />
				</centerbox>

    </window>
}
