import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be load");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    //https://wmdmtidukzbufqfallwu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");

    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();

    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be created");
    }

    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be upload and Cabin was not created"
        );
    }

    return data;
}

// eslint-disable-next-line no-unused-vars
export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}
