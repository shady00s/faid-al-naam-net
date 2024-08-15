// import { useState, useCallback, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../utils/axios";
// import Localizations from "../context/localization";

// export default function useLoadingScreenTrigger() {
//   const { language1 } = useContext(Localizations);

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [isClientUrl, setClientUrl] = useState(false);
//   const handleInstance = useCallback(() => {
//     const requestInterceptor = instance.interceptors.request.use(
//       (onSuccess) => {
//         if (onSuccess.url === "/client") {
//           setLoading(true);
//           setClientUrl(true);
//         }
//         return onSuccess;
//       },
//       (onError) => {
//         if (isClientUrl) {
//           navigate("/error");
//           return Promise.reject(onError);
//         }
//         return Promise.reject(onError);

//       }
//     );

//     const responseInterceptor = instance.interceptors.response.use(
//       (onSuccess) => {
//         if (onSuccess.data && onSuccess.data.response) {
//           setLoading(false);
//         }
//         return onSuccess;
//       },
//       (onError) => {
//         if (isClientUrl) {
//           navigate("/error");
//           return Promise.reject(onError);
//         }
//         return Promise.reject(onError);
//       }
//     );

//     // Cleanup interceptors to avoid memory leaks
//     return () => {
//       instance.interceptors.request.eject(requestInterceptor);
//       instance.interceptors.response.eject(responseInterceptor);
//     };
//   }, [instance, navigate]);

//   useEffect(() => {
//     handleInstance();
//   }, [language1]);
//   useEffect(() => {
//     const cleanupInterceptors = handleInstance();
//     return () => cleanupInterceptors();
//   }, [handleInstance]);

//   return loading;
// }
