import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(clsx(classes));
}

export function objectToArray(obj: { [key: string]: string }): string[] {
  const arr: string[] = [];

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      // Ensure we only iterate over own properties
      arr.push(`${key} ${obj[key]}`);
    }
  }

  return arr;
}
