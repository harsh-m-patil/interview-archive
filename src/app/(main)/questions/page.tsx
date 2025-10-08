import { Suspense } from "react";
import { QuestionsList } from "@/components/custom/questions/list";
import { CompanySelect } from "@/components/custom/questions/select/company";
import { RoleSelect } from "@/components/custom/questions/select/role";
import { SearchInput } from "@/components/custom/search-input";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto mt-12 max-w-7xl p-4">
        <SearchInput />
        <div className="mt-2 flex items-center justify-end gap-4">
          <CompanySelect />
          <RoleSelect />
        </div>
        <QuestionsList />
      </div>
    </Suspense>
  );
}
