import "./assets/css/index.css";

import { App } from "dhx-optimus";

import { FormWeather } from "./views/FormWeather";

export class MyApp extends App {
	init() {
		this.show(null, FormWeather);
	}
}
