import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useDialog } from "@/components/ui/Dialog";
import { signInFormSchema, signInValues } from "./login.schema";
import { handleApiError } from "@/commons/utils/handleApiError";
import { postSignIn } from "@/apis/auth.api";

export function useLogin() {
  const { showDialog } = useDialog();
  const router = useRouter();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signinMutation } = useMutation({
    mutationFn: (signinData: Omit<signInValues, "rememberEmail">) =>
      postSignIn(signinData),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      showDialog({
        type: "alert",
        content: errorMessage,
      });
    },
  });

  const onSubmit = (data: signInValues) => {
    const { rememberEmail, ...signinData } = data;
    if (data.rememberEmail) localStorage.setItem("rememberedEmail", data.email);
    else localStorage.removeItem("rememberedEmail");
    signinMutation(signinData);
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
