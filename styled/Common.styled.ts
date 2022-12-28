import styled from "styled-components";
import { device } from "./Breakpoint";

export const Container = styled.div`
  max-width: 1320px;
  width: 90%;
  margin: 0 auto;
  padding: 0;
`;

/**
 * Main Page content
 */
export const PageMain = styled.div`
  width: 100%;
  /* width: calc(100% - 375px - 1em); */
  /* @media ${device.laptop} {
    width: calc(100% - 300px - 1em);
  } */
`;

/**
 * Radius Card
 */
export const Card = styled.div<{ padding?: string }>`
  background-color: #fbfaff;
  padding: ${({ padding }) => (padding ? padding : "1em")};
  border-radius: 18px;
`;

/**
 * Block TItle
 */
export const BlockTitle = styled.h2`
  font-size: 1.2em;
  margin: 6px 0;
  color: ${({ theme }) => theme.black};
`;

/**
 * Button VOte
 */
export const VoteBtn = styled.div<{ disabled?: boolean }>`
  color: ${({ theme }) => theme.white};

  a,
  & > span {
    display: block;
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.primaryLight : theme.secondaryColor};
    color: ${({ theme, disabled }) =>
      disabled ? theme.darkGrey : theme.white};
    text-align: center;
    text-decoration: none;
    padding: 0.6em 1em;
    border-radius: 12px;
    @media ${device.mobileL} {
      height: 45px;
      font-size: 14px;
      line-height: 28px;
    }
  }
`;

export const BtnOutline = styled.button`
  display: flex;
  background-color: transparent;
  color: ${({ theme }) => theme.secondaryColor};
  outline: none;
  text-align: center;
  text-decoration: none;
  padding: 0.6em 1em;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  height: 55px;
  font-size: 16px;
  cursor: pointer;
  a {
    color: currentColor;
    height: 55px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    display: flex;
    @media ${device.mobileL} {
      height: 45px;
    }
  }
  &:disabled {
    opacity: 0.5;
  }
  @media ${device.mobileL} {
    height: 45px;
    font-size: 14px;
  }
`;

export const Empty = styled.div`
  margin: 2em 0;
  opacity: 0.5;
`;

export const LineClamp = styled.span<{ line?: number }>`
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${({ line }) => (line ? line : 1)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

//List page title
export const ListTitle = styled.div`
  h2 {
    font-weight: 500;
    font-size: 1.3em;
    margin: 0 0.5em 1em 0.5em;
    small {
      font-weight: 400;
    }
  }
`;

export const DesktopOnly = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;
export const MobileOnly = styled.div`
  display: none;
  position: relative;
  @media ${device.tablet} {
    display: block;
  }
`;

export const Nothing = styled.div`
  display: flex;
  height: 70vh;
  align-items: center;
  justify-content: center;
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondaryColor};
  gap: 1.1em;
  svg {
    vertical-align: bottom;
  }
`;

// arrow back title
export const Title = styled.h2`
  font-size: 1.1em;
  font-weight: 600;
  margin: 0;
`;

export const DeskCross = styled.div`
  @media ${device.mobileL} {
    display: none;
  }
`;

export const Wrapper = styled.div`
  @media ${device.mobileL} {
    margin-top: 1.2rem;
  }
`;
