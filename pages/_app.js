import '../styles/globals.css'
import '../styles/appstyle.css'
import Link from 'next/link'
import "next/image"
import { useState } from 'react'

import HomeLogo from "../public/Images/HomeTest.js"
import Add from "../public/Images/add.js"
import Collection from "../public/Images/collection.js"
import Transactions from "../public/Images/transactions.js"
import Wallet from "../public/Images/wallet.js"
import Menu from "../public/Images/menu.js"
import Close from "../public/Images/close.js"

import { useRouter } from "next/router"

function Marketplace({ Component, pageProps }) {

  const [acc, setAcc] = useState([])

  const [toggler, setToggle] = useState(false)

  const router = useRouter()

  const activeStyle = {
    backgroundColor : 'black',
    fill : 'crimson',
    color : 'crimson',
    display : 'flex',
    border: '0.5px solid crimson',
  }

  async function onInit() {
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

  
  const [searchState, setSearch] = useState("")
  
  //console.log(searchState)

  onInit()
  return (
    <div>
      <nav className="navs">
        <div className="logo"> 
          <img className='logos' src="/Images/155750.svg" width="40px" height="40px" /> 
        </div>
        <div className='search'>
          <input type='text' className='searchtext' placeholder='search...' onChange={ (event) => {setSearch(event.target.value)} } />
        </div>
        <div className="sub-navs">
          {/* <Link 
            href="/:id"
            render={props => { <Home {...props} searchData = {searchState} /> }}
          > */}
          <Link href="/">
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
          <Link href="/create-item">
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
          </Link>
        </div>
        <div>
          <div className='menu-icon' style={{ textAlign:"center", paddingTop:'15px' }}>
            <button onClick={()=>{ setToggle(true) }}><Menu style={{width:'25px'}} /></button>
          </div>
        </div>
        <Link href="/profile">
          <a>
            <div className='address-holder'>
              <div className='my-address' title={acc}>{acc}</div>
              <Wallet />
            </div>
          </a>
        </Link>
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