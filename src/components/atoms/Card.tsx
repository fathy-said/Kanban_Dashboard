import { Card as MuiCard, type CardProps } from '@mui/material';

interface CardPropsExtended extends CardProps {
  children: React.ReactNode;
}

export const Card = ({ children, ...props }: CardPropsExtended) => {
  return <MuiCard {...props}>{children}</MuiCard>;
};
