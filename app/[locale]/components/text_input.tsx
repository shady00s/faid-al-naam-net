import { useEffect, useState } from "react";

export interface inputTextInterface {
  placeholder: string;
  type: string;
  required: boolean;
  name: string;
  value: string;
  disabled?: boolean;
  direction?: string;
  onChange?: (text: any) => void;
  id: string | null;
}
function InputTextComponent({
  placeholder,
  id,
  value,
  disabled,
  type,
  direction,
  required,
  name,

  onChange,
}: inputTextInterface) {
  const [val, setVal] = useState("");
  useEffect(() => {
    setVal(() => value);
  }, [value]);
  return (
    <>
      <div className="w-full">
        <label className={`mx-4 ${type == 'date'? "text-black":"text-transparent"}`} htmlFor={id ?? name}>{ placeholder}</label>
        <input
        dir={direction}
          autoComplete="off"
          disabled={disabled}
          value={val}
          id={id ?? name}
          onChange={(c) => {
            setVal(c.target.value);
            if (onChange) {
              onChange(c.target.value);
            }
          }}
          name={name}
          required={required}
          placeholder={placeholder}
          type={type}
          className="mx-1 mt-2  p-2 w-full border-2 text-sm rounded-md border-b-blue-400"
        />
      </div>
    </>
  );
}

function InputTextAreaComponent({
  placeholder,
  value,
  direction,
  required,
  disabled,
  name,
}: inputTextInterface) {
  const [val, setVal] = useState(value);
  return (
    <>
      <textarea
        dir={direction}
        disabled={disabled}
        id={name}
        onChange={(c) => {
          setVal(c.target.value);
        }}
        rows={4}
        name={name}
        value={val}
        required={required}
        placeholder={placeholder}
        className="m-1 p-2 w-full border-2 rounded-md text-sm border-b-blue-400"
      />
    </>
  );
}

export { InputTextComponent, InputTextAreaComponent };
