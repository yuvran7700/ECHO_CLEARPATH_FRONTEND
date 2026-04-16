function BrowserFrame({ children, url }) {
  return (
    <div className="w-full h-full text-black rounded-[26px] overflow-hidden shadow-xl bg-white">
      
      {/* Top Bar */}
      <div className="h-12 flex items-center px-4 bg-white/70 backdrop-blur-xl border-b border-black/5">
        
        {/* Traffic lights */}
        <div className="flex gap-2 w-20">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex justify-center">
          <div className="h-6 w-full max-w-[260px] rounded-md border border-black/10 bg-white/80 shadow-inner flex items-center justify-center text-[10px] text-neutral-500 font-medium">
            {url}
          </div>
        </div>

        <div className="w-20" />
      </div>

      {/* Content */}
      <div className="h-full bg-white overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default BrowserFrame;