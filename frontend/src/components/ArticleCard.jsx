import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip
} from "@mui/material";

export default function ArticleCard() {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      {/* Üstte görsel */}
      <CardMedia
        component="img"
        height="180"
        image="https://picsum.photos/200"
        alt="Elliptic Curve Cryptography"
      />

      {/* İçerik kısmı */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Understanding Elliptic Curves
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
          dolore aspernatur possimus asperiores distinctio dignissimos
          perferendis enim consectetur obcaecati! Fugiat dolore deleniti
          corporis earum at eum fugit eos, repellat animi?
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" , display:"flex", justifyContent:"center"}}>
          <Chip label={"keyword"} size="small" variant="outlined" />
          <Chip label={"keyword"} size="small" variant="outlined" />
          <Chip label={"keyword"} size="small" variant="outlined" />
        </Stack>
      </CardContent>

      {/* Alt buton kısmı
      <CardActions>
        <Button size="small" color="primary">
          Read More
        </Button>
        <Button size="small" color="secondary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
}
