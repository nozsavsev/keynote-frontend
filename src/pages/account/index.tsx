import { GetServerSidePropsContext } from "next";

export default function AccountPage() {
  return <div></div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return {
    redirect: {
      destination: `/account/keynotes`,
      permanent: true,
    },
  };
}
