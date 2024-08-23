class StorageHelper {
   static getLocalizationVal(): string {
      //get from browser
      const langVal: string | null = window.localStorage.getItem("lang")
      langVal ?? window.localStorage.setItem("lang","ar")
      return langVal! 
   }

}

export default StorageHelper;