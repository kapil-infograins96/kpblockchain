var Block = require("./blockModel");
const cryptoHash = require("./crypto-hash");

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]
    } 

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newBlock);

    }

    replaceChain(){
        if(chain<=this.chain.legth){
            console.error("The incoming chain is not longer")
            return
        }
        if(Blockchain.isValidChain(chain)){
            console.error("The incoming chain is not valid")
            return;
        }
        this.chain = chain;
    }
    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
         return false;
        }
        for(let i=1; i<chain.length;i++){
            const {timestamp,prevHash,hash,nonce,difficulty,data} =chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realLastHash = chain[i-1].hash;

            if(prevHash!==realLastHash) return false;
            const ValidatedHash = cryptoHash(timestamp,prevHash,nonce,difficulty,data)
            if(hash!==ValidatedHash) return false;
            if(Math.abs(lastDifficulty-difficulty)>1) return false;
        }
        return true;
    }
}

const blockchain = new Blockchain()
blockchain.addBlock({data:"Block1"})
const result = Blockchain.isValidChain(blockchain.chain);
console.log(blockchain.chain)
// console.log(blockchain); 
console.log(result);

module.exports = Blockchain;