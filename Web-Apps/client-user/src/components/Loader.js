function Loader() {
  return (
    <div id="preloader">
      <div className="loading">
        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_xlawpi2p.json" background="transparent"
          speed="1" style={{width: '500px', height: '500px'}} loop autoplay></lottie-player>
      </div>
    </div>
  )
}

export default Loader;