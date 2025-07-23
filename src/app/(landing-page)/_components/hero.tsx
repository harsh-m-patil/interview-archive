import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center pt-10 sm:pt-14 gap-y-4 px-4">
      <Badge variant="outline" className="text-sm mb-4 shadow-sm">
        Get 1 Month Free trial
      </Badge>
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-balance text-center font-medium">
        Say Hello 👋 to Effortless Interview Question Management
      </h1>
      <p className="text-sm sm:text-xl md:text-xl text-center mt-4 text-muted-foreground">
        InterviewArchive lets you collect and share real interview questions
        with solutions — organized, searchable, and built for team prep.
      </p>
      <div className="flex sm:flex-row gap-4 w-full justify-center items-center mb-10">
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      </div>
      <Image
        src="/app.png"
        alt="Interview Archive App Screenshot"
        className="rounded-lg shadow-lg border-2"
        width={1800}
        height={1000}
      />
    </div>
  );
};
