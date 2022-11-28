const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require ("@solana/web3.js")

const wallet = new Keypair
const _publicKey = new PublicKey(wallet._keypair.publicKey)
const _secretKey = wallet._keypair.secretKey

console.log("Created public key in DevNet: ", _publicKey)
console.log("Created secret key in DevNet: ", _secretKey)

const getWalletBalance = async() => {
    try {
        const _connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const _walletBalance = await _connection.getBalance(_publicKey)
        console.log("Wallet balance (Lamports): ", _walletBalance)
    } catch (err) {
        console.error(err)
    }
 }

 const airDropSol = async() => {
    try {
        const _connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSig = await _connection.requestAirdrop(_publicKey, 2 * LAMPORTS_PER_SOL)
        const latestBlockHash = await _connection.getLatestBlockhash();
        await _connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSig,
        })

        console.log("Airdropping 2 Sol...")
    } catch(err) {
        console.error(err)
    }
 }

 const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
 }

 main()