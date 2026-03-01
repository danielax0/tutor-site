interface SubjectBadgeProps {
  subject: string;
}

const SubjectBadge = ({ subject }: SubjectBadgeProps) => {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm border border-secondary/20 transition-all duration-300 hover:bg-secondary/20 hover:shadow-sm hover:-translate-y-0.5">
      {subject}
    </span>
  );
};

export default SubjectBadge;
