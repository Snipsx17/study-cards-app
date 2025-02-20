import { toast } from "@/hooks/use-toast";

interface ShowMessageProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export const showMessage = ({
  title,
  variant,
  duration = 2000,
  description,
}: ShowMessageProps) => {
  toast({
    title,
    description,
    variant,
    duration,
  });
};
