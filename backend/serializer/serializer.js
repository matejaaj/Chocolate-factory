// serializer/serializer.js
const fs = require("fs");

class Serializer {
	constructor(delimiter = "|") {
		this.delimiter = delimiter;
	}

	toCSV(fileName, objects) {
		const csv = objects
			.map((obj) => obj.toCSV().join(this.delimiter))
			.join("\n");
		fs.writeFileSync(fileName, csv, "utf-8");
	}

	fromCSV(fileName, type) {
		const lines = fs.readFileSync(fileName, "utf-8").split("\n");
		return lines
			.filter((line) => line.trim() !== "") // Filtriranje praznih linija
			.map((line) => {
				const values = line.split(this.delimiter);
				const obj = new type();
				obj.fromCSV(values);
				return obj;
			});
	}
}

module.exports = Serializer;
