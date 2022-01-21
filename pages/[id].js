import {
    nftaddress, nftmarketaddress
} from '../config'
import { ethers } from 'ethers'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useQuery from './hooks/useQuery'
import router from 'next/router'

let rpcEndpoint = null

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}


function searches(){

    const query = useQuery()

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    async function loadNfts(query){
        const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
        const data = await marketContract.fetchMarketItems()
        
        const items = await Promise.all(data.map(async i => {
            await window.ethereum.enable();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            var item = {}

            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            item = {
                price,
                itemId: i.itemId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name + "#" + i.itemId.toNumber(),
                description: meta.data.description,
            }
            return item
        }))

        function filterData(items,query){
            const data = []
            items.forEach(e => {
                const name = e.name.toLowerCase()
                if(query === null){
                    router.push("/")
                } else {
                    const lowQuery = query.toLowerCase()
                    if(name.includes(lowQuery)) {
                        data.push(e)
                    }
                }
                // console.log(query)
            });
            return data
        }

        const filtered = filterData(items, query)
        
        setNfts(filtered)
        setLoadingState("loaded")
    }
    

    useEffect(()=>{
        console.log(query)
        loadNfts(query);
    },[query])

    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
        <div className="contents">
        <div className="px-4 main-container" style={{ marginTop: '50px' }}>
            {/* <div> { window.searchText.value } </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 sample">
            {
                nfts.map((nft, i) => (
                    <div key={i} className="border shadow rounded-xl overflow-hidden dash-container">
                        <div className="imageholder"><img src={nft.image} className='rounded' /></div>
                        <div className="p-4">
                        <p style={{ height: '45px', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }} className="text-2xl font-semibold">{nft.name}</p>
                        <div style={{ height: '70px', overflow: 'hidden' }}>
                            <p className="text-gray-400">{nft.description}</p>
                        </div>
                        </div>
                        <div className="p-4 bg-black">
                        <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                        <button className="w-full text-white font-bold py-2 px-12 rounded bs-btn" onClick={() => buyNft(nft)}>Buy</button>
                        </div>
                    </div> 
                ))
            }
            </div>
        </div>
        </div>
    )
}

export default searches;