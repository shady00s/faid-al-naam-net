
interface ScreenInterface {
  refAttr: React.RefObject<HTMLDivElement>
  isImagesLoaded: (isLoaded: boolean) => void
  startAnimation: boolean
  language: LanguageInterface
}

interface HomeScreenInterface {
  refAttr: React.RefObject<HTMLDivElement>
  isImagesLoaded: (isLoaded: boolean) => void
  startAnimation: boolean
  language: LanguageInterface
  contactUs:React.RefObject<HTMLDivElement>
  ourMession:React.RefObject<HTMLDivElement> 
}