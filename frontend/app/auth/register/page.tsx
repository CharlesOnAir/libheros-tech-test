"use client";

import Image from "next/image";

import api from "@/app/utils/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import showToast from "@/components/ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerCredentials, setRegisterCredentials] = useState({
    lastname: "",
    firstname: "",
    email: "",
    emailConfirmation: "",
    password: "",
    passwordConfirmation: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post(
        "/authentification/register",
        registerCredentials
      );

      if (response.status !== 201) {
        showToast({
          type: "error",
          message: response.data.message,
        });
        return;
      }

      showToast({
        type: "success",
        message: "Compte créé avec succès",
      });
      return router.push("/auth/login");
    } catch (error) {
      console.error(error);
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
                Création de votre compte
              </CardTitle>
              <p className="text-gray-600">
                Utilisez le formulaire ci-dessous avec vos identifiants pour
                créer votre compte.
              </p>
            </CardHeader>
            <CardContent className="px-0">
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                      value={registerCredentials.lastname}
                      onChange={(e) =>
                        setRegisterCredentials({
                          ...registerCredentials,
                          lastname: e.target.value,
                        })
                      }
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
                      value={registerCredentials.firstname}
                      onChange={(e) =>
                        setRegisterCredentials({
                          ...registerCredentials,
                          firstname: e.target.value,
                        })
                      }
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
                      value={registerCredentials.email}
                      onChange={(e) =>
                        setRegisterCredentials({
                          ...registerCredentials,
                          email: e.target.value,
                        })
                      }
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
                      value={registerCredentials.emailConfirmation}
                      onChange={(e) =>
                        setRegisterCredentials({
                          ...registerCredentials,
                          emailConfirmation: e.target.value,
                        })
                      }
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
                      value={registerCredentials.password}
                      onChange={(e) =>
                        setRegisterCredentials({
                          ...registerCredentials,
                          password: e.target.value,
                        })
                      }
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
                      value={registerCredentials.passwordConfirmation}
                      onChange={(e) =>
                        setRegisterCredentials({
                          ...registerCredentials,
                          passwordConfirmation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                  >
                    {isLoading ? (
                      <ClipLoader size={13} color="#ffffff" />
                    ) : (
                      "Créer un compte"
                    )}
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
