import React from "react";
import { Box, Typography } from "@mui/material";

const AboutMe = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to my blog! I am a passionate developer with experience in
        building web applications. In this blog, I share my thoughts,
        experiences, and technical insights on various topics. Stay tuned for
        more updates!
      </Typography>
      <Typography variant="body1" paragraph>
        Feel free to reach out to me for collaboration or if you have any
        questions. I'm always happy to connect with like-minded individuals.
      </Typography>
    </Box>
  );
};

export default AboutMe;
