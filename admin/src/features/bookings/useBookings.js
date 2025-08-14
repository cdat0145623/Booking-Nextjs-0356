import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queyClient = useQueryClient();
    const [searchParams] = useSearchParams();

    //FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };
    //   { field: "totalPrice", value: 5000, method: "gte" };

    //SORT
    const sorByRaw = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sorByRaw.split("-");
    const sortBy = { field, direction };

    //PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //QUERY
    const {
        isLoading,
        error,
        data: { data: bookings, count } = {},
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    //PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount) {
        queyClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }

    if (page > 1) {
        queyClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }

    return { isLoading, error, bookings, count };
}
