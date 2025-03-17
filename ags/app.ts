import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widget/Bar"
import ControlCenter from "./widget/ControlCenter"

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar);
				App.get_monitors().map(ControlCenter)
    },
})
