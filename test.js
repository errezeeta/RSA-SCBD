const bcu = require('bigint-crypto-utils')
const myrsa = require('./rsa.js')
const bitLength = 1024
const main = async function(){

    const keypair = await myrsa.generateKeys(bitLength)
    const m = bcu.randBetween(keypair.publicKey.n - 1n)
    const r = bcu.randBetween(keypair.publicKey.n - 1n)
    const blindMsg = (keypair.publicKey.encrypt(r)*m)%(keypair.publicKey.n)
    const bs = keypair.privateKey.sign (blindMsg)
    const s= bs * bcu.modInv(r, keypair.publicKey.n)
    const v = keypair.publicKey.verify(s)
    if(m!==v){
        console.log("ERROR")
    } else{
        // console.log("WORKING")
        // console.log(m)
        // console.log(c)
        // console.log(s)
        // console.log(d)
        // console.log(v)
        console.log("WORKING!!")
    }
}
main()