
import React from 'react';
import { InsightsProps } from '@/types/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp } from 'lucide-react';

const InsightCard: React.FC<{ insights: string[]; title: string; icon: React.ReactNode; type: 'insight' | 'recommendation' }> = ({ 
  insights, 
  title, 
  icon,
  type
}) => {
  return (
    <Card className="shadow-subtle card-transition h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="icon-container">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="flex gap-2">
              <Badge 
                variant="outline" 
                className={`flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs ${
                  type === 'insight' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent text-accent-foreground'
                }`}
              >
                {index + 1}
              </Badge>
              <span className="flex-1 text-sm">{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Insights: React.FC<InsightsProps> = ({ insights, recommendations, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-subtle animate-pulse">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 bg-muted/50 rounded-md"></div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-subtle animate-pulse">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 bg-muted/50 rounded-md"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InsightCard 
        insights={insights} 
        title="Insights" 
        icon={<Lightbulb className="h-4 w-4" />}
        type="insight"
      />
      
      <InsightCard 
        insights={recommendations} 
        title="Recommendations" 
        icon={<TrendingUp className="h-4 w-4" />}
        type="recommendation"
      />
    </div>
  );
};

export default Insights;
