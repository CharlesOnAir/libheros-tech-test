"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
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
                Création de votre compte
              </CardTitle>
              <p className="text-gray-600">
                Utilisez le formulaire ci-dessous avec vos identifiants pour
                créer votre compte.
              </p>
            </CardHeader>
            <CardContent className="px-0">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-sm font-medium">
                      Nom
                    </Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Entrez votre nom"
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-sm font-medium">
                      Prénom
                    </Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Entrez votre prénom"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Adresse e-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="emailConfirmation"
                      className="text-sm font-medium"
                    >
                      Confirmation de l&apos;adresse e-mail
                    </Label>
                    <Input
                      id="emailConfirmation"
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="passwordConfirmation"
                      className="text-sm font-medium"
                    >
                      Confirmation du mot de passe
                    </Label>
                    <Input
                      id="passwordConfirmation"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                  >
                    Créer un compte
                  </Button>

                  <div className="text-center mt-6">
                    <span className="text-gray-600 text-sm">
                      J&apos;ai déjà un compte ?{" "}
                    </span>
                    <Link
                      href="/auth/login"
                      className="text-[#0DB1E7] hover:text-[#0DB1E7]/80 text-sm font-medium hover:cursor-pointer"
                    >
                      Se connecter
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden sm:flex flex-1 bg-gray-100 items-center justify-center relative">
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
