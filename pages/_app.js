import '../styles/globals.css'
import '../styles/appstyle.css'
import Link from 'next/link'
import "next/image"
import { useState } from 'react'
import HomeLogo from "../public/Images/HomeTest.js"
import Add from "../public/Images/add.js"
import Collection from "../public/Images/collection.js"
import Transactions from "../public/Images/transactions.js"


function Marketplace({ Component, pageProps }) {

  const [acc, setAcc] = useState([])

  async function onInit() {
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // console.log(typeof account)
    // console.log(account)
     window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      // console.log(accounts[0])
      //return accounts[0]
    });
    setAcc(account);
  }

  const style = {

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
            <a className="nav-btn" style={ {display:'flex'} }>
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
            <a className="nav-btn" style={ {display:'flex'} }>
              <div className='nav-btn-btn'>
                Create
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <Add className="route-icons" />
              </div>
            </a>
          </Link>
          <Link href="/my-assets">
            <a className="nav-btn" style={ {display:'flex'} }>
              <div className='nav-btn-btn'>
                Your Collection
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2'>
                <Collection className="route-icons" />
              </div>
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="nav-btn" style={ {display:'flex'} }>
              <div className='nav-btn-btn'>
                Your Transactions
              </div>
              <div className='nav-small-btn w-4 h-4 ml-2 mb-2'>
                <Transactions className="route-icons" />
              </div>
            </a>
          </Link>
        </div>
        <div className='address-holder'>
          <div className='my-address' title={acc}>{acc}</div>
          <img src="/Images/wallet.svg" width="30px" height="20px" className='avatar' />
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace