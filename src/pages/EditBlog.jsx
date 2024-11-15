import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { TextField, Button, Box, Typography } from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
const EditBlog = () => {
  const { id } = useParams(); // "new" for a new blog, or an existing blog ID
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (id !== "new") {
      supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data, error }) => {
          if (error) console.error("Error fetching blog:", error.message);
          else {
            setTitle(data.title || "");
            setContent(data.content || "");
            setThumbnail(data.thumbnail || "");
          }
        });
    }
  }, [id]);

  const handleSave = async () => {
    const blogData = { title, content, thumbnail };
    const { error } =
      id === "new"
        ? await supabase.from("blogs").insert([blogData])
        : await supabase.from("blogs").update(blogData).eq("id", id);

    if (error) {
      console.error("Error saving blog:", error.message);
    } else {
      navigate("/admin");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {id === "new" ? "Add New Blog" : "Edit Blog"}
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ margin: "16px 0" }}>
        <CKEditor
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          editor={ClassicEditor}
          config={{
            toolbar: {
              items: ["undo", "redo", "|", "bold", "italic"],
            },
            plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
            licenseKey: "<YOUR_LICENSE_KEY>",
            mention: {
              // Mention configuration
            },
            initialData: "<p>Hello from CKEditor 5 in React!</p>",
          }}
        />
      </Box>
      <TextField
        label="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Blog
        </Button>
      </Box>
    </Box>
  );
};

export default EditBlog;
