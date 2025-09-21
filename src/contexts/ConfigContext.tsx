import { createContext, type ReactNode } from "react";
import defaultConfig from "../config";
import type { ConfigState } from "../interfaces/config";
import useLocalStorage from "../hooks/useLocalStorage";

// initial state
const initialState: ConfigState = {
  ...defaultConfig,
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onReset: () => {},
};

export const ConfigContext = createContext<ConfigState>(initialState);

interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage("am-config-ntt-test", {
    ...defaultConfig,
  });

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({
      ...config,
      fontFamily,
    });
  };

  const onChangeBorderRadius = (_event: Event, newValue: number) => {
    setConfig({
      ...config,
      borderRadius: newValue,
    });
  };

  const onReset = () => {
    setConfig({ ...defaultConfig });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeFontFamily,
        onChangeBorderRadius,
        onReset,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
