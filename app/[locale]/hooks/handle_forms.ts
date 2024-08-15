// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import instance from '../utils/axios';
// import formListCreatorHelper from '../utils/formListCreatorHelper';
// interface useHandleFormsInterface {
//     successNavUrl: string,
//     url: string,
//     id: string,
//     mediaUrls?: { name: string, value: string[] },
//     navigationId?:string
// }

// interface returnData {
//     isSubmitting: boolean;
//     handleSubmit: (formData: any) => void;
//     submitError: string | null;

// }
// export default function useHandleForm({ successNavUrl, url, id, mediaUrls,navigationId }: useHandleFormsInterface): returnData {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitError, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const handleSubmit = useCallback(async (formData: any) => {
//         formData.preventDefault()
//         setIsSubmitting(true);
//         setError(null);

//         const form = new FormData(formData.target)
//         if (mediaUrls?.value) {

//             form.delete(mediaUrls.name)
//         }

//         // to convert any media or list of inputs to  one List
//         const newMeidaForm = await formListCreatorHelper({ form: form, mediaUrls: mediaUrls ?? null })
//         instance.post(url, newMeidaForm, {
//             params: id != '' ? { id: id } : null,
//             withCredentials: false,
            
//         }).then((data) => {
//             if (data.data.token) {
//                 navigate(successNavUrl)
//                 setIsSubmitting(false);
//             } else {
//                 navigationId?navigate(successNavUrl,{state:{navigationId:navigationId}}):navigate(successNavUrl)
//                 setIsSubmitting(false);
//             }

//         }).catch((error: any) => {
//             setError(error.response.data.msg)
//             setIsSubmitting(false);
//             return false
//         })
//     }, [navigate, successNavUrl, url, mediaUrls]);

//     return { isSubmitting, handleSubmit, submitError, };

// }