import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginFormSkeleton() {
  return (
    <Card className="w-full max-w-sm animate-pulse">
      <CardHeader>
        <CardTitle>
          <span className="inline-block h-5 w-20 rounded bg-foreground/10 dark:bg-foreground/20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="h-4 w-24 rounded bg-foreground/10 dark:bg-foreground/20" />
            <div className="h-10 w-full rounded-md bg-foreground/10 dark:bg-foreground/20" />
          </div>
          <div className="grid gap-2">
            <div className="h-4 w-20 rounded bg-foreground/10 dark:bg-foreground/20" />
            <div className="h-10 w-full rounded-md bg-foreground/10 dark:bg-foreground/20" />
            <div className="h-3 w-40 rounded bg-foreground/10 dark:bg-foreground/20" />
          </div>
          <div className="h-10 w-full rounded-md bg-foreground/10 dark:bg-foreground/20" />
        </div>
      </CardContent>
    </Card>
  );
}

