const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./urls.json')

http.createServer((req, res) => {
	const { name, url, action } = URL.parse(req.url, true).query
	console.log(name, url, action);
	urls = data.urls
	var repetido = false

	if (action) {
		switch (action.toUpperCase()) {
			case "C":
				data.urls.forEach(function (element) {
					if (element.name == name) {
						repetido = true;
					}
				});
				if (!repetido) {
					urls.push({ "name": name, "url": url });
				}
				break;
			case "U":
				data.urls.forEach(function (element) {
					if (element.name == name) {
						element.url = url;
					}
				});
				console.log(data.urls);
				break;
			case "D":
				data.urls = urls.filter(item => item.name !== name);
				console.log(data.urls);
				break;
			default:
				break;
		}
	}

	return fs.writeFile(
		path.join(__dirname, "urls.json"),
		JSON.stringify(data, null, 2),
		err => {
			if (err) throw err

			res.end(JSON.stringify({ status: "ok", name: name, url: url, action: action, data: data }))
		}

	)
	return res.end(JSON.stringify(data));

}).listen(3000, () => console.log('API is running'))