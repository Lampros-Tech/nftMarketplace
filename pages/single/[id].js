import {
    nftaddress, nftmarketaddress
} from '../../config'
import { ethers } from 'ethers'
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useQuery from '../hooks/useQuery'
import EtherIcon from '../../public/Images/ether-icon'
import Web3Modal from "web3modal"

let rpcEndpoint = null

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

function Single(){

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
                name: meta.data.name,
                description: meta.data.description,
            }
            return item
        }))

        function filterData(items,query){
            const data = []
            items.forEach(e => {
                const id = e.itemId
                // if(query === null){
                //     router.push("/")
                // } else {
                    
                // }
                if(id == query) {
                    data.push(e)
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


    async function buyNft(nft,event) {
        event.stopPropagation();
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
          value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    if (loadingState === 'loaded' && (nfts.length>1 || !nfts.length)) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return(
        <div className='pt-10'>
            {
                nfts.map((nft,i) => (
                    <div className='single-container' key={i}>
                        <div className='single-image'>
                            <div className='single-image-holder'>
                                <img src={nft.image} />
                            </div>
                        </div>
                        <div className='single-image-description'>
                            <div className='nft-name'>
                                {nft.name}
                            </div>
                            <div className='nft-id'>
                                #{nft.itemId}
                            </div>
                            <div className='nft-owner'>
                                <div className='nft-owner-title'>Owner Id:</div><div className='nft-owner-id'>{nft.seller}</div>
                            </div>
                            <div className='nft-description'>
                                <div className='nft-owner-title'>Description:</div>
                                <div className='nft-owner-description'>{nft.description}</div>
                            </div>
                            <div className='nft-id'>
                                <div className='nft-price-title'>Price:</div>
                                <div className='nft-price'>
                                    <EtherIcon style={{ width:'32px', height:'30px' }} />
                                    <div className='single-eth-price'>{nft.price} &nbsp;FTM</div>
                                </div>
                            </div>
                            <div className='nft-buy-button'>
                                <button className='single-bs-btn' onClick={(event)=>{ buyNft(nft,event) }}>Buy Now</button>
                            </div>
                        </div>
                    </div>        
                ))
            }
        </div>
    )
}

export default Single;
