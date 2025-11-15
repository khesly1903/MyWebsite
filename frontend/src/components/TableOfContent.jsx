import { Box, Typography, List, ListItemButton } from "@mui/material";

export default function TableOfContents({ headings }) {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else{
        console.log("element not found")
        console.log(`id: ${id}`)
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 , fontFamily: "Iceberg, sans-serif",}}>
        Table of Contents
      </Typography>
      <List dense>
        {headings.map((h, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleClick(h.id)}
            sx={{ pl: 2 , fontFamily: "Texturina, serif"}}
          >
            {h.title}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}