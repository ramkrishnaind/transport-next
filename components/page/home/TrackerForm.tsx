import LocationIcon from "assets/icons/LocationIcon";
import { ButtonPrimary } from "components/common/Button";
import styled from "styled-components";
import { Container } from "styled/Common.styled";
import { Title24, TextWhite, TextActive } from "styled/Title.styled";
import { Select, Input } from "antd";
import { useState } from "react";
export default function Tracker() {
  const selectList = [
    {
      value: "0",
      label: "Mobile Number",
    },
    {
      value: "1",
      label: "Tracking ID",
    },
    {
      value: "2",
      label: "LTL Shipment (LRN)",
    },
    {
      value: "3",
      label: "Order ID/Ref ID",
    },
  ];
  const [slectValue, setSlectValue] = useState("0");
  const handleChange = (value) => {
    setSlectValue(value);
  };
  return (
    <Section>
      <Container>
        <Wrapper>
          <LeftAside>
            {/* icon */}
            <LocationIcon />
            <Title24>
              <TextWhite>
                Track your
                <br /> Order
              </TextWhite>
            </Title24>
          </LeftAside>
          {/* form */}
          <Form>
            <div>
              <Label>
                <TextActive>Choose Order Type</TextActive>
              </Label>
              <Select
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={selectList}
                className='selectBox'
                size='large'
                value={slectValue}
              />
            </div>
            <InputWrapper>
              <Input
                placeholder={selectList[slectValue].label}
                size='large'
                style={{ width: "100%" }}
              />
            </InputWrapper>
            <ButtonPrimary type='submit' size='sm' style={{ width: "175px" }}>
              <span>Track</span>
            </ButtonPrimary>
          </Form>
        </Wrapper>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding-top: 113px;
  padding-bottom: 200px;
`;

const Wrapper = styled.div`
  background-color: var(--black);
  width: 100%;
  max-width: 1159px;
  padding: 40px 50px;
  display: flex;
  gap: 50px;
  align-items: center;
  margin: 0 auto;
  border-radius: 20px;
  position: relative;
`;

const LeftAside = styled.aside`
  display: flex;
  gap: 27px;
  svg {
    height: 52px;
    width: auto;

    path {
      fill: var(--white);
    }
  }
`;

const Form = styled.form`
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .selectBox {
    width: 246px !important;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    display: block;
    .ant-select-selector {
      background-color: transparent;
      border: none;
      color: var(--white);
      font-size: 20px;
      padding: 0 !important;
    }
    .ant-select-selection-item {
      color: var(--white) !important;
    }
    .ant-select-arrow {
      color: var(--primary);
      font-size: 18px;
    }
  }
`;
const Label = styled.label`
  font-size: 14px;
`;
const InputWrapper = styled.div`
  margin-inline: 50px 20px;
  flex-grow: 2;
`;
