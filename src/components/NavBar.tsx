import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import logo from "@/assets/images/time-mark-logo.png";
import Image from "next/image";
import styles from "@/styles/NavBar.module.css";

const NavBar = () => {
  const router = useRouter();

  return (
    <Navbar expand="md" collapseOnSelect variant="dark" bg="body" sticky="top">
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex gap-1">
          <Image src={logo} alt="时光印迹 logo" width={30} height={30} />
          <span className={styles.brandText}>时光印迹</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/" active={router.pathname === "/"}>
              首页
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/blog"
              active={router.pathname === "/blog"}
            >
              博客
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link
              href="/blog/new-post"
              className="link-primary d-flex align-items-center gap-1"
            >
              <FiEdit />
              写博客
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
