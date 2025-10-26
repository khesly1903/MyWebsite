import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

export default function ArticleCard({ title, summary, image, tags }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      {/* Üst görsel */}
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />

      {/* İçerik */}
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontFamily: "Texturina, serif", textAlign: "center" }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Almendra, serif" }}
        >
          {summary}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 2,
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {tags?.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}