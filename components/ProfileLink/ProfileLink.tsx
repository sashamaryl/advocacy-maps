import { useState } from "react"
import { Nav, Navbar } from "react-bootstrap"
import Image from "react-bootstrap/Image"
import { NavLink } from "../Navlink"
import {
  Role,
  SignInWithButton,
  signOutAndRedirectToHome,
  useAuth
} from "../auth"
import styles from "./ProfileLink.module.css"

const greeting = (role: Role, fullName?: string) => {
  switch (role) {
    case "user":
    case "legislator":
    case "organization":
    case "pendingUpgrade":
      return fullName ? `Hello, ${fullName}` : "Hello there"
    case "admin":
      return `Hello, Admin ${fullName}`
  }
}

type ProfileLinkProps = {
  fullName?: string
  role?: Role
  sticky: boolean
  className?: string
}

const ProfileLink = ({
  fullName,
  role = "user",
  className,
  sticky
}: ProfileLinkProps) => {
  const { authenticated, user } = useAuth()

  const [isExpanded, setIsExpanded] = useState(false)
  const toggleNav = () => setIsExpanded(expanded => !expanded)
  const closeNav = () => setIsExpanded(false)
  const userLink = "/profile?id=" + user?.uid

  return (
    <Navbar
      expand={false}
      expanded={isExpanded}
      variant="dark"
      bg="secondary"
      collapseOnSelect={true}
      className={`d-flex justify-content-end ${className}`}
    >
      {authenticated ? (
        <>
          <Navbar.Brand onClick={toggleNav}>
            <Nav.Link className="p-0 text-white d-flex align-items-center ">
              <Image
                className={styles.profileLinkImage}
                src="/profile-icon.svg"
                alt="profile icon"
              ></Image>
              <div className={`d-none d-md-flex ms-1`}>
                {greeting(role, fullName)}
              </div>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Collapse id="profile-nav">
            <Nav className="me-2 me-md-4 d-flex align-items-end">
              <NavLink
                className={"fw-bold text-nowrap justify-self-end"}
                handleClick={() => {
                  location.assign(userLink)
                }}
              >
                View Profile
              </NavLink>
              <NavLink
                className={"fw-bold"}
                href="/editprofile"
                handleClick={closeNav}
              >
                Edit Profile
              </NavLink>
              <NavLink
                className={"fw-bold"}
                handleClick={() => {
                  closeNav()
                  void signOutAndRedirectToHome()
                }}
              >
                Sign Out
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : sticky ? (
        <></>
      ) : (
        <SignInWithButton />
      )}
    </Navbar>
  )
}

export default ProfileLink
