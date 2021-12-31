const IRON_SESSION_PASSWORD = process.env.PWORD_IRON_SESSION 

export const ironOptions = {
    cookieName: "christmas_list",
    password: IRON_SESSION_PASSWORD as string,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };