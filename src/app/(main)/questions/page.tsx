import { QuestionsList } from "@/components/custom/questions/list";
import { SearchInput } from "@/components/custom/search-input";

export default function Page() {
  return (
    <div className="mx-auto mt-12 max-w-7xl">
      <SearchInput />
      <QuestionsList />
    </div>
  );
}
