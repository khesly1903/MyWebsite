import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ScrollHint: React.FC = () => {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "5rem",
        left: "50%",
        transform: showScrollHint ? "translate(-50%, 0)" : "translate(-50%, 20px)",
        color: "primary.main",
        opacity: showScrollHint ? 1 : 0,
        pointerEvents: showScrollHint ? 'auto' : 'none',
        transition: "opacity 0.8s ease, transform 0.8s ease",
        animation: "bounce 2s infinite",
        "@keyframes bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translate(-50%, 0)" },
          "40%": { transform: "translate(-50%, -8px)" },
          "60%": { transform: "translate(-50%, -4px)" },
        },
      }}

    >
      <KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} />
    </Box>
  );
};

export default ScrollHint;