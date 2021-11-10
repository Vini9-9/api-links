const http = require('http')
const URL = require('url')
const data = require('./urls.json')

http.createServer((req, res) => {
	const { name, url, action } = URL.parse(req.url, true).query
	console.log(name, url, action);
	urls = data.urls

	if (action) {
		switch (action.toUpperCase()) {
			case "C":
				urls.push({ "name": name, "url": url });
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
				data.urls = urls.filter(item => item.url !== url);
				console.log(data.urls);
				break;
			default:
				break;
		}
	}

	return res.end(JSON.stringify(data));

}).listen(3000, () => console.log('API is running'))