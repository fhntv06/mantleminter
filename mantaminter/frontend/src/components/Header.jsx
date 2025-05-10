import React, { useState, useEffect, useRef } from 'react';
import AddressInput from './AddressInput';
import WalletDropdown from './WalletDropdown';
import { X } from 'lucide-react';
import Notification from './Notification';

const Header = ({
  onOpenModal,
  addressInputRef,
  localNotification,
  setLocalNotification,
  setNotification,
  account,
  setAccount,
  disconnectWallet,
  connectWallet,
  tokenAddress,
  setTokenAddress,
  tokenSymbol,
  setTokenSymbol,
  owner,
  setOwner,
  totalSupply,
  setTotalSupply,
  balance,
  setBalance,
  showAddressHistory,
  setShowAddressHistory,
  addressHistory,
  handleAddressSelect,
  onAddressSubmit,
  onRemoveAddress,
  setTokenName,
  setTokensToMint
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearAddress = () => {
    setTokenAddress('');
    setTokenName('');
    setTokenSymbol('');
    setOwner(null);
    setTotalSupply(null);
    setBalance(null);
    setTokensToMint('');
  };

  const handleWalletClick = (e) => {
    e.stopPropagation();
    if (!account) {
      connectWallet();
    } else {
      setShowDropdown(!showDropdown);
    }
  };


  return (
    <header className="w-full bg-white rounded-bl-[50px] lg:rounded-bl-[100px] xl:rounded-bl-[150px] relative z-20">
      <div className="max-w-[1210px] mx-auto px-4 sm:px-5.5 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <a onClick={handleClearAddress}>
            <img src="/img/logo.png" alt="Mantle Logo" className="h-6 sm:h-14" />
          </a>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-9">
          <button
            ref={buttonRef}
            className="relative min-w-5 sm:min-w-40 bg-black hover:bg-[#5A5A5A] text-white px-2 sm:px-3 py-1.5 rounded-full flex items-center gap-1 sm:gap-2"
            onClick={handleWalletClick}
          >
            <div className="flex items-center justify-center gap-2 w-full text-xs sm:text-lg">
              {account ? account.slice(0, 6) + '...' + account.slice(-4) : "Connect Wallet"}
              {account && <img src="/img/pepe.png" alt="pepe" className="w-4 h-4" />}
            </div>
            {account && showDropdown && (
              <WalletDropdown
                account={account}
                setNotification={setNotification}
                ref={dropdownRef}
                onDisconnect={disconnectWallet}
                onClose={() => setShowDropdown(false)}
              />
            )}
          </button>
          <button onClick={onOpenModal}>
            <img className="w-10 sm:w-[60px]" src="/img/pepe.png" alt="Pepe" />
          </button>
        </div>
      </div>
      
      <div className="max-w-[1210px] mx-auto px-4 sm:px-5.5">
        <AddressInput
          ref={addressInputRef}
          tokenAddress={tokenAddress}
          setTokenAddress={setTokenAddress}
          tokenSymbol={tokenSymbol}
          setTokenSymbol={setTokenSymbol}
          owner={owner}
          setOwner={setOwner}
          totalSupply={totalSupply}
          setTotalSupply={setTotalSupply}
          balance={balance}
          setBalance={setBalance}
          showAddressHistory={showAddressHistory}
          setShowAddressHistory={setShowAddressHistory}
          addressHistory={addressHistory}
          handleAddressSelect={handleAddressSelect}
          onAddressSubmit={onAddressSubmit}
          onRemoveAddress={onRemoveAddress}
          setTokenName={setTokenName}
        />
      </div>
    </header>
  );
};

export default Header;
