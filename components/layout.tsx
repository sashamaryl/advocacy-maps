import Head from "next/head"
import { useEffect, useState } from "react"
import Image from "react-bootstrap/Image"
import { useMediaQuery } from "usehooks-ts"
import PageFooter from "./Footer/Footer"
import { NavLink } from "./Navlink"
import ProfileLink from "./ProfileLink/ProfileLink"
import { SignInWithButton, signOutAndRedirectToHome, useAuth } from "./auth"
import AuthModal from "./auth/AuthModal"
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "./bootstrap"
import { useProfile } from "./db"

export type LayoutProps = {
  title?: string
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  title
}) => {
  const { authenticated, user } = useAuth()

  return (
    <>
      <Head>
        <title>{`${
          title ? title + " | " : ""
        }MAPLE: The Massachusetts Platform for Legislative Engagement`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"h-100 d-flex flex-column "}>
        <TopNav />
        <AuthModal />
        <div className={"flex-grow-1 flex-shrink-1"}>{children}</div>
        <PageFooter
          authenticated={authenticated}
          user={user as any}
          signOut={signOutAndRedirectToHome}
        />
      </div>
    </>
  )
}

export const TopNav: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { authenticated, claims } = useAuth()
  const { profile } = useProfile()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sticky, setSticky] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleNav = () => setIsExpanded(!isExpanded)
  const closeNav = () => setIsExpanded(false)

  useEffect(() => setSticky(isMobile), [isMobile])

  return (
    <Navbar
      bg="secondary"
      variant="dark"
      sticky={sticky ? "top" : undefined}
      expand={false}
      expanded={isExpanded}
      data-bs-theme="dark"
    >
      <Container fluid>
        <Row
          className={
            "d-flex flex-row align-items-start justify-content-between col-12"
          }
        >
          <Col
            xs={4}
            className={"d-flex justify-content-start align-items-start"}
          >
            <Navbar expand={false} expanded={isExpanded}>
              <Navbar.Brand>
                <Navbar.Toggle aria-controls="topnav" onClick={toggleNav} />
              </Navbar.Brand>
              <Navbar.Collapse id="topnav">
                <Nav className="me-auto">
                  <NavLink
                    className={"fw-bold"}
                    href="/"
                    handleClick={closeNav}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={"fw-bold"}
                    href="/bills"
                    handleClick={closeNav}
                  >
                    Browse Bills
                  </NavLink>
                  <NavLink
                    className={"fw-bold"}
                    href="/testimony"
                    handleClick={closeNav}
                  >
                    Browse Testimony
                  </NavLink>

                  <NavDropdown className={"fw-bold"} title={"Learn"}>
                    <NavDropdown.Item>
                      <NavLink
                        href="/learn/basics-of-testimony"
                        handleClick={closeNav}
                      >
                        Learn About Testimony
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        href="/learn/communicating-with-legislators"
                        handleClick={closeNav}
                      >
                        Communicating with Legislators
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        href="/learn/additional-resources"
                        handleClick={closeNav}
                      >
                        Additional Resources
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown className={"fw-bold"} title={"About"}>
                    <NavDropdown.Item>
                      <NavLink href="/about/faq-page" handleClick={closeNav}>
                        FAQ
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        href="/about/mission-and-goals"
                        handleClick={closeNav}
                      >
                        Our Mission &amp; Goals
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink href="/about/our-team" handleClick={closeNav}>
                        Our Team
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        href="/about/support-maple"
                        handleClick={closeNav}
                      >
                        How to Support MAPLE
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink href="/policies" handleClick={closeNav}>
                        Privacy Policy & Code of Conduct
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown className={"fw-bold"} title={"Why Use MAPLE"}>
                    <NavDropdown.Item>
                      <NavLink
                        href="/why-use-maple/for-individuals"
                        handleClick={closeNav}
                      >
                        For Individuals
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        href="/why-use-maple/for-orgs"
                        handleClick={closeNav}
                      >
                        For Organizations
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        href="/why-use-maple/for-legislators"
                        handleClick={closeNav}
                      >
                        For Legislators
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>

                  {authenticated && (
                    <NavLink
                      className={"fw-bold"}
                      handleClick={() => {
                        closeNav()
                        void signOutAndRedirectToHome()
                      }}
                    >
                      Sign Out
                    </NavLink>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col xs={4}>
            <Nav.Link href="/" className="py-0 px-2 w-100">
              {sticky ? (
                <Image
                  src="/white-tree.svg"
                  alt="logo"
                  className="w-100"
                ></Image>
              ) : (
                <Image src="/nav-logo.svg" alt="logo"></Image>
              )}
            </Nav.Link>
          </Col>
          <Col
            xs={4}
            className={`d-flex justify-content-end align-items-start`}
          >
            <ProfileLink
              role={claims?.role}
              fullName={profile?.fullName}
              sticky={sticky}
            />
          </Col>
        </Row>
      </Container>

      {sticky && !authenticated ? (
        <SignInWithButton className={"w-100 pt-2"} />
      ) : null}
    </Navbar>
  )
}
