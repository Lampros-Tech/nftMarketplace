import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import EtherIcon from '../public/Images/ether-icon'

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

import router from 'next/router'

let rpcEndpoint = null

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

function Home(){

  const [acc, setAcc] = useState([])
  
  async function onInit() {
    if(typeof web3 !== 'undefined'){
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        // console.log(accounts[0])
        return accounts[0]
      });
      setAcc(account);

      return account
    }
    else{
      return null;
    }
  }


  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
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

    const finalItem = items.filter( i => Object.keys(i).length > 0 )

    // console.log(finalItem)
    setNfts(finalItem)
    setLoadingState('loaded') 
  }
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

  onInit()
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    <div className="contents">
      <div className="px-4 main-container" style={{ marginTop: '50px' }}>
        <div className="pt-4 sample">
          <div className='grid grid-cols-4 sample-cards'>
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl mr-3 mb-3 overflow-hidden dash-container" onClick={()=>{ router.push(`/single/${nft.itemId}`) } }>
                  <div className="imageholder"><img src={nft.image} className='rounded' /></div>
                  <div className="pt-1 pl-2 pr-2">
                    <div className='flex pt-2 pl-2 pr-2'>
                      <span style={{ height: '20px', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden', color:'#484848' }} className="flex-grow font-semibold">{nft.name}</span>
                      <div className='grid text-right'>
                        <span className='font-semibold' style={{color:'#484848'}}>
                          price
                        </span>
                        <div style={{ width: '80px', textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden', fontSize:'14px', fontWeight:'500', width:'80px', textOverflow:'ellipsis', color:'#484848'   }} className='inline'><EtherIcon style={{width:'20px',height:'0',paddingTop: '5px'}} />{nft.price} ETH</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-white font-bold py-2 px-12 rounded bs-btn" onClick={(event) => buyNft(nft,event)}>Buy Now</button>
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

export default Home