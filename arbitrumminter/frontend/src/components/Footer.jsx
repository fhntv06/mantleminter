import React from 'react';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <footer className="max-w-[1292px] w-full mx-auto border-t border-white py-6 mt-auto z-10">
       <SocialIcons />
      <div className="mx-auto px-4 sm:px-5.5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="order-2 sm:order-1">
            <span className="text-white text-sm sm:text-lg">© 2025 Arbitrum Minter</span>
          </div>
          <div className="order-1 sm:order-2">
            <span className="text-white text-sm sm:text-lg flex items-center gap-1">
              Made with <img src="/img/footerHeart.png" alt="heart" className="inline h-3 sm:h-4" /> By{' '}
              <span className="pixel-text text-sm sm:text-lg">Brothers-Builders</span>
              <img className='w-[20px]' src='footer.png'/>
            </span>
          </div>
          <div className="order-3">
            <button className="text-white hover:text-white text-sm sm:text-lg">
              Switch to Testnet
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
