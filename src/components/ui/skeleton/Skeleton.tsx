interface Props {
  customClass?: string;
}

export const Skeleton = ({ customClass }: Props) => {
  return (
    <div className={`rounded animate-pulse bg-gray-200 ${customClass ?? ""}`}>
      &nbsp;
    </div>
  );
};
