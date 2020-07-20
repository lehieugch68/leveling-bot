module.exports = {
	Run(db, query) {
		return new Promise(async (resolve, reject) => {
			db.run(query, (err) => {
				if (err) return reject(err);
				return resolve();
			})
		})
	},
	Get(db, query) {
		return new Promise(async (resolve, reject) => {
			db.get(query, (err, row) => {
				if (err) return reject(err);
				return resolve(row);
			})
		})
	},
	All(db, query) {
		return new Promise(async (resolve, reject) => {
			db.all(query, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
}
