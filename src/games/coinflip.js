/*
	Coinflip.js : Defines the coinflips game.
	This time, this is going to be handled correctly. No more BS hack solutions.
*/

'use strict'

// Defining helper functions here

// Returns the index in coinflips array that the coinflip specified by id is found
function findFlipByID(id) {
	if(coinflipGame.idToIndexMap.has(id)) {
		return coinflipGame.coinflips[coinflipGame.idToIndexMap.get(id)];
	} else {
		console.log('[!] Invalid id: ' + id);
		return -1;
	}
}

// Finds the next ID to use
// e.g. If the last coinflip that was made was #7999, return 8000
function findNextFlipID() {
	if(coinflipGame.coinflips.length > 0) {
		// If we have coinflips already, we can assume the last one is
		// the highest id because when we add them we add them to the end with .push()
		return coinflipGame.coinflips[coinflipGame.coinflips.length - 1].id + 1;
	} else {
		// Query database to get the highest ID and return that number + 1
		// TODO: Implement this. For now zero is ok
		return 0;
	}
}

var coinflipGame = {

	// Stores all current coinflip data
	coinflips: [],

	// Keeps track of how to map coinflip id's to the coinflips array
	// May be inefficient for when there's only one or two coinflips at once,
	// but as we scale upwards this may boost performance
	idToIndexMap: new Map(),

	// Get all flips
	getFlips () {
		return this.coinflips;
	},

	// Get the flip specified by id
	getFlip (id) {
		return findFlipByID(id);
	},

	// Add another flip to the array
	createFlip (name, value) {
		var id = findNextFlipID();

		this.coinflips.push({
			id: id,
			name: name,
			value: value
		});

		this.idToIndexMap.set(id, this.coinflips.length - 1);
		
		return id;
	},

	// Change data in flip specified by id
	updateFlip (id) {
		console.log('Called updateFlip(' + id + ')');
	},

	// Delete the flip specified by id
	deleteFlip (id) {
		console.log('Called deleteFlip(' + id + ')');

		// TODO: Delete from coinflips array and store to DB
	}
}

module.exports = coinflipGame;