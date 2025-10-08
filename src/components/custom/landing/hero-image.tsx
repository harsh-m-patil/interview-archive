import Image from "next/image";

export const HeroImage = () => (
  <>
    <Image
      alt="Interview Archive App Screenshot"
      className="hidden rounded-lg border-2 shadow-lg dark:block"
      height={1000}
      src={"/app.png"}
      width={1800}
    />
    <Image
      alt="Interview Archive App Screenshot"
      className="rounded-lg border-2 shadow-lg dark:hidden"
      height={1000}
      src="/app-light.png"
      width={1800}
    />
  </>
);
