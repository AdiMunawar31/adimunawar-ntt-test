// material-ui
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// project imports
import SubCard from "../../ui-component/cards/SubCard";
import MainCard from "../../ui-component/cards/MainCard";
import SecondaryAction from "../../ui-component/cards/CardSecondaryAction";
import { gridSpacing } from "../../configs/constant";

// ===============================|| SHADOW BOX ||=============================== //

interface ShadowBoxProps {
  shadow: string;
}

function ShadowBox({ shadow }: ShadowBoxProps) {
  return (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4.5,
          bgcolor: "primary.light",
          color: "grey.800",
        }}
      >
        <Box sx={{ color: "inherit" }}>boxShadow: {shadow}</Box>
      </Box>
    </Card>
  );
}

// ===============================|| CUSTOM SHADOW BOX ||=============================== //

interface CustomShadowBoxProps {
  shadow: string;
  label?: string;
  color: string;
}

function CustomShadowBox({ shadow, label, color }: CustomShadowBoxProps) {
  return (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          bgcolor: color,
          color: "background.default",
        }}
      >
        {!label && <Box sx={{ color: "inherit" }}>boxShadow: {shadow}</Box>}
        {label && <Box sx={{ color: "inherit" }}>{label}</Box>}
      </Box>
    </Card>
  );
}

// ============================|| UTILITIES SHADOW ||============================ //

export default function UtilitiesShadow() {
  const theme = useTheme() as any; // kalau theme di-extend customShadows, cast ke any atau extend Theme type

  return (
    <MainCard
      title="Basic Shadow"
      secondary={
        <SecondaryAction link="https://next.material-ui.com/system/shadows/" />
      }
    >
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <SubCard title="Basic Shadow">
            <Grid container spacing={gridSpacing}>
              {Array.from({ length: 25 }).map((_, idx) => (
                <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ShadowBox shadow={idx.toString()} />
                </Grid>
              ))}
            </Grid>
          </SubCard>
        </Grid>

        <Grid size={12}>
          <SubCard title="Color Shadow">
            <Grid container spacing={gridSpacing}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomShadowBox
                  color="primary.main"
                  shadow={theme.customShadows?.primary}
                  label="primary"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomShadowBox
                  color="secondary.main"
                  shadow={theme.customShadows?.secondary}
                  label="secondary"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomShadowBox
                  color="orange.main"
                  shadow={theme.customShadows?.orange}
                  label="orange"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomShadowBox
                  color="success.main"
                  shadow={theme.customShadows?.success}
                  label="success"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomShadowBox
                  color="warning.main"
                  shadow={theme.customShadows?.warning}
                  label="warning"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CustomShadowBox
                  color="error.main"
                  shadow={theme.customShadows?.error}
                  label="error"
                />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}
