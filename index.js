import chalk from "chalk";
import fs from "fs";
import Web3 from "web3";

async function getMessage(address) {
    const url = `https://api.x.ink/v1/get-sign-message2?walletAddress=${address}`

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en,en-US;q=0.9,id;q=0.8',
        'dnt': '1',
        'origin': 'https://x.ink',
        'priority': 'u=1, i',
        'referer': 'https://x.ink/',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to get message: ${err.message}`))
        }
    }
}

// get signature
async function getSignature(provider, pkey) {
    const wallet = provider.eth.accounts.privateKeyToAccount(pkey)

    const message = await getMessage(wallet.address)

    const sign = provider.eth.accounts.sign(message.message, wallet.privateKey)
    // console.log(sign)

    return [wallet.address, message, sign]
}

async function verifSign(address, message, signature) {
    const url = "https://api.x.ink/v1/verify-signature2"

    const payload = JSON.stringify({
        "walletAddress": address,
        "signMessage": message.message,
        "signature": signature.signature,
        "referrer": null
    })

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en,en-US;q=0.9,id;q=0.8',
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://x.ink',
        'priority': 'u=1, i',
        'referer': 'https://x.ink/',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to verify signature: ${err.message}`))
        }
    }
}

async function getMe(token) {
    const url = "https://api.x.ink/v1/me"

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${token}`,
        'origin': 'https://x.ink',
        'priority': 'u=1, i',
        'referer': 'https://x.ink/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to get me: ${err.message}`))
        }
    }
}

async function checkIn(token) {
    const url = "https://api.x.ink/v1/check-in"

    const payload = JSON.stringify({})

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json',
        'origin': 'https://x.ink',
        'priority': 'u=1, i',
        'referer': 'https://x.ink/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to check-in: ${err.message}`))
        }
    }
}

async function autoDraw(token) {
    const url = "https://api.x.ink/v1/draw"

    const payload = JSON.stringify({})
    
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en,en-US;q=0.9,id;q=0.8',
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json',
        'dnt': '1',
        'origin': 'https://x.ink',
        'priority': 'u=1, i',
        'referer': 'https://x.ink/',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (err) {
            console.log(chalk.red(`⛔ Error to draw: ${err.message}`))
        }
    }
}

(async () => {
    console.log(`✘ XOS Daily Check-in & Auto Draw`)

    const web3 = new Web3("http://localhost:8545")

    try {
        // read pkey.txt
        const data = fs.readFileSync('pkey.txt', 'utf-8');
        const pkeys = data.split('\n')

        for (const pkey of pkeys) {
            const [address, message, sign] = await getSignature(web3, pkey.trim())
            // console.log(sign.signature)
            // console.log(message)

            const verif = await verifSign(address, message, sign)
            // console.log(verif)

            const accessToken = verif.token

            const me = await getMe(accessToken)
            const wallet = me.data.eth
            const jumlahcekin = me.data.check_in_count
            const lastcekin = new Date(me.data.lastCheckIn)
            console.log(`\n🔑 EVM address: ${chalk.green(wallet)}\n🏆 Total poin: ${chalk.yellow(me.data.points)}\n📊 Jumlah check-in: ${chalk.yellow(`${jumlahcekin} days`)}\n🕘 Last check-in: ${chalk.green(lastcekin.toISOString())}`)

            const cek = await checkIn(accessToken)
            if (cek.success) {
                console.log(chalk.green(`✅ Cek-in sukses`))
            } else {
                console.log(chalk.red(`❌ Sudah cek-in hari ini`))
            }

            if (me.data.currentDraws>0) {
                console.log(`   Draw tersedia, sedang melakukan draw...`)
                let totalpoin = 0
                for (let i=0; i<me.data.currentDraws; i++) {
                    const draw = await autoDraw(accessToken)
                    if (draw.success==true) {
                        totalpoin = draw.pointsEarned
                    }
                }
                console.log(`🏅 Poin diperoleh: ${chalk.yellow(totalpoin)}`)
            }

            await new Promise(resolve => setTimeout(resolve, 5000))
        }
    } catch (e) {
        // jika pkey.txt not exist
        if (e.code == 'ENOENT') {
            console.log('📝 Fill the pkey.txt first!');
            fs.writeFileSync('pkey.txt', "0xxxxxxxxxx\n0xxxxxxxxxx\netc...")
            process.exit()
        } else {
            throw e
        }
    }
})()