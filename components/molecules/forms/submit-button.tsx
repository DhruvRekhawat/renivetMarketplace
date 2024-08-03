import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full text-brand-offwhite">
        {pending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" /> Creating Account
          </div>
        ) : (
          'Create Account'
        )}
      </Button>
    );
  }