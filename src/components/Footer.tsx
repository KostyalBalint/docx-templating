import { Box, Typography } from "@mui/material";
import { FaHeart } from "react-icons/fa6";
import { grey, red } from "@mui/material/colors";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: grey[500],
        color: "white",
        height: 40,
        mt: "auto", // This pushes the footer to the bottom
        py: 2,
        width: "100%",
      }}
    >
      <Typography variant="h6">
        Made with <FaHeart color={red[600]} /> by: Bálint Kostyál
      </Typography>
    </Box>
  );
};
