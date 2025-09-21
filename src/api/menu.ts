import useSWR, { mutate } from "swr";
import { useMemo } from "react";

// ==============================|| TYPES ||============================== //

export interface MenuMaster {
  openedItem: string | null;
  openedComponent: string | null;
  openedHorizontalItem: string | null;
  isDashboardDrawerOpened: boolean;
  isComponentDrawerOpened: boolean;
}

// ==============================|| INITIAL STATE ||============================== //

const initialState: MenuMaster = {
  openedItem: "dashboard",
  openedComponent: "buttons",
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true,
};

// ==============================|| ENDPOINTS ||============================== //

export const endpoints = {
  key: "api/menu",
  master: "master",
  dashboard: "/dashboard",
};

// ==============================|| HOOK: GET MENU MASTER ||============================== //

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR<MenuMaster>(
    endpoints.key + endpoints.master,
    () => initialState,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data ?? initialState,
      menuMasterLoading: isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

// ==============================|| HANDLERS ||============================== //

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  mutate<MenuMaster>(
    endpoints.key + endpoints.master,
    (currentMenuMaster?: MenuMaster) => {
      return {
        ...(currentMenuMaster ?? initialState),
        isDashboardDrawerOpened,
      };
    },
    false
  );
}

export function handlerActiveItem(openedItem: string) {
  mutate<MenuMaster>(
    endpoints.key + endpoints.master,
    (currentMenuMaster?: MenuMaster) => {
      return {
        ...(currentMenuMaster ?? initialState),
        openedItem,
      };
    },
    false
  );
}
