import Button from "@/app/components/ui/buttons/button/button";
import Card from "@/app/components/ui/card/card";
import CardFooter from "@/app/components/ui/card/card-footer/card-footer";
import CardHeader from "@/app/components/ui/card/card-header/card-header";
import "@/app/globals.css";

export default function LoginPage() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <Card>
        <CardHeader classList="p-6">
          <h1 className="text-xl font-semibold">Iniciar sesion</h1>
        </CardHeader>
        <div className="p-6 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-sm">Email</span>
            <input placeholder="janperez@mail.com" type="text" className="bg-dark rounded p-2" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Contraseña</span>
            <input placeholder="afwfawfaw" type="password"  className="bg-dark rounded p-2" />
          </div>
          <Button label="Iniciar sesion" variant="cta" />
        </div>
        <CardFooter classList="p-6">
          ¿No tienes una cuenta?
        </CardFooter>
      </Card>
    </div>
  );
}

// Opcional: Metadata para SEO
export const metadata = {
  title: "Login",
  description: "Descripción de la página login",
};
