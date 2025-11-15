import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

export function ArticleBreadcrumbs({articleType}) {
  const { fileName } = useParams();

  // Dosya adını düzgün gösterelim
  const title =
    fileName
      ?.replace(/-/g, " ") // tireleri boşluk yap
      ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Article";

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ fontFamily: "Texturina, serif", mb: 2 }}
    >
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Home
      </Link>
      <Link
      sx={{fontFamily: "Texturina, serif"}}
        underline="hover"
        color="inherit"
        component={RouterLink}
        to={`/articles/${articleType.toLowerCase()}`}
      >
        {articleType}
      </Link>
      <Typography color="text.primary" sx={{fontFamily: "Texturina, serif"}}>{title}</Typography>
    </Breadcrumbs>
  );
}
