import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";

function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        <Button
          variant="outlined"
          sx={{
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            minWidth: "3rem",
            padding: 0,
            color: "text.secondary",
            borderColor:"text.secondary"
          }}
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Button>
      </Box>
    </Fade>
  );
}

ScrollToTop.propTypes = {};

export default ScrollToTop;
