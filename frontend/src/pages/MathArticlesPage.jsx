import React from "react";
import { Box } from "@mui/material";
import { Masonry } from "@mui/lab";
// import mathArticles from "../data.json";
import ArticleCard from "../components/ArticleCard";

export default function MathArticlesPage() {
  // const articles = mathArticles["mathematics"];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        p: "2rem 0",
        fontFamily: "Iceberg, serif",
        textAlign: "center",
        fontSize:"2rem"
      }}
    >
      I am currently woring on it
      {/* <Masonry
        columns={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
        sx={{
          maxWidth: 1100,
          width: "100%", 
        }}
      >
        {articles.map((article, index) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ArticleCard
              key={index}
              title={article.title}
              summary={article.summary}
              image={article.image}
              tags={article.tags} 
              type={"mathematics"}
              file={article.file}
            />
          </Box>
        ))}
      </Masonry> */}
    </Box>
  );
}
