import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleDetailPage() {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/articles/${fileName}.md`)
      .then((res) => res.text())
      .then((text) => {
        if (text.startsWith("<!doctype html")) {
          throw new Error("404 not found");
        }

        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Markdown dosyası yüklenemedi:", err);
        setContent("# 404\nBu makale bulunamadı.");
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, bgcolor: "transparent", boxShadow: "none" }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: (props) => (
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Iceberg, serif",
                  textAlign: "center",
                  m: "1rem",
                }}
                {...props}
              />
            ),
            h2: (props) => (
              <Typography
                variant="h4"
                sx={{ fontFamily: "Iceberg, serif", ml: "1rem", m: "0.5rem" }}
                {...props}
              />
            ),
            h3: (props) => (
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Iceberg, serif",
                  m: "1rem 0.5rem 0rem 1rem",
                }}
                {...props}
              />
            ),
            p: (props) => (
              <Typography
                variant="body1"
                sx={{ fontFamily: "Texturina, serif", fontSize: "1.2rem" }}
                {...props}
              />
            ),
            code: ({ inline, children, ...props }) =>
              inline ? (
                <Box
                  component="code"
                  sx={{
                    backgroundColor: "#f5f5f51b",
                    borderRadius: "4px",
                    px: "4px",
                    fontFamily: "monospace",
                    color: "#ffb347",
                  }}
                  {...props}
                >
                  {children}
                </Box>
              ) : (
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: "#f5f5f51b",
                    p: 2,
                    borderRadius: 2,
                    fontFamily: "monospace",
                    overflowX: "auto",
                  }}
                  {...props}
                >
                  <code>{children}</code>
                </Box>
              ),
            hr: () => (
              <Box sx={{ textAlign: "center", m: "1rem" }}> ╼ ❖ ❖ ❖ ╾ </Box>
            ),
            li: (props) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  pl: 1,
                }}
              >
                <Box component="span" sx={{ fontSize: "1.2rem" }}>
                  ↳
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "Texturina, serif", fontSize: "1.2rem" }}
                  {...props}
                />
              </Box>
            ),
            img: ({ src, alt }) => (
              <Box
                sx={{
                  width: "100",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={alt}
                  sx={{
                    maxWidth: "100%",
                    borderRadius: 2,
                    my: 2,
                  }}
                />
                {alt && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.1,
                      mb: 1,
                      fontStyle: "italic",
                      fontFamily: "Texturina, serif",
                      color: "text.secondary",
                    }}
                  >
                    {alt}
                  </Typography>
                )}
              </Box>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Paper>
    </Container>
  );
}
