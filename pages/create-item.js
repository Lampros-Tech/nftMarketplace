import { useState, useRef } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

import ImagePreview from '../public/Images/image_preview'
import Close from '../public/Images/close'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()
  const inputFile = useRef(null) 

  const ImageStyle = {
    width: '75px',
    height: '50px',
    fill: '#969699',
  }

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  const resetFile = (e) => {
    e.stopPropagation(); 
    setFileUrl(null) 
  }

  return (
    <div>
      <div className="flex justify-center mt-4 main-container">
        <div className="w-1/2 flex flex-col pb-12">
          <h1 className='create-title'>Create New Item</h1>
          <span className='alert-text'><span className='red'>*</span> Required Fields</span>
          <span className='create-info'>Image, Video, Audio or 3D Model <span className='red'>*</span></span>
          <span className='alert-text'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</span>
          <div className='py-4'>
            <div className='media-upload-control' onClick={()=>{ inputFile.current.click() }}>
              { fileUrl ?
                <div className='create-image-holder'>
                  <div className='create-image-close' onClick={ (event) => {resetFile(event) }}>
                    <Close style={{width:'25px', fill:'#969696'}} />
                  </div>
                  <img className="create-image" src={fileUrl} />
                </div>
                : 
                <ImagePreview className="default-image" style={ImageStyle}  />
              }
            </div>
          </div>
          <span className='create-info'>Name <span className='red'>*</span></span>
          <input 
            placeholder="Asset Name"
            className="mt-2 mb-2 border rounded-xl p-3"
            required
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <span className='create-info'>Description</span>
          <textarea
            placeholder="Asset Description"
            className="mt-2 mb-2 border rounded-xl p-4"
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <span className='create-info'>price <span className='red'>*</span></span>
          <input
            type="number"
            placeholder="Asset Price in FTM"
            className="mt-2 mb-2 border rounded-xl p-4"
            required
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onChange}
            hidden
            ref={ inputFile }
          />
          {/* {
            fileUrl && (
              <img className="rounded mt-4" width="350" src={fileUrl} />
            )
          } */}
          <button onClick={createMarket} className="font-bold mt-4 text-white rounded p-4 create-btn">
            Mint NFT
          </button>
        </div>
      </div>
    </div>
  )
}