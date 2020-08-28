import { FlexColumn } from "components/StyledUI";
import { sketches } from "constants/sketches";
import { styled, Box, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const SketchLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  padding: theme.spacing(0.2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  transition: "0.3s",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

// temp style
export const Home = () => (
  <Box width="100%" padding={2}>
    <Card>
      <FlexColumn>
        {sketches.map((sketch, index) => (
          <SketchLink key={index} to={sketch.slug}>
            {sketch.name}
          </SketchLink>
        ))}
      </FlexColumn>
    </Card>
  </Box>
);
