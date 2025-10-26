import React from "react";
import ArticleCard from "../components/ArticleCard";
import { Grid } from "@mui/material";

export default function ArticlesPage() {
  return (
    <Grid container spacing={3} sx={{ margin: "1rem", justifyContent:"center", alignItems:"center" }}>
      <Grid item xs={12} sm={6} md={4}>
        <ArticleCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ArticleCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ArticleCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ArticleCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ArticleCard />
      </Grid>
    </Grid>
  );
}
