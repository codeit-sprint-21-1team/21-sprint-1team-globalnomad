interface DescriptionProps {
  content: string;
}

export function Description({ content }: DescriptionProps) {
  return (
    <section className="py-8 min-w-0 w-full  border-b border-gray-200">
      <h2 className="text-[16px] md:text-[18px] font-bold text-gray-950 mb-1.5 md:mb-2">
        체험 설명
      </h2>
      <p className="text-[16px] text-gray-950 leading-[26px] whitespace-pre-line font-medium break-keep break-words">
        {content}
      </p>
    </section>
  );
}
