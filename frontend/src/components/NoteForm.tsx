import { type ReactElement } from "react";
import InputField from "./InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { addNoteFormFields } from "../utils/constants/form";
import type {
  CreateNoteDTO,
  CreateNoteFormInput,
} from "../utils/interfaces/note.interface";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../utils/schemas/noteForm";
import AppButton from "./Button";
import { useUIInteractions } from "../utils/hooks/useInteraction";
import { useRequest } from "../utils/hooks/useRequest";
import { postNoteRequest } from "../core/api/note.service";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

export default function NoteForm(): ReactElement {
  const { closeNoteForm } = useUIInteractions();
  const { execute: postNote, isLoading, error } = useRequest(postNoteRequest);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateNoteFormInput>({
    resolver: zodResolver(noteSchema),
  });

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modal = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 },
  };

  const handleFormClose = () => {
    reset();
    closeNoteForm();
  };

  const onSubmit: SubmitHandler<CreateNoteFormInput> = async (data) => {
    const payload: CreateNoteDTO = {
      ...data,
      tags: data.tags?.split(",").map((t) => t.trim()),
    };

    const res = await postNote(payload);

    if (res?.status === 201) {
      toast.success("Note added successfully!");
      handleFormClose();
    }
    if (error) toast.error(error);
  };

  return (
    <AnimatePresence>
      <motion.section
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={closeNoteForm}
        className="absolute top-0 left-0 w-full h-full bg-[#00000094] flex items-center justify-center text-white"
      >
        <motion.form
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full md:h-auto md:w-3/4 lg:w-1/2 relative justify-center shadow-lg bg-[#1c1c1c] px-6 py-8 flex flex-col gap-4 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AppButton
            variant="tertiary"
            className="w-fit! p-0! ml-auto md:static absolute top-6 right-4"
            onClick={handleFormClose}
          >
            <IoClose className="text-white text-2xl" />
          </AppButton>
          <h1 className="text-2xl font-bold text-white text-center">
            Add A Note
          </h1>

          {addNoteFormFields.map(({ id, placeholder, fieldName }) => (
            <InputField<CreateNoteFormInput>
              key={id}
              placeholder={placeholder}
              fieldName={fieldName}
              register={register}
              errors={errors}
              isTextArea={fieldName === "content"}
            />
          ))}

          <AppButton
            variant="secondary"
            title="Submit"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <FiLoader className="animate-spin" /> : "Submit"}
          </AppButton>
        </motion.form>
      </motion.section>
    </AnimatePresence>
  );
}
