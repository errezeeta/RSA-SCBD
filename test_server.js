const bcu = require('bigint-crypto-utils')
const myrsa = require('./rsa.js')
const client = require ('./test_client.js')
const bic = require('bigint-conversion')
const bitLength = 1024
const main = async function(){

    const keypair = await myrsa.generateKeys(bitLength)
    const m = 'Hola'
    const msgBI = bic.textToBigint(m)
    console.log(msgBI)
    const r = bcu.randBetween(keypair.publicKey.n - 1n)
    const blindMsg = (keypair.publicKey.encrypt(r)*msgBI)%(keypair.publicKey.n)
    const bs = keypair.privateKey.sign (blindMsg)
    const s= bs * bcu.modInv(r, keypair.publicKey.n)
    const v = keypair.publicKey.verify(s)
    console.log(v)
    const msb = bic.bigintToText(v)
    console.log(msb)
    console.log(msb) 

    // const Received_Message = ''
    // while(Received_Message==''){

    // }
    // console.log(Received_Message)
    function getPublicKey(){
        return keypair.publicKey
    }

    // if(m!==v){
    //     console.log("ERROR")
    // } else{
    //     console.log("WORKING!!")
    // }
}

main()