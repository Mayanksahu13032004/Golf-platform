import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function adminAuth() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded =
    verifyToken(token);

  if (decoded.role !== "ADMIN") {
    throw new Error(
      "Admin access required"
    );
  }

  return decoded;
}