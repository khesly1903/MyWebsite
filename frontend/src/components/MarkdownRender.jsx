import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function extractText(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && children !== null)
    return extractText(children.props?.children);
  return "";
}

export default function MarkdownRender({ content }) {
  return (
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

        h2: ({ ...props }) => {
          const text = extractText(props.children);
          const id = text.toLowerCase().replace(/[^\w]+/g, "-");

          return (
            <Typography
              id={id}
              variant="h4"
              sx={{
                fontFamily: "Iceberg, serif",
                m: "2rem 0 0.5rem 2rem",
                scrollMarginTop: "6rem",
                textDecoration: "underline",
              }}
              {...props}
            />
          );
        },

        h3: (props) => (
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Iceberg, serif",
              m: "1.5rem 0.5rem 0rem 1rem",
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

        hr: () => <Box sx={{ textAlign: "center", m: "1rem" }}>╼ ❖ ❖ ❖ ╾</Box>,

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
        blockquote: ({ children }) => (
          <Box
            component="blockquote"
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              m: "0.7rem 0",
              fontFamily: "Texturina, serif",
              fontSize: "1.2rem",
            }}
          >
            {children}
          </Box>
        ),

        img: ({ src, alt }) => (
          <Box
            sx={{
              width: "100%",
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
  );
}
