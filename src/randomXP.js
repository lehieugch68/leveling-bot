let randomXP = (xpmin, xpmax) => {
	return Math.floor(Math.random() * (xpmax - xpmin + 1)) + xpmin;
}

module.exports = randomXP;
