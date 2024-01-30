import React from "react";
import Detail from "./_components/Detail";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default function DetailPage({ params }: Props) {
  console.log(params);

  return <Detail id={params.id} />;
}
