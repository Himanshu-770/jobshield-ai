"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

const CheckAuth = () => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const loadUser = useAuthStore((state) => state.loadUser);

    useEffect(() => {
        let active = true;
        if (!user?.id) {
            void loadUser().then((loadedUser) => {
                if (active && !loadedUser) router.replace("/auth/login");
            });
        }
        return () => { active = false; };
    }, [user?.id, loadUser, router]);
    return (
        <div>

        </div>
    );
};

export default CheckAuth;
