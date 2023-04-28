const hextToBinary = require("hex-to-binary");
const {GENESIS_DATA, MINE_RATE} = require('./config');
const cryptoHash = require("./crypto-hash");

 class Block {
    constructor({timestamp, prevHash, hash, data, nonce,difficulty}){
        this.timestamp = timestamp;
        this.prevHash  = prevHash;
        this.hash      = hash;
        this.data      = data;
        this.nonce     = nonce;
        this.difficulty= difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        // const timestamp = Date.now();
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        var {difficulty} = prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp,

            });
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        }while(hextToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
           
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }
    static adjustDifficulty({originalBlock,timestamp}){
        var {difficulty} = originalBlock;
        if(difficulty<1) return 1;  
        var difference = timestamp-originalBlock.timestamp;
        if(difference>MINE_RATE)return difficulty;
        return difficulty+1; 

    }
}

// const block1 = new Block({
//     timestamp:"2/09/22",
//     prevHash:"0xc12", 
//     hash:"0xacb",
//     data:"Hello"
// });

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// var result = Block.mineBlock({prevBlock:block1, data: "block2"})
// console.log(result)

// console.log(block1)Block
  module.exports = Block;

