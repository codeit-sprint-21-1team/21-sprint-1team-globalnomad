import { useDebounce } from "@/commons/hooks/useDebounce";
import { useEffect, useMemo } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

export function usePasswordStrength<T extends FieldValues>(
  passwordValue: string | undefined,
  setValue: UseFormSetValue<T>,
) {
  const debouncedPassword = useDebounce(passwordValue || "", 150);

  const calculatePasswordScore = (password: string) => {
    let strength = 0;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (password.length >= 8) strength += 1;
    if (hasLowerCase && hasNumber) strength += 1;
    if (hasSpecial) strength += 1;
    if (password.length >= 12 && hasUpperCase) strength += 1;

    return strength;
  };

  const passwordScore = useMemo(() => {
    if (!debouncedPassword) return 0;
    return calculatePasswordScore(debouncedPassword);
  }, [debouncedPassword]);

  useEffect(() => {
    const scorePath = "passwordScore" as Path<T>;
    setValue(scorePath, passwordScore as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
  }, [passwordScore, setValue]);

  return { passwordScore };
}
