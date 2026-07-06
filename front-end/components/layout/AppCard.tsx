import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AppCardProps {
  title: string;
  text?: string;
  value?: string | number;
}

export function AppCard({ title, text, value }: AppCardProps) {
  return (
    <Card
      className="bg-card
      text-card-foreground
      border-border
      rounded-md
      hover:border-primary/30
      hover:shadow-lg
      shadow-sm
      transition-all
      duration-200">
      <CardHeader>
        <CardTitle className="text-3xl text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex text-sm text-muted-foreground">
          <p className="text-2xl">{text}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
