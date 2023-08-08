import React, { useState} from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext"


const LinkAccounts = () => {
  
  const { user } = useAuthContext()
  const [ linkToken, setLinkToken ] = useState('')


  useEffect(() => {
    // Make API call to create link token here
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/create_link_token', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      if (response.ok) {
        const data = await response.json();
        setLinkToken(data.link_token);
      } else {
        console.log('Failed to create Link token.');
      }
      
    }
    if (user) {
      createLinkToken();
    }
  }, [user]);
  
  const onSuccess = async (public_token) => {
        
    const response = await fetch('/api/plaid/set_access_token', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${user.token}`, 
        'Content-Type': 'application/json'},
      body: JSON.stringify({ public_token }),
    })
      if (response.ok) {
        console.log('response worked');
      }
      else {
        console.log('response did not work');
      } 
  };

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open } = usePlaidLink(config);

  const onClick = (e) => {
    e.preventDefault();
    open();
  };

  return (
    <div>
      <p className='note'> **NOTE** <br></br> <br></br> Although the code is working, Wallet Watch is not currently approved for Plaid's 
      Production Environment. Unfortunately this means that many of the major banks will not allow Wallet Watch users to connect due to 
      security risks. As a result, <span className='underline'>Plaid's Sandbox Environment is currently being used</span> so that 
      users can still test out the functionality of this feature with fake data.
      <br></br> <br></br>
      username: user_good <br></br> password: pass_good <br></br> verification code: 1234 (if needed)
      <br></br> <br></br>
      We apologize for the inconvenience.</p>
      <div className='linkaccountbuttondiv'>
        <button className="linkaccountbutton" onClick={onClick}>
          Click here to link accounts
        </button>
      </div>
    </div>
  );
};

export default LinkAccounts;