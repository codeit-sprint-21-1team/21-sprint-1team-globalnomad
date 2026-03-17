import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInValues } from "./login.schema";

export function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: signInValues) => {
    console.log(data);
  };

  return {
    register,
    errors,
    isValid,
    touchedFields,
    onFormSubmit: handleSubmit(onSubmit),
  };
}
