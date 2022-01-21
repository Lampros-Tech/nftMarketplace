import { useState } from "react";

export const useSearchFetch = () => {
    const [searchState, setSearch] = useState("")
    console.log(searchState)
    return {searchState, setSearch}
}