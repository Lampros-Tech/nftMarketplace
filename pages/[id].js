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
import EtherIcon from '../public/Images/ether-icon'

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
                    if(name.match(lowQuery)) {
                        data.push(e)
                    }
                }
            });
            return data
        }

        const filtered = filterData(items, query)
        
        setNfts(filtered)
        setLoadingState("loaded")
    }
    

    useEffect(()=>{
        loadNfts(query);
    },[query])

    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
        <div className="contents">
            <div className="px-4 main-container" style={{ marginTop: '50px' }}>
                <div className="pt-4 sample">
                <div className='grid grid-cols-4 sample-cards'>
                    {
                    nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl mr-3 mb-3 overflow-hidden dash-container">
                        <div className="imageholder"><img src={nft.image} className='rounded' /></div>
                        <div className="pt-1 pl-2 pr-2">
                            <div className='flex pt-2 pl-2 pr-2'>
                            <span style={{ height: '20px', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden', color:'#484848' }} className="flex-grow font-semibold">{nft.name}</span>
                            <div className='grid text-right'>
                                <span className='font-semibold' style={{ color:'#484848' }}>
                                price
                                </span>
                                <div style={{ width: '80px', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden', fontSize:'14px', fontWeight:'500', width:'80px', textOverflow:'ellipsis', color:'#484848' }} className='inline'><EtherIcon  style={{width:'20px',height:'0',paddingTop: '5px'}} />{nft.price} &nbsp; FTM</div>
                            </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <button className="w-full text-white font-bold py-2 px-12 rounded bs-btn" onClick={() => buyNft(nft)}>Buy</button>
                        </div>
                        </div> 
                    ))
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default searches;