import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActions,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ArticleCard({
  title,
  summary,
  image,
  tags,
  type,
  file,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 3 }}
      onClick={() => navigate(`/articles/${type}/${file}`)}
    >
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
          gutterBottom
          sx={{
            fontFamily: "Iceberg, serif",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ fontFamily: "Texturina, serif", fontSize: "1.2rem" }}
        >
          {summary}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "1rem",
          bgcolor: theme.palette.background.custom1,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          gap={1}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          {tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="medium"
              sx={{ fontFamily: "Texturina, serif"}}
              variant="filled"
            />
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
}
