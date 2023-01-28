import { Box, Divider, Stack, Typography } from "@mui/material";

const WidgetContainer = ({ title, secondaryChildrens, body, height }) => {
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 5,
        backgroundColor: "white",
        height: height,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={1}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{
              borderRightWidth: 5,
              backgroundColor: "skyblue",
              height: 18,
              borderRadius: 10,
            }}
            flexItem
          />
          <Typography
            sx={{
              color: "GrayText",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Stack>

        {secondaryChildrens}
      </Stack>
      {body}
    </Box>
  );
};

export default WidgetContainer;
