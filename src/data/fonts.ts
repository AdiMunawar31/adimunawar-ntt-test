export interface FontOption {
  id: string;
  value: string;
  label: string;
}

export const fonts: FontOption[] = [
  {
    id: "inter",
    value: "'Inter', sans-serif",
    label: "Inter",
  },
  {
    id: "poppins",
    value: "'Poppins', sans-serif",
    label: "Poppins",
  },
  {
    id: "roboto",
    value: "'Roboto', sans-serif",
    label: "Roboto",
  },
];
