import ArrowUp from "assets/icons/ArrowUp";
import { ButtonPrimary } from "components/common/Button";
import styled from "styled-components";
import { Container } from "styled/Common.styled";

function Banner() {
  return (
    <GreetingSection>
      <Container>
        <Card>
          <Title>Shifting Happiness</Title>
          <Text>
            We make your <br />
            Moving Easy
          </Text>
          <ButtonPrimary size='lg'>
            <span>Calculate Moving Prices</span>
            <ArrowUp />
          </ButtonPrimary>
        </Card>
      </Container>
      {/* background image */}
      {/* lower image */}
    </GreetingSection>
  );
}

const GreetingSection = styled.section`
  padding: 109px 0;
  background-color: var(--whitegrey02);
`;

const Card = styled.div`
  padding: 50px;
  box-shadow: 29px 37px 50px rgba(67, 159, 217, 0.08);
  border-radius: 20px;
  width: 367px;
  margin-left: auto;
`;

const Title = styled.h3`
  font-size: 24px;
  line-height: 30px;
  color: var(--primary);
  font-weight: 400;
  margin: 0;
`;
const Text = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.3;
  margin: 20px 0;
`;

export default Banner;
