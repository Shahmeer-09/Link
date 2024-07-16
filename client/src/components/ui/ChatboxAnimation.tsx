
import lottieJson from "../../assets/Animation - 1719497072647.json";
import Lottie from "react-lottie-player";

const ChatboxAnimation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: "100%", height:"100%" }}
    />
  );
};

export default ChatboxAnimation
