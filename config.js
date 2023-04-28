const MINE_RATE =  1000;
const INITIAL_DIFFICULTY = 2; 
const GENESIS_DATA = {
    timestamp:1,
    prevHash : '0',
    hash     : '23d9a4f59f20b5b3aed9331d4119d45ba5eb1e42720cba534b8bbe633b1dc0ee',
    difficulty : INITIAL_DIFFICULTY,
    nonce : 0,
    data     : []
    }

    module.exports = {GENESIS_DATA, MINE_RATE}