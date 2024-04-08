import { FormEvent, SetStateAction } from "react";
import { TodoDto } from "../interfaces/Todo";

export default function TodoForm(props: {
  formData: TodoDto;
  setFormData: React.Dispatch<SetStateAction<TodoDto>>;
  onSubmit: (e: FormEvent) => void;
}) {
  const { formData, setFormData, onSubmit } = props;

  const handleClear = () => {
    setFormData({
      ...formData,
      text: "",
    });
  };
  return (
    <div className="container mb-auto border rounded-xl px-4 pt-4 shadow-lg">
      <form className="container space-y-2 pb-4" onSubmit={onSubmit}>
        <div className="flex justify-start space-x-4">
          <input
              type="text"
              name="title"
              placeholder="Přidat úkol"
              className="focus:outline-none w-full font-medium text-lg"
              value={formData.text}
              onChange={(e) => {
                setFormData({...formData, text: e.target.value});
              }}
              required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
              className="border text-slate-500 rounded-md px-5 py-1"
              onClick={(e) => {
                e.preventDefault();
                handleClear();
              }}>
            Smazat
          </button>
          <button
              className="bg-indigo-600 text-white rounded-md px-5 py-1"
              type="submit">
            Přidat
          </button>
        </div>
      </form>
    </div>
  );
}
