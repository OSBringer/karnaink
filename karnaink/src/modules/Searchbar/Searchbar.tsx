import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginBottom: "50px",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #000",
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface SearchbarProps {
  onSearch: (search: string) => void;
}

interface DateObject {
  isNew: boolean;
  value: string;
  isAvailable: boolean;
}

export function filterStringsBySubstring(
  strings: DateObject[],
  substring: string
): DateObject[] {
  console.log(strings);
  const filteredStrings: DateObject[] = strings.filter((s) =>
    s.value.includes(substring)
  );
  return filteredStrings;
}

function Searchbar(props: SearchbarProps) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Nájsť čas🕒"
        onChange={(e) => props.onSearch(e.target.value)}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </Search>
  );
}

export default Searchbar;
