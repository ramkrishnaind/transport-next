import React from "react";
import styled from "styled-components";
interface Props {
  children: React.ReactNode;
  size?: string;
  type?: string;
}

export const ButtonPrimary = ({
  children,
  size = "lg",
  type = "button",
}: Props) => {
  return (
    <ButtonPriWrapper size={size} type={type}>
      {children}
    </ButtonPriWrapper>
  );
};

export const ButtonSecondary = ({ children, type = "button" }: Props) => {
  return <ButtonSecWrapper type={type}>{children}</ButtonSecWrapper>;
};

const ButtonPriWrapper = styled.div`
  height: ${({ size }) => (size === "lg" ? "62px" : "52px")};
  background-color: var(--yellow);
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 0 1em;
  cursor: pointer;
  font-size: 16px;
`;

const ButtonSecWrapper = styled.div`
  height: 57px;
  background-color: var(--whitegrey01);
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  padding: 0 1em;
  cursor: pointer;
  font-size: 18px;
`;
