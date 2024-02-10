import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

type CategoryButtonProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export default function CategoryButton({ title, isSelected, ...rest }: CategoryButtonProps) {
  return (
    <Pressable className={clsx("px-4 justify-center bg-slate-800 rounded h-10", isSelected && "border-2 border-lime-300")} {...rest}>
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
