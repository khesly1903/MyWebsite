import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ScrollHint() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50); // 50px üzerindeyse gizle
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "1rem",
        right: "1.5rem",
        color: "text.secondary",
        opacity: showScrollHint ? 1 : 0,
        transform: showScrollHint ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        animation: "bounce 2s infinite",
        "@keyframes bounce": {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-8px)" },
          "60%": { transform: "translateY(-4px)" },
        },
      }}
    >
      <KeyboardArrowDownIcon fontSize="large" />
    </Box>
  );
}