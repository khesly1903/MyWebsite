import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  CssBaseline,
  useScrollTrigger,
} from "@mui/material";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import ScrollToTop from "./ScrollToTop";
import ScrollHint from "./ScrollHint";
import { getHeadings } from "../utils/getHeadings";
import MarkdownRender from "./MarkdownRender";
import TableOfContents from "./TableOfContent";
import { ArticleBreadcrumbs } from "./ArticleBreadcrumbs";

export default function ArticleDetailPage({ articleType }) {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState("");

  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 50,
  });

  useEffect(() => {
    fetch(`/articles/${fileName}.md`)
      .then((res) => res.text())
      .then((text) => {
        if (text.startsWith("<!doctype html")) {
          throw new Error("404 not found");
        }
        setContent(text);
        const contentHeadings = getHeadings(text);
        setHeadings(contentHeadings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Markdown file failed to load: ", err);
        setContent("# 404\nArticle not found");
        setLoading(false);
      });
  }, [fileName]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        mt: "5rem",
        // border: "1px solid blue",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ScrollHint />
      <ScrollToTop />

      <Grid size={{ xs: 12, md: 3, lg: 3 }} sx={{ p: "1rem" }}>
        <Box
          sx={{
            position: "sticky",
            pt: "1rem",
            overflowY: "auto",
            top: trigger ? 0 : "4rem",
            transition: "top 0.4s ease-in-out",
          }}
        >
          <ArticleBreadcrumbs articleType={articleType} />
          <TableOfContents headings={headings} />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 7, lg: 6 }} sx={{}}>
        <Paper sx={{ bgcolor: "transparent", boxShadow: "none", p:"1rem" }}>
          <MarkdownRender content={content} />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 2, lg: 3 }} sx={{}}>
        <Box sx={{ width: "100%" }}></Box>
      </Grid>
    </Grid>
  );
}
