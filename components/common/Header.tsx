import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
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
import DropDownIcon from "assets/icons/DropDownIcon";

// design compo
import { Dropdown } from "antd";

const Header = () => {
  const router = useRouter();

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
            {NavList.map((list, index) => {
              let item = list.dropdown;
              return item.length > 0 ? (
                <Dropdown
                  key={list.name + "_" + index}
                  menu={{
                    items: item,
                    style: { width: "150px" },
                    onClick: ({ item }: { item: any }) => {
                      router.push(item?.props?.link);
                    },
                  }}
                >
                  <NavLink>
                    <Link href={list.link}>
                      <a>
                        <span>{list.name}</span>
                        <DropDownIconWrapper>
                          <DropDownIcon />
                        </DropDownIconWrapper>
                      </a>
                    </Link>
                  </NavLink>
                </Dropdown>
              ) : (
                <NavLink key={list.name + "_" + index}>
                  <Link href={list.link}>
                    <a>{list.name}</a>
                  </Link>
                </NavLink>
              );
            })}
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

const DropDownIconWrapper = styled.span`
  margin-left: 9px;
`;
