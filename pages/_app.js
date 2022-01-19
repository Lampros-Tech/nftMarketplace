import '../styles/globals.css'
import '../styles/appstyle.css'
import Link from 'next/link'
import "next/image"
import React, { useState, useRef } from 'react'
import useWatch from './hooks/useWatch'

import HomeLogo from "../public/Images/HomeTest.js"
import Add from "../public/Images/add.js"
import Collection from "../public/Images/collection.js"
import Transactions from "../public/Images/transactions.js"
import Wallet from "../public/Images/wallet.js"
import Menu from "../public/Images/menu.js"
import Close from "../public/Images/close.js"
import SearchIcon from "../public/Images/search.js"
import AboutIcon from "../public/Images/about-icon.js"
import ProfileIcon from "../public/Images/profile-icon.js"
import MetaMaskLogo from "../public/Images/metamask.js"

import { useRouter } from "next/router"

import Button from "@material-tailwind/react/Button";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
// import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";

function Marketplace({ Component, pageProps }) {

  const [acc, setAcc] = useState([])

  const [toggler, setToggle] = useState(false)

  var searches = ""

  const router = useRouter()

  const buttonRef = useRef();

  const activeStyle = {
    backgroundColor : 'black',
    fill : 'crimson',
    color : 'crimson',
    display : 'flex',
    border: '0.5px solid crimson',
  }

  async function onInit() {
    if(typeof web3 !== 'undefined'){
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      // console.log(typeof account)
      // console.log(account)
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        // console.log(accounts[0])
        return accounts[0]
      });
      setAcc(account);
    }
    else{
      return null;
    }
  }

  
  const [searchState, setSearch] = useState("")

  useWatch(() => {
    searches = searchState;
    //console.log(searches)
  }, [ searchState ])
  

  onInit()
  return (
    <div>
      <nav className="navs">
        <div className="logo"> 
          <img className='logos' src="/Images/155750.svg" width="40px" height="40px" /> 
        </div>
        <div className='search'>
          <input type='text' className='searchtext' placeholder='search...' onChange={ (event) => { setSearch(event.target.value) } } />
        </div>
        <div className="sub-navs">
          {/* <Link 
            href="/:id"
            render={props => { <Home {...props} searchData = {searchState} /> }}
          > */}
          {/* <Link href={
            {
              pathname: '/[id]',
              query: {
                id: searches,
              }
            }
          }
          as = { `/${searches}` }
          > */}
          <Link href="/">
            <a className={"nav-btn"} style={ (router.pathname) === '/' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                Marketplace
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <HomeLogo className="route-icons" />
              </div>
            </a>
          </Link>
          {/* <Route path="/" render={ props => {<Home {...props} searchData={searchState} />} } /> */}
          <Link href="/explore">
          <a className="nav-btn" style={ (router.pathname) === '/explore' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                Explore
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <SearchIcon className="route-icons" />
              </div>
            </a>
          </Link>
          <Link href="/about">
          <a className="nav-btn" style={ (router.pathname) === '/about' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                About
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <AboutIcon className="route-icons" />
              </div>
            </a>
          </Link>
          {/* <Link href="/create-item">
            <a className="nav-btn" style={ (router.pathname) === '/create-item' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                Create
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <Add className="route-icons" />
              </div>
            </a>
          </Link>
          <Link href="/my-assets">
            <a className="nav-btn" style={ (router.pathname) === '/my-assets' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                Your Collection
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <Collection className="route-icons" />
              </div>
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="nav-btn" style={ (router.pathname) === '/creator-dashboard' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                Your Transactions
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2 mb-2'>
                <Transactions className="route-icons" />
              </div>
            </a>
          </Link> */}
        </div>
        <div>
          <div className='menu-icon' style={{ textAlign:"center" }}>
            {/* <button onClick={()=>{ setToggle(true) }}><Menu style={{width:'25px'}} /></button> */}
            <Button ref={buttonRef} ripple="light">
                <Menu style={{width:'25px'}} />
            </Button>
            <Popover placement="bottom" ref={buttonRef}>
              <PopoverContainer>
                {/* <PopoverHeader>Popover bottom</PopoverHeader> */}
                <PopoverBody className='pt-8'>
                  {/* <Route path="/" render={ props => {<Home {...props} searchData={searchState} />} } /> */}
                  <Link href="/">
                    <a className="nav-btns resize" style={ (router.pathname) === '/' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        Marketplace
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2'>
                        <HomeLogo className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  {/* <Route path="/" render={ props => {<Home {...props} searchData={searchState} />} } /> */}
                  <Link href="/explore">
                  <a className="nav-btns resize" style={ (router.pathname) === '/explore' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        Explore
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2'>
                        <SearchIcon className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  <Link href="/about">
                  <a className="nav-btns resize" style={ (router.pathname) === '/about' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        About
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2'>
                        <AboutIcon className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  <Link href="/create-item">
                    <a className="nav-btns" style={ (router.pathname) === '/create-item' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        Mint Token
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2'>
                        <Add className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  <Link href="/creator-dashboard">
                    <a className="nav-btns" style={ (router.pathname) === '/creator-dashboard' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        Creations
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2 mb-2'>
                        <Transactions className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  <Link href="/my-assets">
                    <a className="nav-btns" style={ (router.pathname) === '/my-assets' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        Collection
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2'>
                        <Collection className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  <Link href="/profile">
                    <a className="nav-btns" style={ (router.pathname) === '/profile' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                      <div className='nav-btn-btns'>
                        Edit Profile
                      </div>
                      <div className='nav-small-btn w-4 h-4 ml-2 mb-2'>
                        <ProfileIcon className="route-icons" />
                      </div>
                    </a>
                  </Link>
                  {
                    acc==='undefined' ?
                    <button className='nav-btns' style={ { background: 'crimson', color:'white' } }>
                      Connect &nbsp;<MetaMaskLogo />
                    </button>
                    :
                    <button className='nav-btns' style={ { background: 'crimson', color:'white' } }>
                      Disconnect &nbsp;<MetaMaskLogo />
                    </button>
                  }
                </PopoverBody>
              </PopoverContainer>
            </Popover>
          </div>
        </div>
        {/* <Link href="/profile">
          <a>
            <div className='address-holder'>
              <div className='my-address' title={acc}>{acc}</div>
              <Wallet />
            </div>
          </a>
        </Link> */}
      </nav>
      <Component {...pageProps} />
      {
        toggler ?
        <div className='rightsidebar'>
          <div className='rightsidebar-container'>
            <div className='mb-2 ml-2' onClick={()=>{ setToggle(false) }}>
              <Close />
            </div>
            <div className='searches mb-2 mt-2 ml-1'>
              <input type='text' className='searchtext' placeholder='search...' onChange={ (event) => {setSearch(event.target.value)} } />
            </div>
            <Link href="/profile">
              <a className='address-holders'>
                {
                  acc ?
                  <div className='my-addresses' title={acc}>{acc}</div>
                  :
                  <button className='nav-btn'>Connect to Account</button>
                }
                
                <Wallet />
              </a>
            </Link>
            <Link href="/">
                <a className="nav-btns" style={ (router.pathname) === '/' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                  <div className='nav-btn-btns'>
                    Home
                  </div>
                  <div className='nav-small-btn w-4 h-4 ml-2'>
                    <HomeLogo className="route-icons" />
                  </div>
                </a>
              </Link>
              {/* <Route path="/" render={ props => {<Home {...props} searchData={searchState} />} } /> */}
              <Link href="/create-item">
                <a className="nav-btns" style={ (router.pathname) === '/create-item' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                  <div className='nav-btn-btns'>
                    Create
                  </div>
                  <div className='nav-small-btn w-4 h-4 ml-2'>
                    <Add className="route-icons" />
                  </div>
                </a>
              </Link>
              <Link href="/my-assets">
                <a className="nav-btns" style={ (router.pathname) === '/my-assets' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                  <div className='nav-btn-btns'>
                    Your Collection
                  </div>
                  <div className='nav-small-btn w-4 h-4 ml-2'>
                    <Collection className="route-icons" />
                  </div>
                </a>
              </Link>
              <Link href="/creator-dashboard">
                <a className="nav-btns" style={ (router.pathname) === '/creator-dashboard' ? activeStyle : {display:'flex', fill:'crimson' }  }>
                  <div className='nav-btn-btns'>
                    Your Transactions
                  </div>
                  <div className='nav-small-btn w-4 h-4 ml-2 mb-2'>
                    <Transactions className="route-icons" />
                  </div>
                </a>
              </Link>
              
          </div>
        </div>
        :
        null
      }
      
    </div>
  )
}

export default Marketplace