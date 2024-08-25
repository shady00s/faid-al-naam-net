import {instance2} from '@/app/utils/axios';
import formListCreatorHelper from '@/app/utils/formListCreatorHelper';
import { useState, useCallback } from 'react';
 interface useHandleFormsInterface {
    onSuccess?: () => void;
    url: string,
    id: string,
    mediaUrls?: { name: string, value: string[] },
     
 }

interface returnData {
    isSubmitting: boolean;
    handleSubmit: (formData: any) => void;
    submitError: string | null;

}
export default function useHandleForm({ onSuccess, url, id, mediaUrls }: useHandleFormsInterface): returnData {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setError] = useState<string | null>(null);
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
                 setIsSubmitting(false);
            
                onSuccess?.();
        }).catch((error: any) => {
            setError(error.response.data.msg)
             setIsSubmitting(false);
            return false
        })
    }, [ onSuccess, url, mediaUrls]);

    return { isSubmitting, handleSubmit, submitError };

}



