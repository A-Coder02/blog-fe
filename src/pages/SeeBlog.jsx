import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import {
  Box,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";

const SeeBlog = () => {
  const { id } = useParams(); // Get blog ID from the route
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("title, content, created_at, thumbnail")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching blog:", error.message);
      } else {
        setBlog(data);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6">Blog not found.</Typography>
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
        <Typography variant="h4" gutterBottom>
          <IconButton sx={{ mr: 2 }}>
            <KeyboardArrowLeft onClick={() => navigate(-1)} />
          </IconButton>
          {blog.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Published on {new Date(blog.created_at).toLocaleString()}
        </Typography>
        {blog.thumbnail && (
          <Box mt={2}>
            <img
              src={blog.thumbnail}
              alt="Blog Thumbnail"
              style={{
                width: "100%",
                borderRadius: "8px",
                aspectRatio: "16/9",
                objectFit: "contain",
                height: "40vh",
                margin: "auto",
              }}
            />
          </Box>
        )}
        <Typography variant="body1" mt={3}>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Typography>
      </Box>
    </>
  );
};

export default SeeBlog;
