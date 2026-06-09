import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AppCardProps {
  title: string;
  value?: string | number;
}

export function AppCard({ title, value }: AppCardProps) {
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
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
