import Settings from "../public/Images/settings.js"
import { useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'


function Profile() {

    // const pgp = require('pg-promise')({
    //     noWarnings: true
    // })

    // const db = pgp(`postgres://User:Password@localhost:5432/product-test`)

    const [acc, setAcc] = useState([])

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [avatars, setAvatar] = useState("")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    function saveData(){
        console.log(username, email);
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

    onInit();

    return (
        <div>
            <div className="profile-empty">
                <a style={{color:'transparent'}}>Hello</a>
            </div>
            <div className="profile">
                <div className="profile-detail">
                    <div className="profile-pic-holder">
                        <div className="profile-pic">
                            <img className="profile-image" src="/Images/avatar.png" />
                        </div>
                    </div>
                    <div className="profile-username pt-10">
                        <strong className="">Username:</strong>
                        <div> Unnamed </div>
                    </div>
                    <div className="profile-email pt-10">
                        <strong className="">Email:</strong>
                        <div> Unknown </div>
                    </div>
                    <div className="profile-bio pt-10">
                        <strong className="">Account:</strong>
                        <div className="profile-account-holder"> {acc} </div>
                    </div>
                </div>
            </div>
            <div className="settings-icon">
                <button style={{fill:'crimson'}} onClick={ () => { setOpen(true) } }><Settings /></button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                    </span>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:block sm:items-start">
                            {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div> */}
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 popup-heading">
                            Create Your Profile
                            </Dialog.Title>
                            <div className="mt-2">
                            <div className="text-sm text-gray-500 mt-4">
                                <label htmlFor="username">Upload Profile Pic:</label>
                                <input className='ml-2' type="file" name="userPic" defaultValue={avatars} onChange={ (e) => {setAvatar(e.target.files[0])}} />
                                </div>
                                <div className="text-sm text-gray-500 mt-5">
                                    <label htmlFor="username">Enter your Username:</label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        style={{maxWidth:'500px', width:'100%'}} 
                                        type="text"
                                        name="username" 
                                        placeholder="Please provide your username..." 
                                        onChange={(event)=>{
                                        var username = event.target.value;
                                        setUsername(username)
                                        }}
                                        required
                                    />
                                </div>
                                <div className="text-sm text-gray-500 mt-5">
                                    <label htmlFor="Email">Enter your Email:</label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        style={{maxWidth:'500px', width:'100%'}} 
                                        type="email"
                                        name="username" 
                                        placeholder="Please provide your email..." 
                                        onChange={(event)=>{
                                        var email = event.target.value;
                                        setEmail(email);
                                        }}
                                        required
                                    />
                                </div>
                                <div className="text-sm text-gray-500 mt-5">
                                    <label htmlFor="Metamask_id">Your Metamask Address:</label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        style={{maxWidth:'500px', width:'100%', cursor:'not-allowed'}} 
                                        type="text"
                                        name="Metamask_id"
                                        value={acc}
                                        required
                                        disabled
                                    />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-md"
                            onClick={ ()=>{
                                saveData()
                            }}
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm items-center"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default Profile