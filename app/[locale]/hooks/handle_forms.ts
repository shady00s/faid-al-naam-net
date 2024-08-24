import {instance2} from '@/app/utils/axios';
import formListCreatorHelper from '@/app/utils/formListCreatorHelper';
import { useState, useCallback } from 'react';
 interface useHandleFormsInterface {
    successNavUrl: string,
    url: string,
    id: string,
    mediaUrls?: { name: string, value: string[] },
 }

interface returnData {
    isSubmitting: boolean;
    handleSubmit: (formData: any) => void;
    submitError: string | null;
    canNavigate:boolean

}
export default function useHandleForm({ successNavUrl, url, id, mediaUrls }: useHandleFormsInterface): returnData {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setError] = useState<string | null>(null);
    const [canNavigate,setCanNavigate] = useState<boolean>(false)
    const handleSubmit = useCallback(async (formData: any) => {
        formData.preventDefault()
        setIsSubmitting(true);
        setError(null);

        const form = new FormData(formData.target)
        if (mediaUrls?.value) {

            form.delete(mediaUrls.name)
        }

        // to convert any media or list of inputs to  one List
        const newMeidaForm = await formListCreatorHelper({ form: form, mediaUrls: mediaUrls ?? null })
        instance2.post(url, newMeidaForm, {
            params: id != '' ? { id: id } : null,
            withCredentials: false,
            
        }).then((data) => {
                setCanNavigate(true)
                setIsSubmitting(false);
            

        }).catch((error: any) => {
            setError(error.response.data.msg)
            setCanNavigate(true)
            setIsSubmitting(false);
            return false
        })
    }, [ successNavUrl, url, mediaUrls]);

    return { isSubmitting, handleSubmit, submitError,canNavigate };

}