const bcu = require('bigint-crypto-utils')
const myrsa = require('./rsa.js')
const bitLength = 1024
const main = async function(){

    const keypair = await myrsa.generateKeys(bitLength)
    const m = bcu.randBetween(keypair.publicKey.n - 1n)
    const c = keypair.publicKey.encrypt(m)
    const d = keypair.privateKey.decrypt(c)
    if(m!==d){
        console.log("ERROR")
    } else{
        console.log("WORKING")
        console.log(m)
        console.log(m)
        console.log(d)
        console.log(c)
    }
}
main()