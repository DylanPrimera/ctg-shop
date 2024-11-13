import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  customClass?: string;
}

export const Title = ({ title, subtitle, customClass }: Props) => {
  return (
    <div className={`mt-3 ${customClass}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subtitle && (<h3 className="text-xl mb-10">{subtitle}</h3>)}
    </div>
  );
};
