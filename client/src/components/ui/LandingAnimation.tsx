import lottieJson from "../../assets/Animation - 1720431904408 (1).json";
import Lottie from "react-lottie-player";

const LandingAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: "100%", height:"100%" }}
    />
  );
};

export default LandingAnimation;
