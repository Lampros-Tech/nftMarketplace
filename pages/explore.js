import Filter from "../public/Images/filter"
import RightArrow from "../public/Images/right-arrow"

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from "web3modal"
import axios from 'axios'

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
  

let rpcEndpoint = null

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

function Explore(){
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
        owner: i.oldOwner,
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

function changeStyle(){
    // console.log("I am in")  
}

  const changeAction = changeStyle()

  onInit()
    return(
        <div className="leftsidebar" style={changeAction}>
            <div className="leftsidebar-container">
                <div className="leftsidebar-header">
                    <h1 className="left-header"><Filter style={{ width:'20px', height:'20px', textAlign:"center" }} /> &nbsp;&nbsp; Filter</h1>
                    <div className="p-4" onClick={()=>{ changeStyle() }}>
                        <RightArrow style={{ width:'25px', height:'25px',transform: 'rotate(180deg)', cursor:'pointer' }} />
                    </div>
                </div>
                <div className="left-options">
                    
                </div>
            </div>           
        </div>
    )
}

export default Explore;