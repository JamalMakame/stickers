import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } = serverAuth$(
    ({ env }) => ({
        adapter: PrismaAdapter(prisma),
        secret: env.get("AUTH_SECRET"),
        trustHost: true,
        providers: [
            GitHub({
                id: "github",
                clientId: env.get("GITHUB_ID")!,
                clientSecret: env.get("GITHUB_SECRET")!,
            }),
        ] as Provider[],
    })
);
