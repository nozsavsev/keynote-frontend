import { useEffect, useState } from "react";

const EditLabel = ({ name, value, onChange, regexStr }: { name: string; value: string; onChange: (value: string) => void; regexStr: string }) => {
  const [val, setVal] = useState(value || "");
  const [fieldCorrect, setFieldCorrect] = useState(true);
  useEffect(() => {
    setFieldCorrect(new RegExp(regexStr).exec(val.trim()) ? true : false);
    onChange(val.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regexStr, val, value]);

  return (
    <div className="flex items-center justify-center">
      <input
        className={`rounded-md border px-2 py-1 text-start text-lg outline-offset-2 outline-transparent ${fieldCorrect ? "border-green-600" : "border-red-600"}`}
        value={val}
        placeholder={name}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
    </div>
  );
};
export default EditLabel;
