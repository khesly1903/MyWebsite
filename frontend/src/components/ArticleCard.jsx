import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActions,
  useTheme,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getReadingTime } from "../utils/getReadingTime";

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
  const [timeToRead, setTimeToRead] = useState(null);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        const response = await fetch(`/articles/${file}.md`);
        const text = await response.text();

        console.log(text);
        const readTime = getReadingTime(text);
        setTimeToRead(readTime);
      } catch (error) {
        console.error("Markdown error:", error);
      }
    }
    fetchMarkdown();
  }, [type, file]);

  return (
    <Card
      sx={{ maxWidth: "27rem", borderRadius: 3 }}
      onClick={() => navigate(`/articles/${type}/${file}`)}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Box
          sx={{ textAlign: "center", mb: 1, fontFamily: "Texturina, serif" }}
        >
          {timeToRead || "Calculating..."}
        </Box>
        <Divider />
        <Typography
          gutterBottom
          sx={{
            fontFamily: "Iceberg, serif",
            textAlign: "center",
            fontSize: "1.5rem",
            mt:"10px"
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
              sx={{ fontFamily: "Texturina, serif" }}
              variant="filled"
            />
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
}
