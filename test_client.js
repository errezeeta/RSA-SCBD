const bcu = require('bigint-crypto-utils')
const myrsa = require('./rsa.js')
const server = require ('./test_server.js')
const bic = require('bigint-conversion')
const bitLength = 1024
const main = async function(){

    const keypair = await myrsa.generateKeys(bitLength)
    const m = bcu.randBetween(keypair.publicKey.n - 1n)
    const r = bcu.randBetween(keypair.publicKey.n - 1n)
    const blindMsg = (keypair.publicKey.encrypt(r)*m)%(keypair.publicKey.n)
    const bs = keypair.privateKey.sign (blindMsg)
    const s= bs * bcu.modInv(r, keypair.publicKey.n)
    const v = keypair.publicKey.verify(s)

    //const Received_Message = ''

    // const msg = 'Hola me llamo Willy y quiero encriptar este mensaje'
    // const msgBI = bic.textToBigint(msg)
    // send = server
    // server.Received_Message = '' + server.Received_Message + '' + send + ''
    // console.log(server.Received_Message)

    // if(m!==v){
    //     console.log("ERROR")
    // } else{
    //     // console.log("WORKING")
    //     // console.log(m)
    //     // console.log(c)
    //     // console.log(s)
    //     // console.log(d)
    //     // console.log(v)
    //     console.log("WORKING!!")
    // }
}
main()