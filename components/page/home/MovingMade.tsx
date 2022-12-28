import styled from "styled-components";
import { Container } from "styled/Common.styled";
import { Title40 } from "styled/Title.styled";
import Image from "next/image";
export default function Moving() {
  return (
    <Section>
      <Container>
        <Wrapper>
          <LeftAside>
            <Title40>
              Moving Made <br /> Modern
            </Title40>
            <Text>
              By choosing White Glove Packers and Movers, you’re guaranteeing a
              great moving day. All customers receive transparent pricing,
              flexible service and payment options, Quality Packaging Material,
              industry-best customer support, and an easy-to-access online
              dashboard.
            </Text>
            <ImageWrapper>
              <Image
                layout='responsive'
                src='https://whiteglove23.s3.ap-south-1.amazonaws.com/background/movingmadedots.png'
                height={158}
                width={158}
                alt=' Moving Made Modern'
              />
            </ImageWrapper>
          </LeftAside>
        </Wrapper>
      </Container>
      <ImageWrapper2>
        <Image
          layout='responsive'
          src='https://whiteglove23.s3.ap-south-1.amazonaws.com/background/movinarrow.png'
          height={174}
          width={300}
          alt=' Moving Made Modern'
        />
      </ImageWrapper2>
    </Section>
  );
}

const Section = styled.section`
  color: var(--white);
  background-color: var(--dark);
  background-image: url("https://whiteglove23.s3.ap-south-1.amazonaws.com/background/movin-made.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  height: 800px;
  align-items: center;
`;

const LeftAside = styled.aside`
  width: 360px;
  position: relative;
`;

const Text = styled.p`
  line-height: 20px;
  font-weight: 300;
`;
const ImageWrapper = styled.div`
  width: 158px;
  position: absolute;
  bottom: calc(100% + 50px);
  right: 100%;
  display: block;
`;

const ImageWrapper2 = styled.div`
  width: 300px;
  position: absolute;
  bottom: 50px;
  left: 0px;
  display: block;
`;
