import React from "react";

function Page({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      {params.slug?.length == 2 && (
        <p>
          Viewing docs for feature {params.slug[0]} & conecpt {params.slug[1]}
        </p>
      )}
      {params.slug?.length == 1 && (
        <p>Viewing docs for feature {params.slug[0]}</p>
      )}
      {!params.slug && <p>Docs Home page</p>}
    </div>
  );
}

export default Page;
