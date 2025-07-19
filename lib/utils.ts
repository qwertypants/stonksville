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

interface Data {
  [key: string]: string;
}
export function getObject(key: string, data?: Data[]): Data | undefined {
  if (!data || data.length === 0) {
    return undefined; // Handle empty or missing data array
  }

  // Assuming you want to search through all objects in the array
  for (const obj of data) {
    if (obj && obj[key]) {
      return obj; // Return the entire object
    }
  }

  return undefined; // Key not found in any object.
}
