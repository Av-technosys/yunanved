import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserIdByEmailId } from "@/helper/getUserId";

export async function getServerSideUser() {
  const session: any = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const userInfo = await getUserIdByEmailId(session.user.email);

  return userInfo;
}