import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserId } from "@/helper/getUserId";

export async function getServerSideUser() {
  const session: any = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const userId = await getUserId(session.user.email);

  return userId;
}