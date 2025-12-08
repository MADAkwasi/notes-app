import type { ReactElement } from "react";
import InputField from "./InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addNoteFormFields } from "../utils/constants/form";
import type { CreateNoteDTO } from "../utils/interfaces/note.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../utils/schemas/noteForm";
import AppButton from "./Button";

export default function NoteForm(): ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateNoteDTO>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit: SubmitHandler<CreateNoteDTO> = (data: CreateNoteDTO) => {
    const tags = data.tags
      ? (data.tags as unknown as string).split(",").map((tag) => tag.trim())
      : [];
    // data.tags = tags;
    console.log(data, tags);
  };

  return (
    <section className="absolute top-0 left-0 w-full h-full bg-[#0000003f] flex items-center justify-center text-white">
      <form className="w-1/2 shadow-lg" onSubmit={handleSubmit(onSubmit)}>
        <h1>Add A Note</h1>

        {addNoteFormFields.map(({ id, placeholder, fieldName }) => (
          <InputField<CreateNoteDTO>
            key={id}
            placeholder={placeholder}
            fieldName={fieldName}
            register={register}
            errors={errors}
          />
        ))}

        <AppButton
          variant="secondary"
          title="Submit"
          //   disabled={isLoading}
          type="submit"
        >
          {/* {isLoading ? <FiLoader className="animate-spin" /> : "Submit"} */}
          Submit
        </AppButton>
      </form>
    </section>
  );
}
