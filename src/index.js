import "babel-polyfill"
import "preact/devtools"
import {h, render} from "preact"

import App from "./components/App"
import sw from "./core/sw"

render(<App />, document.getElementById("root"))
sw()
