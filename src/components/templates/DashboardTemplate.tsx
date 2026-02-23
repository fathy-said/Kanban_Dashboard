import { Box, Container } from '@mui/material';
import { SearchBar } from '../molecules/SearchBar';
import { Typography } from '../atoms/Typography';

interface DashboardTemplateProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  children: React.ReactNode;
}

export const DashboardTemplate = ({
  searchValue,
  onSearchChange,
  children,
}: DashboardTemplateProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          py: 2,
          px: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Kanban Board
            </Typography>
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </Box>
        </Container>
      </Box>

      <Box sx={{ flex: 1, p: 3, overflow: 'hidden' }}>
        <Container
          maxWidth={false}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
