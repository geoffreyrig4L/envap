"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import SessionContext from "../context/session";

export default function LayoutCreateMachine({ children }) {
  const { user } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/");
    }
  });

  return <div>{children}</div>;
}
