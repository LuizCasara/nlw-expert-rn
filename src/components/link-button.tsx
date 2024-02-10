import { Link, LinkProps } from "expo-router";

type LInkButtonProps = LinkProps<string> & {
  title: string;
};

export function LinkButton({ title, ...rest }: LInkButtonProps) {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  );
}
