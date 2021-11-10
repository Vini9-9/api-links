const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./urls.json')

http.createServer((req, res) => {
	res.writeHead(200, { 'Access-Control-Allow-Origin': '*' })
	const { name, url, action } = URL.parse(req.url, true).query
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
				break;
			case "D":
				data.urls = urls.filter(item => item.name !== name);
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
			if (req.url == '/') {
				res.end(JSON.stringify(data))
			} else {
				res.end(JSON.stringify({ status: "ok", name: name, url: url, action: action, data: data }))
			}
		}

	)

}).listen(3000, () => console.log('API is running'))