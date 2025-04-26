import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import btnCreateToken from '../../public/img/createTokenBtn.png';

const ModalOverlay = React.memo(({ children, onClose }) => (
  <div 
    className="modal fixed inset-0 bg-[#1B024F] bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-[999] modal-overlay tokenModalMam"
    onClick={onClose}
  >
    {children}
  </div>
));

const ModalHeader = React.memo(({ onClose }) => (
  <>
    <button 
      onClick={onClose}
      className="absolute right-4 top-4 hover:text-white"
    >
      <X size={24} color='#fff' strokeWidth={4} />
    </button>

    <h2 style={{fontSize: '30px'}} className="modalTokenHeaderAdap text-xl text-center text-white pl-[40px] pr-[40px]">
        $ZOM are tokens of the Zora minter project, which in the future you will be able to mint on your wallet or spend on promotion in Zora memepad.
    </h2>

    <div className="flex justify-center mt-5 mb-5">
      <img 
        src="/img/modal-circle.png" 
        alt="Modal Circle" 
        className="w-24 h-24 pulse"
        style={{ margin: '-10px 0' }} 
      />
    </div>
  </>
));

const SearchSection = React.memo(() => (
  <div className="flex justify-center items-center gap-2 mb-4">
    <div className="relative w-[120px]">
      <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white" size={10} />
      <input
        type="text"
        placeholder="Search for token"
        disabled
        className="w-full bg-transparent border border-white rounded-lg py-1 px-4 text-white text-sm cursor-not-allowed text-[10px] placeholder-white"
      />
    </div>
    <div className="border border-white text-white p-1 rounded-lg text-sm cursor-not-allowed bg-transparent">
      search
    </div>
  </div>
));

const CoinDisplay = React.memo(({ coin, isTransitioning }) => (
  <div className="relative z-10 flex justify-between items-center h-[124px] coin-container overflow-visible border border-white rounded-[15px]">
    <div className='pt-[12px] pl-[12px] pb-[12px]'>
      <h3 
        style={{fontSize: '25px'}} 
        className={`text-white coin-transition ${isTransitioning ? 'coin-exit' : ''} sm:text-[25px] text-[17px]`}
      >
        {coin.name}
      </h3>
      <p 
        className={`text-white coin-transition ${isTransitioning ? 'coin-exit' : ''} sm:text-[19px] text-[14px]`}
      >
        created by {coin.creator}
      </p>
      <p 
        className={`coin-transition ${isTransitioning ? 'coin-exit' : ''} sm:text-[19px] text-[14px]`}
      >
        <span className="text-white">market cap: </span>
        <span style={{ color: '#00FF0D' }}>{coin.marketCap}</span>
      </p>
    </div>
    <img 
      src={coin.image}
      alt={coin.name}
      className={`h-full rounded-xl object-cover coin-transition ${isTransitioning ? 'coin-exit' : ''} border-2`}
    />
  </div>
));

const MainModal = ({ isOpen, onClose, coins }) => {
  if (!isOpen) return null;

  const [direction, setDirection] = useState('next');
  const [currentCoinIndex, setCurrentCoinIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentCoinIndex((prevIndex) => (prevIndex + 1) % coins.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 1000);
      
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, coins.length]);
  
  useEffect(() => {
    return startTransition();
  }, [startTransition]);

  const currentCoin = coins[currentCoinIndex];

  return (
    <ModalOverlay onClose={onClose}>
      <div className={'modal-container max-h-[90vh] w-f'}>
      <div 
        className="modal-body relative  max-h-[90vh] overflow-y-auto overflow-x-hidden"
        onClick={e => e.stopPropagation()}
        style={{
          borderRadius: '24px',
          position: 'relative',
          borderRadius: '26px',
          border: 'solid 1px white',
        }}
      >
        <div style={{
          position: 'absolute ',
          inset: '-2px',
          
          padding: '1px',
          zIndex: 0,
        }}
        className="modalOverlay"
        />
        
        <div className="relative z-10 py-6 px-8 sm:py-8 ">
          <ModalHeader onClose={onClose} />

          <div className="coin-title" style={{
            width: '100%',
            maxWidth: '385px',
            margin: '0 auto 32px',
            position: 'relative',
            padding: '12px',
            fontFamily: 'Inria Sans, sans-serif',
            background: 'transparent',
            borderRadius: '16px',
            border: 'solid 1px white',
          }}>
            <div style={{
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: '18px',
                  borderColor: '#fff',
                padding: '12px',
                zIndex: 0,
              }} />
              <CoinDisplay coin={currentCoin} isTransitioning={isTransitioning} />
            </div>
          </div>

          <div className="tokenModalAdap relative rounded-3xl pt-2 pb-4 px-10 m-auto">
            <div style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '24px',
              border: 'solid 1px white',
              padding: '1px',
              zIndex: 0,
            }} />
            
            <div className="coins-frame relative z-10 max-h-[350px] overflow-y-auto">
            <img
              src={btnCreateToken}
              className="w-auto m-auto mb-4 h-[30px] object-cover rounded-xl"
            />

              <SearchSection />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-y-5 overflow-hidden">
                {coins.map((coin, index) => (
                  <div key={index} className="flex flex-col items-center text-center coin-grid-item overflow-hidden">
                    <div className="w-[60px] h-[60px] sm:w-[63px] sm:h-[63px] mb-1 sm:mb-1.5 overflow-hidden">
                      <img 
                        src={coin.image}
                        alt={coin.name} 
                        className="w-full h-full object-cover rounded-xl"
                        style={{ border: '1px solid white' }}
                      />
                    </div>
                    <h4 className="text-white text-[10px]">{coin.name}</h4>
                    <p className="text-[10px]">created by {coin.creator}</p>
                    <p className="text-[10px]">
                      <span className="">market cap: </span>
                      <span style={{ color: '#00FF0D' }}>{coin.marketCap}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ModalOverlay>
  );
};

export default MainModal;