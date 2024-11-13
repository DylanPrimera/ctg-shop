import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const pageCategories = ['men','women','kids'];

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if(!pageCategories.includes(id!)) {
    notFound();
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}
