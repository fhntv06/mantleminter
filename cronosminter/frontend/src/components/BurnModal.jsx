import React, { useState } from 'react';
import { ethers } from 'ethers';
import { X } from 'lucide-react';
import { formatNumberWithCommas, formatNumberWithDots } from '../helpers/validateInputNumber';

const CONTRACT_ADDRESS = "0x0B9fA5640067066951500703dd7791A37ceE96ba";
const CONTRACT_ABI = [
  {
    "inputs": [{ "name": "amount", "type": "uint256" }],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const BurnModal = ({ isOpen, onClose, tokenSymbol = 'COM', account, tokenAddress, setIsWalletModalOpen, setNotification, setTokenAddress , handleUpdateTokenInfo}) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBurn = async () => {
    if(Number(amount) < 1) {
      setNotification({ message: `Minimum amount to burn is 1 ${tokenSymbol}`, color: '#FF4444' });
      return;
    }

    if (!account) {
      setNotification("Please connect your wallet first.");
      return;
    }

   

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, CONTRACT_ABI, signer);
      console.log(tokenAddress);

      const polygonId ='0x1388';  
      try {
          await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: polygonId }],
          });
      } catch (error) {
          console.error(error);
      } 
      
      const amountToBurn = ethers.parseUnits(amount.toString(), 18);
      console.log("Burning amount:", amountToBurn.toString());
      
      setIsWalletModalOpen(true);
      
      const tx = await contract.burn(amountToBurn);
      await tx.wait();
      
      setIsWalletModalOpen(false);
      setNotification(`${amount} ${tokenSymbol} burned successfully!`);
      
      setTokenAddress(tokenAddress);
      handleUpdateTokenInfo();
    } catch (error) {
      console.error("Error burning tokens:", error);
      setNotification("Burning failed! Check the console for details.");
    } finally {
      setLoading(false);
      onClose();
      setAmount('');
    }
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, '');

    if (/^\d*$/.test(rawValue)) {
      const formattedValue = formatNumberWithDots(rawValue);
      setAmount(formattedValue);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-[#1B024F] bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-[999] transition-opacity duration-600 ease-in-out"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={onClose}
    >
      <div 
        className="relative w-[90%] max-w-[400px] bg-[#03101C] rounded-[20px] p-6 transition-all duration-600 ease-in-out transform"
        style={{ 
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.95)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-white"
        >
          <X size={24} color='#fff' strokeWidth={4} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Burn {tokenSymbol}
        </h2>

        <input
          type="text"
          placeholder={`Enter ${tokenSymbol} amount`}
          value={amount}
          onChange={handleAmountChange}
          className="w-full bg-[transparent] placeholder-white border border-white rounded-full py-2.75 px-4 text-[0.925rem] mb-16"
        />

        <div className="flex justify-center">
          <button
            onClick={handleBurn}
            className="px-8 py-2 rounded-full bg-[#033562] text-white transition-colors"
            disabled={loading || !account}
          >
            {loading ? "Processing..." : "Burn"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BurnModal;