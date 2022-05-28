const bcu = require ("bigint-crypto-utils")

class PaillierPublicKey {

  constructor (n, n2, g) {
    this.n = n
    this.n2 = n2
    this.g = g
  }

  getN (){
    return this.n
  }

  getN2 () {
    return this.n2
  }

  getG () {
    return this.g
  }

  encrypt (m) {
    const r = bcu.randBetween(this.n2)
    return (bcu.modPow(this.g, m, this.n2) * bcu.modPow(r, this.n, this.n2)) % this.n2
  }

  add (cs) {
    let ret = 1n
    for (const c of cs) {
      ret *= c
    }
    return ret % this.n2
  }

  multiply (c, m) {
    return bcu.modPow(c, m, this.n2)
  }
}

class PaillierPrivateKey {

  constructor (lambda, mu, pubKey) {
    this.lambda = lambda
    this.mu = mu
    this.pubKey = pubKey
  }

  getLambda () {
    return this.lambda
  }

  getMu () {
    return this.mu
  }

  getPubKey () {
    return this.pubKey
  }

  decrypt (c) {
    return (L(bcu.modPow(c, this.lambda, this.pubKey.getN2()), this.pubKey.getN()) * this.mu) % this.pubKey.getN()
  }
}

// ===========================================
// ================ FUNCTIONS ================

const getPrime = async function (nbits) {
  let n = 10n
  while (!await bcu.isProbablyPrime(n)) {
    n = await bcu.prime(nbits)
  }

  return n
}

function L (x, n) {
  let mu = 1n
  mu = (x - 1n) / n
  return mu
}
class PaillierKeyPair{
    constructor (pubKey, privKey) {
        this.pubKey = pubKey
        this.privKey = privKey
      }
}
const generatePaillierKeys = async function (nbits) {
  let p = 0n, q = 0n, n = 0n, n2 = 0n, lambda = 0n, g = 0n, mu = 0n
  do {
      // Get Primes
      q = await getPrime(Math.floor(nbits / 2) + 1)
      p = await getPrime(Math.floor(nbits) / 2)
      gcd = bcu.gcd((p * q), ((p - 1n) * (q - 1n)))
      // Set modular space
      n = q * p
      n2 = n ** 2n
      // Set lambda
      lambda = bcu.lcm(p - 1n, q - 1n)

      g = bcu.randBetween(n2, 1n)
      mu = bcu.modInv(L(bcu.modPow(g, lambda, n2), n), n)

  } while((gcd !== 1n) ||  q === p)

  // public key
  const pubKey = new PaillierPublicKey(n, n2, g)
  const privKey = new PaillierPrivateKey(lambda, mu, pubKey)

  var keys = {
      privkey : privKey,
      pubkey : pubKey
  };

  return keys;
}

module.exports ={
    PaillierPublicKey,
    PaillierPrivateKey,
    PaillierKeyPair, 
    generatePaillierKeys
  };