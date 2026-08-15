const SearchResultFallback = () => {
  // class forr custom moving background shimmer
  const shimmerStyle =
    "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]";

  return (
    <div className="flex flex-col max-sm:flex-row md:flex-row bg-[#121212]/90 rounded-lg overflow-hidden w-full p-4 max-md:p-2 border border-neutral-800 shadow-xl animate-pulse">
      <div className="w-1/3 md:w-1/3 shrink-0">
        <div className={`w-full h-full rounded-md ${shimmerStyle}`} />
      </div>

      <div className="w-2/3 max-md:pl-2 md:w-2/3 md:pl-6 md:pt-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <div className={`w-1/3 h-7 rounded ${shimmerStyle}`} />
            <div className={`w-16 h-4 rounded ${shimmerStyle}`} />
          </div>

          <div className="flex items-center justify-between space-x-6 mb-6">
            <div className={`w-12 h-4 rounded ${shimmerStyle}`} />
            <div className={`w-10 h-4 rounded ${shimmerStyle}`} />
            <div className={`w-24 h-4 rounded ${shimmerStyle}`} />
          </div>

          <div className="space-y-2.5">
            <div className={`w-full h-4 rounded ${shimmerStyle}`} />
            <div className={`w-full h-4 rounded ${shimmerStyle}`} />
            <div className={`w-full h-4 rounded ${shimmerStyle}`} />
            <div className={`w-11/12 h-4 rounded ${shimmerStyle}`} />
            <div className={`w-4/5 h-4 rounded ${shimmerStyle}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultFallback;
