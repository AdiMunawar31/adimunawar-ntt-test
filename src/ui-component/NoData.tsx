import { Box } from "@mui/system";
import NoData from "../assets/images/icons/no-data.svg";
import AmTypography from "./base/AmTypography";

const NoDataComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingY: 10,
      }}
    >
      <img src={NoData} alt={"noData"} sizes="60" />
      <AmTypography fontSize={"24px"} fontWeight={600}>
        Tidak ada data
      </AmTypography>
    </Box>
  );
};

export default NoDataComponent;
