import Link from "next/link";
import styled from "styled-components";
// styles
import { Container } from "styled/Common.styled";
// data
import { NavList } from "data/NavList";
// component
import { ButtonSecondary } from "./Button";
// icons
import HamburgerIcon from "assets/icons/HamburgerIcon";
import LogoIcon from "assets/icons/LogoIcon";
import LocationIcon from "assets/icons/LocationIcon";
const Header = () => {
  return (
    <HeaderSection>
      <Container>
        <Nav>
          <Logo>
            <Link href='/'>
              <a>
                <LogoIcon />
              </a>
            </Link>
          </Logo>
          <Ul>
            {NavList.map((list, index) =>
              list.dropdown.length > 0 ? (
                <NavLink key={list.name + "_" + index}>
                  <Link href={list.link}>{list.name}</Link>
                </NavLink>
              ) : (
                <NavLink key={list.name + "_" + index}>
                  <Link href={list.link}>{list.name}</Link>
                </NavLink>
              )
            )}
            <RightSide>
              <ButtonSecondary>
                <LocationIcon />
                <span>Track Your Order</span>
              </ButtonSecondary>
              <SideBarTrigger>
                <HamburgerIcon />
              </SideBarTrigger>
            </RightSide>
          </Ul>
        </Nav>
      </Container>
    </HeaderSection>
  );
};

export default Header;

const HeaderSection = styled.header`
  padding: 18px 0;
  background-color: var(--white);
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div``;

const Ul = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
`;

const NavLink = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
  margin-left: 64px;
`;

const SideBarTrigger = styled.div``;
