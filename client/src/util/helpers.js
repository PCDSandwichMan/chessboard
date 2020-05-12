import React from "react";

// - Material
// * Player One
import StarsIcon from "@material-ui/icons/Stars";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";
// * Player Two
import GitHubIcon from "@material-ui/icons/GitHub";
import AdbIcon from "@material-ui/icons/Adb";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
// * Fallback
import HelpIcon from "@material-ui/icons/Help";

export const ActiveIcon = ({
  playerOneConfig,
  playerTwoConfig,
  playerType,
  ...rest
}) => {
  if (playerType === 1) {
    switch (playerOneConfig) {
      case "star":
        return <StarsIcon {...rest} />;
      case "userIcon":
        return <AccountCircleIcon {...rest} />;
      case "album":
        return <AlbumIcon {...rest} />;
      default:
        console.log("Icon not found");
        return <HelpIcon {...rest} />;
    }
  } else if (playerType === 2) {
    switch (playerTwoConfig) {
      case "gitHubIcon":
        return <GitHubIcon {...rest} />;
      case "android":
        return <AdbIcon {...rest} />;
      case "emoji":
        return <EmojiEmotionsIcon {...rest} />;
      default:
        console.log("Icon not found");
        return <HelpIcon {...rest} />;
    }
  } else {
    return <HelpIcon {...rest} />;
  }
};
