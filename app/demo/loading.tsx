export default function DemoLoading() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">

      {/* Left panel skeleton — desktop */}
      <div className="hidden lg:flex lg:w-[42%] lg:min-h-screen bg-gradient-to-br from-[#1a5fba] via-primary to-[#1e40af] flex-col px-10 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="size-9 rounded-lg bg-white/20" />
          <div className="h-5 w-32 rounded-full bg-white/20" />
        </div>
        {/* Badge */}
        <div className="h-6 w-44 rounded-full bg-white/20 mb-5" />
        {/* Headline */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="h-9 w-3/4 rounded-xl bg-white/20" />
          <div className="h-9 w-1/2 rounded-xl bg-white/20" />
        </div>
        {/* Bullets */}
        <div className="flex flex-col gap-3 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-7 rounded-full bg-white/20 shrink-0" />
              <div className="h-4 rounded-full bg-white/20 flex-1" />
            </div>
          ))}
        </div>
        {/* Stats */}
        <div className="flex gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-7 w-16 rounded-lg bg-white/20" />
              <div className="h-3 w-20 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">

        {/* Mobile top bar skeleton */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-5 w-28 rounded-full bg-slate-200 animate-pulse" />
          </div>
          <div className="h-6 w-24 rounded-full bg-slate-200 animate-pulse" />
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <div className="h-full w-1/4 bg-primary/30 animate-pulse" />
        </div>

        {/* Step counter mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 pt-3 pb-1">
          <div className="h-3 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-3 w-16 rounded-full bg-slate-200 animate-pulse" />
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center px-4 md:px-10 py-5 md:py-12 lg:py-14">
          <div className="w-full max-w-xl">

            {/* Headline skeleton */}
            <div className="hidden lg:flex flex-col items-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-5 w-32 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <div className="h-8 w-3/4 rounded-xl bg-slate-200 animate-pulse" />
              <div className="h-8 w-1/2 rounded-xl bg-slate-200 animate-pulse" />
            </div>
            <div className="lg:hidden flex flex-col items-center gap-2 mb-5">
              <div className="h-6 w-3/4 rounded-xl bg-slate-200 animate-pulse" />
              <div className="h-6 w-1/2 rounded-xl bg-slate-200 animate-pulse" />
            </div>

            {/* Card skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5 md:p-8">
                {/* Card heading */}
                <div className="h-6 w-2/3 rounded-xl bg-slate-200 animate-pulse mx-auto mb-6" />
                {/* Option buttons */}
                <div className="flex flex-col gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
                  ))}
                </div>
              </div>
              {/* CTA button */}
              <div className="px-5 md:px-8 pb-5 border-t border-slate-100 pt-4">
                <div className="h-14 rounded-xl bg-secondary/30 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
