import { Typography as MuiTypography, type TypographyProps } from '@mui/material';

interface TypographyPropsExtended extends TypographyProps {
  children: React.ReactNode;
}

export const Typography = ({ children, ...props }: TypographyPropsExtended) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};
