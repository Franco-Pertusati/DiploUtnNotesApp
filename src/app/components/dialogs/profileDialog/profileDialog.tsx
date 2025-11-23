"use client";
import { useEffect, useState } from "react";
import { authAPI } from "@/app/api/routes";
import Button from "../../ui/buttons/button/button";
import { useRouter } from "next/navigation";
import useDialog from "@/lib/dialogs/useDialog";

interface UserDto {
  username: string;
  email: string;
}

const ProfileDialog = () => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authAPI.userInfo();
        console.log("User info:", data);
        setUser(data);
      } catch (err) {
        console.error("Error obteniendo user info:", err);
      }
    };

    fetchUser();
  }, []);

  const router = useRouter();
  const dialog = useDialog()

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      router.push("/login");
      console.log("Cierre de sesión exitoso");
      dialog.closeAll()
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-80">
      <span className="text-center text-xl">{user?.email}</span>
      <div className="mx-auto h-22 w-22 grid place-items-center rounded-full bg-main-300">
        <span className="text-dark font-bold text-2xl">{user?.username[0].toUpperCase()}</span>
      </div>

      <span className="text-center text-2xl">
        Hola de nuevo {user?.username ?? "cargando..."}
      </span>

      <div className="flex flex-col gap-2">
        <Button
          icon="exit_to_app"
          label="Cerrar Sesion"
          variant="secondary"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default ProfileDialog;
