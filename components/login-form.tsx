import { Shell } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomGoogleLoginButton } from "./CustomGoogleLoginButton/CustomGoogleLoginButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Shell className="size-6" />
              </div>
              <span className="sr-only">Octo AI</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Octo AI</h1>
            <div className="text-center text-sm">
              Just one more step to get started
            </div>
          </div>
          <div className="grid gap-4">
            <CustomGoogleLoginButton />
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our Terms of Service{" "}
        and Privacy Policy.
      </div>
    </div>
  );
}
