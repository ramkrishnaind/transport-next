import ArrowUp from "assets/icons/ArrowUp";
import { ButtonPrimary } from "components/common/Button";
import styled from "styled-components";
import { Container } from "styled/Common.styled";
import Image from "next/image";
import { Title24, Title32, TextActive } from "styled/Title.styled";

function Banner() {
  return (
    <GreetingSection>
      <Container>
        <Card>
          <Title24>
            <TextActive>Shifting Happiness</TextActive>
          </Title24>
          <Title32>
            We make your <br />
            Moving Easy
          </Title32>
          <ButtonPrimary size='lg'>
            <span>Calculate Moving Prices</span>
            <ArrowUp />
          </ButtonPrimary>{" "}
          {/* background image */}
          <BackgroundImage>
            <Image
              src={
                "https://whiteglove23.s3.ap-south-1.amazonaws.com/background/Frame.png"
              }
              alt={"Moving Made Modern"}
              layout='responsive'
              height='118px'
              width='112px'
            />
          </BackgroundImage>
        </Card>
      </Container>

      {/* lower image */}
      <LowerImage>
        <Image
          src={
            "https://whiteglove23.s3.ap-south-1.amazonaws.com/temp/white_glove_relocation_img.png"
          }
          alt={"Moving Made Modern"}
          layout='responsive'
          height='205px'
          width='1018px'
        />
      </LowerImage>
    </GreetingSection>
  );
}

const GreetingSection = styled.section`
  padding: 109px 0;
  background-color: var(--whitegrey02);
  background-image: url("/images/index_image/Home_background_1.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  position: relative;
  z-index: 1;
`;

const Card = styled.div`
  padding: 50px;
  box-shadow: 29px 37px 50px rgba(67, 159, 217, 0.08);
  border-radius: 20px;
  width: 367px;
  margin-left: auto;
  background-color: var(--white);
  position: relative;
  ${Title32} {
    margin: 20px 0;
  }
`;

const LowerImage = styled.div`
  display: block;
  max-width: 1018px;
  width: calc(100% - 80px);
  position: absolute;
  left: 44px;
`;

const BackgroundImage = styled.div`
  display: block;
  width: 112px;
  position: absolute;
  top: -26px;
  right: -36px;
  z-index: -1;
`;
export default Banner;
