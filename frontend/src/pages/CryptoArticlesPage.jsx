import React from "react";
import { Box, Chip, Divider, Stack } from "@mui/material";
import { Masonry } from "@mui/lab";
import cryptoArticles from "../data.json";
import ArticleCard from "../components/ArticleCard";
import ScrollToTop from "../components/ScrollToTop";
import ScrollHint from "../components/ScrollHint";

export default function CryptoArticlesPage() {
  const articles = cryptoArticles["cryptography"];
  // const topics = [
  //   "All",
  //   "Classical Cryptography",
  //   "Modern Cryptography",
  //   "Quantum Cryptography",
  //   "Cryptosystem",
  //   "Key-Exchange",
  //   "Hashing",
  // ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: "6rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Stack
          direction="row"
          gap={"0.5rem"}
          sx={{
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "0rem 1rem",
          }}
        >
          {topics.map((topic, index) => (
            <Chip
              key={index}
              label={topic}
              variant="outlined"
              clickable
              sx={{ fontFamily: "Texturina, serif", fontSize: "1rem" }}
            />
          ))}
        </Stack> */}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          p: "2rem 1rem",
        }}
      >
        <ScrollHint />
        <ScrollToTop />

        <Masonry
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
                type={"cryptography"}
                file={article.file}
              />
            </Box>
          ))}
        </Masonry>
      </Box>
    </>
  );
}
