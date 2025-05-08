import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { bind, GLib, Variable } from "astal"
import Battery from "gi://AstalBattery"
import ControlCenter from "./ControlCenter";
import Mpris from "gi://AstalMpris";

const mpris = Mpris.get_default();

const now = () =>
  GLib.DateTime.new_now_local().format("%H:%M:%S");

const time = 
		Variable(GLib.DateTime.new_now_local()).poll(1000, () => GLib.DateTime.new_now_local());

function Center() {
		return bind(mpris, "players").as((players) => 
				players.length > 0 
						? <MediaPlayer player={players[0]}/> 
						: <label>NO PLAYERS</label>
		);
}

function MediaPlayer({ player }: { player: Mpris.Player }) {
		if (!player) return <label>NO PLAYER</label>
		const title = bind(player, "title").as((t) => t || "Unknown Track");
		const artist = bind(player, "artist").as((a) => a || "Unknown Artist");
		const playIcon = bind(player, "playback_status").as((s) =>
				s === Mpris.PlaybackStatus.PLAYING
					? "media-playback-pause-symbolic"
					: "media-playback-start-symbolic",
		);

		return <box>
				<label label={ title } />
				<label label=" | " />
				<label label={ artist } />
				<image margin_start={10} icon_name={playIcon} />
		</box>
}

function Rhs() {
		let bat = Battery.get_default();
		return <box hexpand halign={Gtk.Align.END} cssClasses={["Rhs"]} >
				<menubutton cssClasses={["Button"]}>
						<label>Menu</label>
						<popover has_arrow={false}>
								<ControlCenter />
						</popover>
				</menubutton>
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
