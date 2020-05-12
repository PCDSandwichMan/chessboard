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
    switch (playerOneConfig.selectedIcon) {
      case "star":
        return (
          <StarsIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
      case "userIcon":
        return (
          <AccountCircleIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
      case "album":
        return (
          <AlbumIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
      default:
        console.log("Icon not found");
        return (
          <HelpIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
    }
  } else if (playerType === 2) {
    switch (playerTwoConfig.selectedIcon) {
      case "gitHubIcon":
        return (
          <GitHubIcon
            style={{ color: playerTwoConfig.selectedColor }}
            {...rest}
          />
        );
      case "android":
        return (
          <AdbIcon style={{ color: playerTwoConfig.selectedColor }} {...rest} />
        );
      case "emoji":
        return (
          <EmojiEmotionsIcon
            style={{ color: playerTwoConfig.selectedColor }}
            {...rest}
          />
        );
      default:
        console.log("Icon not found");
        return (
          <HelpIcon
            style={{ color: playerTwoConfig.selectedColor }}
            {...rest}
          />
        );
    }
  } else {
    return <HelpIcon {...rest} />;
  }
};
