import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  CardContent,
  Typography,
  CardMedia,
  styled,
  Card,
  Grid,
  Chip,
  Box,
} from "@material-ui/core";

import { sketches } from "constants/sketches";

const SketchCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[12],
  },
}));

const ThumbnailImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: theme.palette.grey[200],
}));

const ThumbnailFallback = styled(Box)(({ theme }) => ({
  height: 200,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  fontSize: "2rem",
  fontWeight: "bold",
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.25),
  fontSize: "0.75rem",
}));

// Component for handling thumbnail with fallback
const SketchThumbnail = ({ sketch }: { sketch: any }) => {
  const [imageError, setImageError] = useState(false);
  const thumbnailPath = `/thumbnails/${sketch.slug}.png`;

  if (imageError) {
    return (
      <ThumbnailFallback>
        {sketch.name
          .split(" ")
          .map((word: string) => word[0])
          .join("")}
      </ThumbnailFallback>
    );
  }

  return (
    <CardMedia
      component="img"
      height="200"
      image={thumbnailPath}
      title={sketch.name}
      onError={() => setImageError(true)}
      style={{ objectFit: "cover" }}
    />
  );
};

// Enhanced home page with grid layout
export const Home = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      padding={3}
      style={{
        overflowY: "auto",
      }}
    >
      <Box marginBottom={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generative Art Gallery
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sketches.map((sketch, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={sketch.slug} style={{ textDecoration: "none" }}>
              <SketchCard>
                <SketchThumbnail sketch={sketch} />

                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {sketch.name}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" paragraph>
                    {sketch.dateCompleted.toLocaleDateString()}
                  </Typography>

                  {sketch.tags && (
                    <Box>
                      {sketch.tags.map((tag, tagIndex) => (
                        <TagChip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </SketchCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
