"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserIdByEmailId } from "@/helper/getUserId";

export function getClientSideUser() {
  const { data: session, status }: any = useSession();

  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") {
      console.log("Session still loading...");
      return;
    }

    if (!session?.user?.email) {
      console.log("No email found in session");
      return;
    }
    async function fetchUserId() {
      try {
        const userInfo = await getUserIdByEmailId(session.user.email);

        setUserDetails(userInfo);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    }

    fetchUserId();
  }, [session, status]);

  return userDetails;
}
