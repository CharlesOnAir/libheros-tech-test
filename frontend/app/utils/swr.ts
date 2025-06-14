import { BASE_API_URL } from "@/constants";
import { getSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export const fetcher = async (url: string) => {
  const session = await getSession();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (session?.user?.token) {
    headers.Authorization = `Bearer ${session.user.token}`;
  }

  try {
    const response = await fetch(`${BASE_API_URL}${url}`, {
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Une erreur est survenue";

      toast.error(errorMessage, {
        position: "bottom-center",
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    } else {
      toast.error("Une erreur est survenue", {
        position: "bottom-center",
      });
    }
    throw error;
  }
};

export const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};
