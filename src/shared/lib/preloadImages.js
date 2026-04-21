export const preloadImages = (sources) => {
  sources.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
