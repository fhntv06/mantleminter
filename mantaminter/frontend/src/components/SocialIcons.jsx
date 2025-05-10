import React from 'react';

const SocialIcons = () => {
  return (
      <div className="absolute right-5 flex flex-row bottom-[150px] sm:bottom-[101px] gap-4 z-[10]">
          <a href='https://t.me/mantleminter' target='_blank'>
              <img src="/img/telegramLogo.png" alt="Telegram"
                   className="h-9 w-9 cursor-pointer mix-blend-screen hover:mix-blend-normal transition-all duration-200 hover:scale-110"/>
          </a>
          <a href='https://github.com/mantleminter' target='_blank'>
              <img src="/img/gitLogo.png" alt="Git"
                   className="h-9 w-9 cursor-pointer mix-blend-screen hover:mix-blend-normal transition-all duration-200 hover:scale-110"/>
          </a>
          <a href='https://x.com/mantleminter' target='_blank'>
              <img src="/img/x.png" alt="X"
                   className="h-9 w-9 cursor-pointer mix-blend-screen hover:mix-blend-normal transition-all duration-200 hover:scale-110"/>
          </a>
      </div>
  );
};

export default SocialIcons;