"use client";

import Image from "next/image";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Connexion avec:", { username, password });
    setIsLoading(false);
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
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Nom d&apos;utilisateur
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {isLoading ? "Connexion..." : "Se connecter"}
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
