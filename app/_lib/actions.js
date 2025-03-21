"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    // console.log("formData", formData);

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid ID");

    const updateData = { nationalID, nationality, countryFlag };

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId);

    if (error) throw new Error("Profile could not be updated");

    revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    // console.log("bookingData:::::", bookingData);
    // console.log("formData:::::", formData);
    const newBooking = {
        ...bookingData,
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        status: "unconfirmed",
        hasBreakfast: false,
        isPaid: false,
        observations: formData.get("observations").slice(0, 1000),
        guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
    };

    console.log("newBooking:::::", newBooking);

    const { error } = await supabase.from("bookings").insert([newBooking]);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be created");
    }

    revalidatePath(`/cabins/${bookingData.cabinId}`);

    redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
    // await new Promise((res) => setTimeout(res, 3000));
    // throw new Error();

    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const guestBookings = await getBookings(session.user.guestId);
    console.log("User have booked::::::", guestBookings);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);
    console.log("User have list ID booked::::::", guestBookingsIds);
    if (!guestBookingsIds.includes(bookingId))
        throw new Error("You do not have permission to delete");

    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    // console.log(formData);

    const bookingId = Number(formData.get("bookingId"));

    const guestBookings = await getBookings(session.user.guestId);
    // console.log("User have booked::::::", guestBookings);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);
    // console.log("User have list ID booked::::::", guestBookingsIds);
    if (!guestBookingsIds.includes(bookingId))
        throw new Error("You do not have permission to update");

    const updatedFields = {
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 1000),
    };

    // console.log("Updated fields:::::", updatedFields);

    const { error } = await supabase
        .from("bookings")
        .update(updatedFields)
        .eq("id", bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect("/account/reservations");
}
export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut("google", { redirectTo: "/" });
}
