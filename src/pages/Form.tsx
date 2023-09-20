import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";

import { RouterInputs, api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type CreateTag = RouterInputs["tags"]["create"];

interface FormProps {
  onCreate: () => void;
}

export const Form: React.FC<FormProps> = ({ onCreate }) => {
  const { mutateAsync: createTag } = api.tags.create.useMutation({
    onSuccess: () => {
      onCreate();
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isLoading },
  } = useForm<CreateTag>();
  const tagValues = watch("values");

  return (
    <form onSubmit={handleSubmit((values) => createTag(values))}>
      <div className={styles.form}>
        <Input
          {...register("name", { required: true })}
          placeholder="Enter tag name"
        />
        {errors.name?.message && <span>{errors.name.message}</span>}

        <TagValue
          values={tagValues ?? []}
          onAdd={(value) => setValue("values", [...(tagValues ?? []), value])}
        />

        <Button type="submit" size="lg" disabled={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
};

interface Props {
  values: string[];
  onAdd: (value: string) => void;
}

const TagValue: React.FC<Props> = ({ values, onAdd }) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="flex flex-row">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter tag value"
        />

        <Button
          type="button"
          onClick={() => {
            onAdd(value);
            setValue("");
          }}
          className="ml-2"
        >
          +
        </Button>
      </div>
      <div>{values.join(",")}</div>
    </div>
  );
};
