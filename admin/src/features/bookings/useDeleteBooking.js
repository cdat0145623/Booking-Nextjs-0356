import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation(
        {
            mutationFn: (bookingId) => deleteBookingApi(bookingId),
            onSuccess: () => {
                toast.success(`Booking  has been successfully deleted`);
                queryClient.invalidateQueries({ queryKey: ["bookings"] });
            },
            onError: (error) => {
                console.error(error);
                toast.error(`There was an error while deleting`);
            },
        }
    );
    return { deleteBooking, isDeletingBooking };
}
