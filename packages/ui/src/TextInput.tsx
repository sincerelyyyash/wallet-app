"use client"

export const TextInput = ({
  placeholder,
  onChange,
  label
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  return <div className="pt-2">
    <label className="block mb-2 text-sm font-medium text-black">{label}</label>
    <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className="bg-white border border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
  </div>
}
