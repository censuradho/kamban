import { icons } from "./icons";
import { theme } from "stitches.config";
import { IconProps } from "./types";
import { Typography } from "../typography";

export function Icon(props: IconProps) {
  const {
    name, color, customColor, size = 20,
  } = props;

  const Svg = icons[name];

  const fill = ((customColor || theme.colors[color as keyof typeof theme.colors]?.value)) as string;

  if (!Svg) return null
  
  return (
    <Typography color={color}>
      <Svg
        size={size} 
      />
    </Typography>
  );
}