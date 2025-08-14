import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            toast.success("Login successful");
            navigate("/dashboard", { replace: true });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Provided username or password is incorrect");
        },
    });

    return { login, isLoading };
}
