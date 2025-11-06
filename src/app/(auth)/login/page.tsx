"use client";

import { useState, FormEvent } from "react";
import Button from "@/app/components/ui/buttons/button/button";
import Card from "@/app/components/ui/card/card";
import CardFooter from "@/app/components/ui/card/card-footer/card-footer";
import CardHeader from "@/app/components/ui/card/card-header/card-header";
import "@/app/globals.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (value: string): string => {
    if (!value) return "El email es requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Ingresa un email válido";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "La contraseña es requerida";
    if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    return "";
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (!emailError && !passwordError) {
      console.log({
        email,
        password,
      });
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center bg-background">
      <Card>
        <CardHeader classList="p-6">
          <h1 className="text-xl font-semibold">Iniciar sesión</h1>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="janperez@mail.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={handleEmailBlur}
                className={`bg-dark rounded p-3 outline-none focus:2 transition-all ${
                  errors.email && touched.email
                    ? "2 danger focus:danger"
                    : "focus:blue-500"
                }`}
                aria-invalid={errors.email && touched.email ? "true" : "false"}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span id="email-error" className="text-sm text-danger" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={handlePasswordBlur}
                className={`bg-dark rounded p-3 outline-none focus:2 transition-all ${
                  errors.password && touched.password
                    ? "2 danger focus:danger"
                    : "focus:blue-500"
                }`}
                aria-invalid={errors.password && touched.password ? "true" : "false"}
                aria-describedby={errors.password && touched.password ? "password-error" : undefined}
                autoComplete="current-password"
              />
              {errors.password && touched.password && (
                <span id="password-error" className="text-sm text-danger" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <Button label="Iniciar sesión" variant="cta" type="submit" />
          </div>
        </form>
        <CardFooter classList="p-6">
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}