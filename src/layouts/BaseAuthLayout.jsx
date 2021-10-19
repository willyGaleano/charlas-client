import styled from "styled-components";
import bcg from "../assets/images/eventobg.jpg";
import logo from "../assets/images/eventologo.svg";

const BaseAuthLayout = ({ children }) => {
  return (
    <Container>
      <FormSide>
        <Block>
          <Logo src={logo} />
          <h1>EventoApp</h1>
          {children}
        </Block>
      </FormSide>
      <ImagesSide>
        <Background src={bcg} />
      </ImagesSide>
    </Container>
  );
};

export default BaseAuthLayout;

//MAIN CONTAINER
const Container = styled.div`
  background-color: #cacaca;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

// LADO A
const FormSide = styled.div`
  background: #ffffff;
  flex: 4;

  @media screen and (max-width: 800px) {
    width: 80vw;
    margin: -15em 0 3em 0;
    border-radius: 9pt;
    z-index: 1;
  }
  @media screen and (max-width: 600px) {
    width: 100vw;
    margin: 0;
    border-radius: 0;
  }
`;
const Logo = styled.img`
  height: 3em;
  width: 3em;
`;
const Block = styled.div`
  margin-top: 105px;
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.5em;
  }

  a {
    text-transform: uppercase;
    font-size: 0.8em;
    margin: 0.3em;
  }
  @media screen and (max-width: 800px) {
    margin-top: 35px;
  }
  @media screen and (max-width: 600px) {
    margin-top: 5px;
  }
`;

// LADO B
const ImagesSide = styled.div`
  background: #232f3e;
  width: 100%;
  flex: 8;
  @media screen and (max-width: 800px) {
    max-height: 45vh;
  }
  @media screen and (max-width: 600px) {
    max-height: 24vh;
  }
`;

const Background = styled.img`
  height: 100vh;
  width: 100%;
  object-fit: cover;
  @media screen and (max-width: 800px) {
    max-height: 45vh;
  }
  @media screen and (max-width: 600px) {
    max-height: 24vh;
  }
`;
