
import lottieJson from "../../assets/Animation - 1721103353957.json";
import Lottie from "react-lottie-player";

const TypingAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: "100%", height:"100%" }}
    />
  );
};

export default TypingAnimation
