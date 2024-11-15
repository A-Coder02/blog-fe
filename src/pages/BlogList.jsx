import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, content, created_at, thumbnail, title")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Blogs
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" mb={3}>
          Blog List
        </Typography>
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                sx={{ cursor: "pointer", height: "100%" }}
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                {blog.thumbnail && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.thumbnail}
                    alt="Blog Thumbnail"
                  />
                )}
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {blog.title}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Created At: {new Date(blog.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default BlogList;
