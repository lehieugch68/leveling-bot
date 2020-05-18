function sqliteRunAsync (db, query) {
	return new Promise(async (resolve, reject) => {
		db.run(query, (err) => {
			if (err) return reject(err);
			return resolve();
		})
	})
}

module.exports = sqliteRunAsync;
