import { authAPI } from "@/app/api/routes";

export async function middleware() {
  const result = await authAPI.verify();

  console.log(result);
}
