import { Box, Container, alpha, Paper } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { SearchBar } from "../molecules/SearchBar";
import { Typography } from "../atoms/Typography";

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
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 2.5,
          px: 3,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  backgroundColor: alpha("#6366f1", 0.1),
                  color: "primary.main",
                }}
              >
                <DashboardIcon fontSize="small" />
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, letterSpacing: "-0.025em" }}
              >
                Kanban Board
              </Typography>
            </Box>
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </Box>
        </Container>
      </Paper>

      <Box sx={{ flex: 1, p: 3, pt: 4, overflow: "hidden" }}>
        <Container
          maxWidth={false}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};
