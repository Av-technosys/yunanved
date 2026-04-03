/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getUserIdByEmailId } from "@/helper/getUserId"

export function useClientSideUser() {

  const { data: session, status } = useSession()
  const [userDetails, setUserDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function resolveUser() {

      if (status === "loading") return

      if (!session?.user?.email) {
        setUserDetails(null)
        setLoading(false)
        return
      }

      try {
        const userInfo = await getUserIdByEmailId(session.user.email)
        setUserDetails(userInfo)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    resolveUser()

  }, [session?.user?.email, status])

  return { userDetails, loading }
}






