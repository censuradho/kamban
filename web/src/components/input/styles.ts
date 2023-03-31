
import { styled } from "stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

export const Input = styled("input", {
  border: '1px solid $border',
  background: '$foreground',
  width: "100%",
  height: "2.5rem",
  outline: "none",
  padding: "0 1rem",
  color: "$text",
  fontWeight: 400,
  borderRadius: '$default',

  "&::placeholder": {
    color: "$text",
    fontSize: "0.8rem",
    fontWeight: "400",
  },
  
  "&:focus": {
    borderColor: "$primary",
  },

  variants: {
    hasLeftIcon: {
      true: {
        paddingLeft: "3.5rem",
      },
    },
    hasRightIcon: {
      true: {
        paddingRight: "3.5rem",
      },
    },
    hasError: {
      true: {
        borderColor: "$error",
        color: "$error",
      },
    },
  },
});

export const Label = styled("label", {
  cursor: "pointer",
  fontSize: "$xsm",
  color: '$text',
  fontWeight: 600
});

export const ErrorMessage = styled('span', {
  color: "$error",
  fontSize: '$xsm'
});

export const LeftIconView = styled("div", {
  position: "absolute",
  left: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const RightIconView = styled("div", {
  position: "absolute",
  right: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const IconView = styled("div", {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
});
