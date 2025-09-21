import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        pt: 3,
        mt: "auto",
      }}
    >
      <Typography variant="caption">&copy; Adi Munawar - NTT Test</Typography>
      <Stack
        direction="row"
        sx={{ gap: 1.5, alignItems: "center", justifyContent: "space-between" }}
      >
        <Link
          component={RouterLink}
          to="https://www.linkedin.com/in/adi-munawar-2359601b2/"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          LinkedIn
        </Link>
      </Stack>
    </Stack>
  );
}
