/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Navbar from "@/components/landing/Navbar"
import { useClientSideUser } from "@/hooks/getClientSideUser"

export default function ClientLayoutWrapper({ children }: any) {

const { userDetails, loading } = useClientSideUser()

  return (
    <>
      <Navbar userInfo={userDetails} loading={loading} />
      {children}
    </>
  )
}