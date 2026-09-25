const Blobs = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="blob-float-a absolute -left-24 top-10 size-80 rounded-full bg-[#fb7185]/80 blur-3xl" />
      <div className="blob-float-b absolute right-[-4rem] top-24 size-96 rounded-full bg-[#60a5fa]/75 blur-3xl" />
      <div className="blob-float-c absolute bottom-24 left-1/3 size-80 rounded-full bg-[#c084fc]/65 blur-3xl" />
      <div className="absolute top-[26rem] right-1/4 size-72 rounded-full bg-[#fbbf24]/55 blur-3xl" />
    </div>
  )
}

export default Blobs
