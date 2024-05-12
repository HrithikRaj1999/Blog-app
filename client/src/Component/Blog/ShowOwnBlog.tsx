import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Container, Row } from "react-bootstrap";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../Types";
import { useState } from "react";
import BlogModal from "./BlogModal";

const ShowOwnBlog = () => {
  const allBlogs = useSelector((state: RootState) => state.blogs.blogs);
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const navigate = useNavigate();
  const blogs = allBlogs.filter((blog) => blog.createdBy === userId);
  const [viewedBlog, setViewedBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (blog: Blog) => {
    setViewedBlog(blog);
    setShowModal(true);
  };
  const handleEdit = (initData: Blog) =>
    navigate("/secure/dashboard/user/edit-blog", { state: initData });
  if (!blogs.length)
    return (
      <Container>
        <h1>No Blogs Found Please create one</h1>
      </Container>
    );
  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              {...{ blog, handleEdit, writable: true, handleView }}
            />
          ))}
        </Row>
        <BlogModal
          show={showModal}
          onHide={() => setShowModal(false)}
          blog={viewedBlog}
        />
      </Container>
    </>
  );
};

export default ShowOwnBlog;
