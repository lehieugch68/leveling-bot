function sqliteRunAsync (db, query) {
	return new Promise(async (resolve, reject) => {
		db.run(query, (err) => {
			if (err) reject(err);
			resolve();
		})
	})
}

module.exports = sqliteRunAsync;
