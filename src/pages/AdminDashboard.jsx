import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) {
      console.error("Error fetching blogs:", error.message);
    } else {
      setBlogs(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      console.error("Error deleting blog:", error.message);
    } else {
      fetchBlogs(); // Refresh the list
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box display="flex" justifyContent={"space-between"}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/edit-blog/new"
        >
          Add New Blog
        </Button>

        <Logout />
      </Box>

      <TableContainer sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.thumbnail}</TableCell>
                <TableCell>
                  {new Date(blog.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/edit-blog/${blog.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;
