import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
})

export const Textarea = styled("textarea", {
  border: '1px solid $border',
  background: '$foreground',
  width: "100%",
  minHeight: "130px",
  outline: "none",
  padding: "1rem",
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
