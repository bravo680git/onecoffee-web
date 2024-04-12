"use server";

export const verify = async (idToken: string) => {
  return new Promise((r) => {
    setTimeout(() => {
      r("");
      console.log(idToken);
    }, 2000);
  });
};
