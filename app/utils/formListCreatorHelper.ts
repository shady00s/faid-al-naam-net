import { getBase64 } from "./convert_image";

 
interface FormListCreatorInterface {
  form: FormData;
  mediaUrls: any
}
function keyNumberValidator(text: string): string {
    return text.replace(/[0-9]/g, '');
}

export default async function formListCreatorHelper({
  form,
  mediaUrls
}: FormListCreatorInterface): Promise<FormData> {


  const mergedListForm: Map<string, any[] | any> = new Map();
  if (mediaUrls) {
    for (let index = 0; index < mediaUrls.value.length; index++) {
      form.append(mediaUrls.name, mediaUrls.value[index])
    }
  }
  const entries = Array.from(form.entries());

  entries.forEach(async([key, value]) => {

    let keyWithoutNumber = keyNumberValidator(key)
    if (keyWithoutNumber.search('List') != -1 || keyWithoutNumber.search('Media') != -1) {
      if (value != '') {
        if (mergedListForm.has(keyWithoutNumber)) {
          if (typeof value === "object") {
            const val = await getBase64(value);
            mergedListForm.get(keyWithoutNumber)!.push(val);

          } else {
            mergedListForm.get(keyWithoutNumber)!.push(value);
          }
        } else {
          if (typeof value === "object") {
            const val = await getBase64(value);

            mergedListForm.set(keyWithoutNumber, [val]);

          } else {

            mergedListForm.set(keyWithoutNumber, [value]);
          }
        }
      }
    } else {
      mergedListForm.set(keyWithoutNumber, value);

    }

  })
  const newForm = new FormData()
  mergedListForm.forEach((value, key) => {

    newForm.append(key, typeof value == "object" ? JSON.stringify(value) : value)
  })

  return newForm
}