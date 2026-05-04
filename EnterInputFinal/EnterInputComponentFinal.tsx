import * as React from "react";
import { TextField, PrimaryButton } from "@fluentui/react";

export interface IEnterInputProps {
  value: string;
  onChange: (v: string) => void;
  onEnter: (v: string) => void;
  width: number;
  height: number;
}

export const EnterInputComponentFinal: React.FC<IEnterInputProps> = ({
  value,
  onChange,
  onEnter,
  width,
  height
}) => {

  const handleSubmit = () => {
    if (!value.trim()) return;
    onEnter(value);
    onChange("");
  };

  const controlHeight = height ?? 44;
  const controlWidth = width ?? "100%";

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        width: controlWidth,
        alignItems: "center"
      }}
    >
    <TextField
      value={value}
      onChange={(e, newValue: string | undefined) => onChange(newValue ?? "")}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSubmit();
      }}
      styles={{
        root: { flexGrow: 1 },
        fieldGroup: {
          // height: controlHeight,
          height: 30,
          borderRadius: 9999,
          border: "1px solid #ccc"
        },
        field: {
          paddingLeft: 12,
          paddingRight: 12
        }
      }}
    />


      <PrimaryButton
        text="CHECK-IN"
        onClick={handleSubmit}
        styles={{
          root: {
            height: 30,
            borderRadius: 9999,
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: 600
          }
        }}
      />
    </div>
  );
};
