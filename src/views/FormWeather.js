import { View } from "dhx-optimus";
import { config } from "./config";
import { toСelsius } from "./ToCelsius";

export class FormWeather extends View {
	init() {

		let form = new dhx.Form("app", config);

		form.events.on("Click", function (send) {
			if (form.validate() == true) {
				getResponse();

				form.getItem('longitude').clear();
				form.getItem('latitude').clear();
			}
		});
		let container = document.querySelector('.main__container');

		createWeatherBlock('city');
		createWeatherBlock('deg');
		createWeatherBlock('error');

		let city = document.querySelector('.city');
		let deg = document.querySelector('.deg');
		let errorBlock = document.querySelector('.error');

		function createWeatherBlock(className) {
			let div = document.createElement('div');
			container.children[0].append(div);
			div.classList.add(className);
		}

		async function getResponse() {
			errorBlock.innerHTML = '';

			let inputLongitude = form.getItem("longitude").getValue();
			let inputLatitude = form.getItem("latitude").getValue();
			try {

				let responseCity = await fetch(`https://api.weather.gov/points/${inputLongitude},${inputLatitude}`);

				let contentCity = await responseCity.json();
				let cityName = contentCity.properties.relativeLocation.properties.city;
				city.innerHTML = cityName;
		
				let responseDegree = await fetch(contentCity.properties.forecast);

				let contentDeg = await responseDegree.json();
				let degNum = contentDeg.properties.periods[0].temperature;
				deg.innerHTML = Math.floor(toСelsius(degNum)) + `&deg;`;
			} catch (error) {
				errorBlock.innerHTML = error;
			}
		}

		// второй вариант

		// let status = function (response) {
		// 	if (response.status !== 200) {
		// 		return Promise.reject(new Error(response.statusText));
		// 	}
		// 	return Promise.resolve(response);
		// }

		// let json = function (response) {
		// 	return response.json();
		// }

		// function getResponse() {
		// 	let inputLongitude = form.getItem("longitude").getValue();
		// 	let inputLatitude = form.getItem("latitude").getValue();

		// 	fetch(`https://api.weather.gov/points/${inputLongitude},${inputLatitude}`)
		// 		.then(status)
		// 		.then(json)
		// 		.then((data) => {
		// 			let cityName = data.properties.relativeLocation.properties.city;
		// 			city.innerHTML = cityName;
		// 			return data;
		// 		})
		// 		.then((content) => {
		// 			fetch(content.properties.forecast)
		// 				.then(status)
		// 				.then(json)
		// 				.then((data) => {
		// 					let degNum = data.properties.periods[0].temperature;
		// 					deg.innerHTML = Math.floor(toСelsius(degNum)) + `&deg;`;
		// 				})
		// 				.catch((error) => {
		// 					deg.innerHTML = error;
		// 				})
		// 		})
		// 		.catch((error) => {
		// 			city.innerHTML = error;
		// 		})
		// }
		// первоначальный вариант fetch

		return form;
	}
}
