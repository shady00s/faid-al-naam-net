import { createContext } from "react";
import StorageHelper from "../../utils/storage";

const Localizations = createContext<any>({ lang: StorageHelper.getLocalizationVal() })

export default Localizations;