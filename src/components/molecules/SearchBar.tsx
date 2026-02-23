import { Box, InputAdornment, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "../atoms/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search tasks...",
}: SearchBarProps) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Input
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: alpha("#f1f5f9", 0.8),
            borderRadius: 3,
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "divider",
            },
            "&.Mui-focused": {
              backgroundColor: "background.paper",
              "& fieldset": {
                borderColor: "primary.main",
              },
            },
          },
        }}
      />
    </Box>
  );
};
