import Button from "../../ui/buttons/button/button";

const ProfileDialog = () => {
  return (
    <div className="flex flex-col gap-4 min-w-80">
      <span className="text-center">pertusatifranco123@gmail.com</span>
      <div className="mx-auto h-22 w-22 grid place-items-center rounded-full bg-main-300">
        <span className="text-dark font-bold text-2xl">FP</span>
      </div>
      <span className="text-center text-2xl">Bienvenido de nuevo Franco</span>
      <div className="flex flex-col gap-2">
        <Button icon="exit_to_app" label="Cerrar Sesion" variant="secondary" />
      </div>
    </div>
  );
};

export default ProfileDialog;
