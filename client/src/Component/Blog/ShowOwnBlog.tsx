import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Container, Row } from "react-bootstrap";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../Types";

const ShowOwnBlog = () => {
  const allBlogs = useSelector((state: RootState) => state.blogs.blogs);
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const navigate = useNavigate();
  const blogs = allBlogs.filter((blog) => blog.createdBy === userId);
  const handleEdit = (initData: Blog) =>
    navigate("/secure/dashboard/edit-blog", { state: initData });

  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          {blogs.map((blog) => (
            <BlogCard {...{ blog, handleEdit, writable: true }} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ShowOwnBlog;
