import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  title: string;
  href: string;
  onChangeClick: (isClicked: boolean) => void;
}

export const SidebarMenuItem = ({
  icon,
  title,
  href,
  onChangeClick,
}: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center my-5 p-2 hover:bg-gray-100 rounded transition-all"
      onClick={() => onChangeClick(true)}
    >
      {icon}
      <span className="ml-3">{title}</span>
    </Link>
  );
};
