import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    customInput: React.CSSProperties;
    mainContent: React.CSSProperties;
    menuCaption: React.CSSProperties;
    subMenuCaption: React.CSSProperties;
    commonAvatar: React.CSSProperties;
    smallAvatar: React.CSSProperties;
    mediumAvatar: React.CSSProperties;
    largeAvatar: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    customInput?: React.CSSProperties;
    mainContent?: React.CSSProperties;
    menuCaption?: React.CSSProperties;
    subMenuCaption?: React.CSSProperties;
    commonAvatar?: React.CSSProperties;
    smallAvatar?: React.CSSProperties;
    mediumAvatar?: React.CSSProperties;
    largeAvatar?: React.CSSProperties;
  }
}

// biar bisa dipakai di <Typography variant="subMenuCaption" />
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    customInput: true;
    mainContent: true;
    menuCaption: true;
    subMenuCaption: true;
    commonAvatar: true;
    smallAvatar: true;
    mediumAvatar: true;
    largeAvatar: true;
  }
}

declare module "@mui/material/styles" {
  // tambahkan numeric shades yang kamu butuhkan (50..900)
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
}

declare module "@mui/material/styles" {
  interface CustomShadows {
    z1: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    primary: string;
    secondary: string;
    orange: string;
    success: string;
    warning: string;
    error: string;
  }

  interface Theme {
    customShadows: CustomShadows;
  }

  interface ThemeOptions {
    customShadows?: Partial<CustomShadows>;
  }
}
