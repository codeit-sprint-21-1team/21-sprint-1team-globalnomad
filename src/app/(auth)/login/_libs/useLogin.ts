import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema, signInValues } from "./login.schema";
import { useEffect } from "react";

export function useLogin() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: signInValues) => {
    console.log(data);
    if (data.rememberEmail) localStorage.setItem("rememberedEmail", data.email);
    else localStorage.removeItem("rememberedEmail");
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberEmail", true);
    }
  }, [setValue]);

  return {
    register,
    control,
    errors,
    isValid,
    touchedFields,
    onFormSubmit: handleSubmit(onSubmit),
  };
}
