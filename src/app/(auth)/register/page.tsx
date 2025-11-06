"use client";

import { useState, FormEvent } from "react";
import Button from "@/app/components/ui/buttons/button/button";
import Card from "@/app/components/ui/card/card";
import CardFooter from "@/app/components/ui/card/card-footer/card-footer";
import CardHeader from "@/app/components/ui/card/card-header/card-header";
import "@/app/globals.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (value: string): string => {
    if (!value) return "El email es requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Ingresa un email válido";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "La contraseña es requerida";
    if (value.length < 8)
      return "La contraseña debe tener al menos 8 caracteres";
    if (!/[A-Z]/.test(value)) return "Debe contener al menos una mayúscula";
    if (!/[a-z]/.test(value)) return "Debe contener al menos una minúscula";
    if (!/[0-9]/.test(value)) return "Debe contener al menos un número";
    return "";
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value) return "Confirma tu contraseña";
    if (value !== password) return "Las contraseñas no coinciden";
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
    if (touched.confirmPassword && confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== confirmPassword ? "Las contraseñas no coinciden" : "",
      }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== password ? "Las contraseñas no coinciden" : "",
      }));
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

  const handleConfirmPasswordBlur = () => {
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(confirmPassword),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    setTouched({ email: true, password: true, confirmPassword: true });

    if (!emailError && !passwordError && !confirmPasswordError) {
      console.log({
        email,
        password,
        confirmPassword,
      });
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center bg-background">
      <Card>
        <CardHeader classList="p-6">
          <h1 className="text-xl font-semibold">Registrarse</h1>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                {errors.email && touched.email && (
                  <span
                    id="email-error"
                    className="text-sm text-danger"
                    role="alert"
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="janperez@mail.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={handleEmailBlur}
                className={`bg-dark rounded p-3 outline-none focus:ring-2 transition-all ${
                  errors.email && touched.email
                    ? "ring-2 ring-danger focus:ring-danger"
                    : "focus:ring-blue-500"
                }`}
                aria-invalid={errors.email && touched.email ? "true" : "false"}
                aria-describedby={
                  errors.email && touched.email ? "email-error" : undefined
                }
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                {errors.password && touched.password && (
                  <span
                    id="password-error"
                    className="text-sm text-danger"
                    role="alert"
                  >
                    {errors.password}
                  </span>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={handlePasswordBlur}
                className={`bg-dark rounded p-3 outline-none focus:ring-2 transition-all ${
                  errors.password && touched.password
                    ? "ring-2 ring-danger focus:ring-danger"
                    : "focus:ring-blue-500"
                }`}
                aria-invalid={
                  errors.password && touched.password ? "true" : "false"
                }
                aria-describedby={
                  errors.password && touched.password
                    ? "password-error"
                    : undefined
                }
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                onBlur={handleConfirmPasswordBlur}
                className={`bg-dark rounded p-3 outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "ring-2 ring-danger focus:ring-danger"
                    : "focus:ring-blue-500"
                }`}
                aria-invalid={
                  errors.confirmPassword && touched.confirmPassword
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  errors.confirmPassword && touched.confirmPassword
                    ? "confirmPassword-error"
                    : undefined
                }
                autoComplete="new-password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <span
                  id="confirmPassword-error"
                  className="text-sm text-danger"
                  role="alert"
                >
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <Button label="Registrarse" variant="cta" type="submit" />
          </div>
        </form>
        <CardFooter classList="p-6">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
