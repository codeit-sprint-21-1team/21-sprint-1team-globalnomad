import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "./signup.schema";

export function useSignup() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const onSubmit = (data: SignUpValues) => {
    console.log(data);
  };

  return {
    register,
    control,
    errors,
    isValid,
    onFormSubmit: handleSubmit(onSubmit),
  };
}
