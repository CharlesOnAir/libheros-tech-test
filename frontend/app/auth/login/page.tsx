"use client";

import Image from "next/image";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import showToast from "@/components/ui/toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: loginCredentials.email,
        password: loginCredentials.password,
        redirect: false,
      });

      if (!result?.ok) {
        showToast({
          type: "error",
          message:
            "Authentification échouée, merci de vérifier vos identifiants",
        });
        return;
      }

      showToast({
        type: "success",
        message: "Connexion réussie",
      });
      return router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      showToast({
        type: "error",
        message: "Une erreur est survenue lors de la connexion",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex">
      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={250}
              height={250}
              priority
            />
            <CardHeader className="space-y-1 px-0">
              <CardTitle className="text-3xl font-bold">
                Connexion à votre compte
              </CardTitle>
              <p className="text-gray-600">
                Utilisez le formulaire ci-dessous avec vos identifiants pour
                vous connecter à votre compte.
              </p>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Nom d&apos;utilisateur
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={loginCredentials.email}
                    onChange={(e) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        email: e.target.value,
                      })
                    }
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginCredentials.password}
                    onChange={(e) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        password: e.target.value,
                      })
                    }
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ClipLoader size={13} color="#ffffff" />
                    ) : (
                      "Se connecter"
                    )}
                  </Button>

                  <div className="text-center mt-6">
                    <span className="text-gray-600 text-sm">
                      Je n&apos;ai pas de compte ?{" "}
                    </span>
                    <Link
                      href="/auth/register"
                      className="text-[#0DB1E7] hover:text-[#0DB1E7]/80 text-sm font-medium hover:cursor-pointer"
                    >
                      Créer un compte
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 flex items-center justify-center relative">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/images/login.jpg"
            alt="Illustration de connexion"
            className="w-full h-auto object-contain"
            width={800}
            height={600}
            priority
            quality={40}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0DB1E7] opacity-30" />
        </div>
      </div>
    </div>
  );
}
