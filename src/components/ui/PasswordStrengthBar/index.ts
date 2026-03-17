import { useDebounce } from "@/commons/hooks/useDebounce";
import { useEffect, useMemo } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import zxcvbn from "zxcvbn";

export function usePasswordStrength<T extends FieldValues>(
  passwordValue: string | undefined,
  setValue: UseFormSetValue<T>,
) {
  const debouncedPassword = useDebounce(passwordValue || "", 150);

  const passwordScore = useMemo(() => {
    if (!debouncedPassword) return 0;
    return debouncedPassword ? zxcvbn(debouncedPassword).score : 0;
  }, [debouncedPassword]);

  useEffect(() => {
    const scorePath = "passwordScore" as Path<T>;
    setValue(scorePath, passwordScore as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
  }, [passwordScore, setValue]);

  return { passwordScore };
}
