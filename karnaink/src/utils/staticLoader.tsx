const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../images/tattoos/*"
);
function isMobile(): boolean {
  return window.innerWidth <= 600;
}

export default async function loadAndSetRandomImages(
  setImages: (images: string[]) => void
) {
  const imagePromises = Object.keys(pages).map(async (key) => {
    const importedImage = await pages[key]();
    return importedImage.default;
  });

  const loadedImages = await Promise.all(imagePromises);

  // Shuffle the loaded images using the Fisher-Yates algorithm
  for (let i = loadedImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [loadedImages[i], loadedImages[j]] = [loadedImages[j], loadedImages[i]];
  }

  const randomImages = isMobile()
    ? loadedImages.slice(0, 8)
    : loadedImages.slice(0, 12);
  setImages(randomImages);
}
