import {useMediaQuery} from "@mui/material";

export function useIsMobile() {
    return useMediaQuery('(max-width: 1000px)')
}