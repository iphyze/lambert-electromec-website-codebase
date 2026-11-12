"use client";

import { ChevronDown } from "lucide-react";
import styles from "./AppSelect.module.css";

export default function AppSelect({
  value = "",
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  ariaLabel,
  name,
  className = "",
}) {
  return (
    <div className={`${styles.wrap} ${disabled ? styles.disabled : ""} ${className}`.trim()}>
      <select
        name={name}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        aria-label={ariaLabel || placeholder}
      >
        {!options.some((option) => String(option.value ?? "") === "") ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={`${option.value}-${option.label}`} value={String(option.value ?? "")}>{option.label}</option>
        ))}
      </select>
      <ChevronDown size={15} aria-hidden="true" />
    </div>
  );
}
