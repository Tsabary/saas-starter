"use client";

import React, { useState } from "react";
import { useAuth } from "@replyke/react-js";
import validator from "validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { signUpWithEmailAndPassword } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) return;
    try {
      if (!validator.isEmail(credentials.email)) {
        throw new Error("email|Invalid email");
      }

      if (credentials.password.length < 8) {
        throw new Error("password|Password is too short");
      }

      setIsSubmitting(true);

      await signUpWithEmailAndPassword!({
        email: credentials.email,
        password: credentials.password,
      });
      // setOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        let errorMessage = err.message;
        let errorKey = "form";

        if (
          err.message.includes("email|") ||
          err.message.includes("password|") ||
          err.message.includes("repeatPassword|")
        ) {
          const parts: string[] = err.message.split("|");
          errorKey = parts[0];
          errorMessage = parts[1];
        }

        setErrors((errs) => ({ ...errs, [errorKey]: errorMessage }));
      }

      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name-signup">Full Name</Label>
        <Input id="name-signup" type="text" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="name@replyke.com"
          onChange={(event) =>
            setCredentials((cs) => ({
              ...cs,
              email: event.target.value.trim(),
            }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input
          id="password-signup"
          type="password"
          required
          onChange={(event) =>
            setCredentials((cs) => ({
              ...cs,
              password: event.target.value.trim(),
            }))
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
      {errors.form && (
        <p className="text-xs text-red-600 mt-2">{errors.form}</p>
      )}
    </form>
  );
}
