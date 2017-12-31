/*
	Coinflip.js : Defines the coinflips game.
	This time, this is going to be handled correctly. No more BS hack solutions.
*/

'use strict'

// Defining helper functions here

// Returns the index in coinflips array that the coinflip specified by id is found
function findFlipByID(id) {
	var integerID = parseInt(id);

	if(coinflipGame.idToIndexMap.has(integerID)) {
		return coinflipGame.coinflips[coinflipGame.idToIndexMap.get(integerID)];
	} else {
		console.log('[!] Invalid id: ' + integerID);
		return -1;
	}
}

// Finds the next ID to use
// e.g. If the last coinflip that was made was #7999, return 8000
function findNextFlipID() {
	if(coinflipGame.lastID > 0) {
		return ++coinflipGame.lastID;
	} else {
		// 1. Query database to get the highest ID, set var x to that number
		// 2. Increment x
		// 3. Set coinflipGame.lastID to x
		// 4. return coinflipGame.lastID
		// TODO: Implement this. For now zero is ok
		coinflipGame.lastID = 1
		return 1;
	}
}

var coinflipGame = {

	// Stores all current coinflip data
	coinflips: [],

	// Keeps track of how to map coinflip id's to the coinflips array
	// May be inefficient for when there's only one or two coinflips at once,
	// but as we scale upwards this may boost performance
	idToIndexMap: new Map(),

	// Keeps track of what the next flip id should be.
	// Dont read from this, use findNextFlipID() always 
	// because it handles incrementing and the case 
	// that this isnt set (left at -1)
	lastID: -1,

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
			p1: {
				img: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/48/48df68e361072c39abe04f74af20459d0b59c104_full.jpg',
				items: [
					{
						img: 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/2425581552/86fx57f',
						name: 'AK-47 | Red Laminate (Field-Tested) - 8.27'
					},
					{
						img: 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/992512702/86fx57f',
						name: 'M4A1-S | Hot Rod (Minimal Wear) - 70.06'
					},
					{
						img: 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/1011935077/86fx57f',
						name: 'AWP | Hyper Beast (Field-Tested) - 25.04'
					}
				],
				value: 50.0
			},
			p2: {
				img: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/48/48df68e361072c39abe04f74af20459d0b59c104_full.jpg',
				items: [
					{
						img: 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/2425581552/86fx57f',
						name: 'AK-47 | Red Laminate (Field-Tested) - 8.27'
					},
					{
						img: 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/992512702/86fx57f',
						name: 'M4A1-S | Hot Rod (Minimal Wear) - 70.06'
					},
					{
						img: 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/1011935077/86fx57f',
						name: 'AWP | Hyper Beast (Field-Tested) - 25.04'
					}
				],
				value: 50.0
			}
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