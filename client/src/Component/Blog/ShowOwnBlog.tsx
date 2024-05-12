import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Container, Row } from "react-bootstrap";
import BlogCard from "./BlogCard";

const ShowOwnBlog = () => {
  const allBlogs = useSelector((state: RootState) => state.blogs.blogs);
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const blogs = allBlogs.filter((blog) => blog.createdBy === userId);
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        {blogs.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </Row>
    </Container>
  );
};

export default ShowOwnBlog;
