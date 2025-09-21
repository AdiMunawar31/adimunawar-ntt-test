export interface ConfigState {
  fontFamily: string;
  borderRadius: number;
  mode: "light" | "dark";
  outlinedFilled: boolean;
  presetColor: string;
  miniDrawer: boolean;

  onChangeFontFamily: (fontFamily: string) => void;
  onChangeBorderRadius: (_event: Event, newValue: number) => void;
  onReset: () => void;
}
