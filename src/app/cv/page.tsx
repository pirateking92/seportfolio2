import { Metadata } from "next";
import { GET_CV_PAGE } from "../../lib/queries";
import client from "../../../apollo-client";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Sepy Baghaei's CV",
  description: "Curriculum Vitae",
};

async function getCVData() {
  const { data } = await client.query({
    query: GET_CV_PAGE,
  });
  return data.page.cvUpload?.cvUpload?.node?.mediaItemUrl || "";
}

export default async function CVPage() {
  const cvUrl = await getCVData();

  return (
    <div className="flex flex-col items-center pt-16 md:pt-20">
      <Navbar />
      <h1 className="py-5 text-4xl text-slate-300 font-bold mb-4 text-center">
        Sepy Baghaei&apos;s CV
      </h1>
      {cvUrl ? (
        <iframe
          src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          width="800"
          height="1131"
          className="rounded ring"
          style={{ border: "none" }}
        />
      ) : (
        <p className="text-slate-300">CV not available.</p>
      )}
    </div>
  );
}
