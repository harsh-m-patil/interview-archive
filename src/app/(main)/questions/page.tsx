import { Suspense } from "react";
import { QuestionsList } from "@/components/custom/questions/list";
import { CompanySelect } from "@/components/custom/questions/select/company";
import { RoleSelect } from "@/components/custom/questions/select/role";
import { SearchInput } from "@/components/custom/search-input";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="mx-auto text-balance bg-gradient-to-b from-primary via-foreground/85 to-foreground/50 bg-clip-text px-4 py-6 text-center font-bold text-3xl text-transparent tracking-tighter md:text-4xl lg:text-5xl xl:text-6xl">
          Search Questions posted by Community
        </h1>
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
