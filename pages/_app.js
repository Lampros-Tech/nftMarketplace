import '../styles/globals.css'
import '../styles/appstyle.scss'
import Link from 'next/link'
import "next/image"
import React, { useState, useRef, useEffect } from 'react'


import HomeLogo from "../public/Images/HomeTest.js"
import Add from "../public/Images/add.js"
import Collection from "../public/Images/collection.js"
import Transactions from "../public/Images/transactions.js"
import Menu from "../public/Images/menu.js"
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

  const [searchState, setSearch] = useState("")

  const router = useRouter()

  const buttonRef = useRef();

  const activeStyle = {
    backgroundColor : 'black',
    fill : 'crimson',
    color : 'crimson',
    display : 'flex',
    border: '0.5px solid crimson'
  }

  useEffect(()=>{
    setSearch(searchState)

  },[setSearch, searchState])

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

  function setRoute(e){
    const value = e.target.value

    if(value === ""){
      router.push("/")
    }else{
      router.push(`/${value}`)
    }
  }

  
  onInit()
  return (
    <div>
      <nav className="navs">
        <div className="logo"> 
          {/* <img className='logos' src="/Images/155750.svg" width="40px" height="40px" />  */}
          NFT
        </div>
        <div className='search'>
          <input type='text' className='searchtext' placeholder='search...' onKeyDown={ (e) => { if(e.key === 'Enter') {setRoute(e)} } } />
        </div>
        <div className="sub-navs">
          {/* <Link 
            href="/:id"
            render={props => { <Home {...props} searchData = {searchState} /> }}
          > */}
          {/* <Link href={{ pathname: '/', query : { searchState } }}> */}
          <Link href={ "/" + searchState }>
            <a className={"nav-btn"} style={ (router.pathname) === '/' ? activeStyle : {display:'flex', fill:'crimson' }  }>
              <div className='nav-btn-btn'>
                Home
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
        </div>
        <div>
          <div className='menu-icon' style={{ textAlign:"center" }}>
            {/* <button onClick={()=>{ setToggle(true) }}><Menu style={{width:'25px'}} /></button> */}
            <Button ref={buttonRef} ripple="light">
                <Menu style={{ width:'25px', height:'25px' }} />
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
                        Create
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
                        My Assets
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
    </div>
  )
}

export default Marketplace