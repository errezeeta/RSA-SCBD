const bcu = require ("bigint-crypto-utils")

class RsaPrivateKey {

  constructor (d, n) {
    this.d = d
    this.n = n
  }

  decrypt (c){
    return bcu.modPow(c, this.d, this.n)
  }

  sign (m){
    return bcu.modPow(m, this.d, this.n)
  }
}

 class RsaPublicKey {
  constructor (e, n) {
    this.e = e
    this.n = n
  }

  encrypt (m){
    return bcu.modPow(m, this.e, this.n)
  }

  verify (s){
    return bcu.modPow(s, this.e, this.n)
  }
}

class rsaKeyPair {


  constructor (publicKey, privateKey) {
    this.publicKey = publicKey
    this.privateKey = privateKey
  }
}
const generateKeys = async function (bitLength){
  const e = 65537n
  let p = 0n, q = 0n , n = 0n , phi = 0n
  do {
      p =await bcu.prime(bitLength / 2 + 1)
      q =await bcu.prime(bitLength / 2)
      n = p * q
      phi = (p - 1n) * (q - 1n)
  } while (bcu.bitLength(n) !== bitLength || (phi % e === 0n) || q === p)

  const publicKey = new RsaPublicKey(e, n)

  const d = bcu.modInv(e, phi)

  const privKey = new RsaPrivateKey(d, n)

  var keys= {
      privateKey : privKey,
      publicKey : publicKey
  };
  
  return keys;
}

module.exports ={
  rsaKeyPair,
  RsaPublicKey, 
  RsaPrivateKey,
  generateKeys
};