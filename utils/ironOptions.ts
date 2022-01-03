const IRON_SESSION_PASSWORD = process.env.PWORD_IRON_SESSION

interface IronUser {
  id: string,
  email: string,
  isLoggedIn: boolean,
  familyId: string
}

export const ironOptions = {
  cookieName: "christmas_list",
  password: IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// TODO: re-evaluate this typing for User
// TODO: study this https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module "iron-session" {
  interface IronSessionData {
    user?: IronUser;
  }
}