"use client";

import { Company, Tag } from "@/generated/prisma";
import { CompaniesSelect, TagsSelect } from "./selectors";
import { Suspense } from "react";
interface Props {
  companies: Company[];
  tags: Tag[];
}

export const Select = ({ tags, companies }: Props) => {
  return (
    <>
      <Suspense>
        <TagsSelect tags={tags} />
        <CompaniesSelect companies={companies} />
      </Suspense>
    </>
  );
};
