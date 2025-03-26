
import React from 'react';
import { TransactionSummaryProps } from '@/types/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, DollarSign, Calendar } from 'lucide-react';

const SummaryCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'positive' | 'negative';
  trendValue?: string;
}> = ({ title, value, icon, trend, trendValue }) => {
  return (
    <Card className="bg-card/80 backdrop-blur-subtle border border-transparent subtle-ring card-transition">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="icon-container bg-primary/10 text-primary/80">
            {icon}
          </div>
          
          {trend && trendValue && (
            <div 
              className={`text-xs font-medium flex items-center ${
                trend === 'positive' ? 'text-finance-income' : 'text-finance-expense'
              }`}>
              {trend === 'positive' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ summary, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse h-[140px]">
            <CardContent className="p-6">
              <div className="h-full bg-muted/50 rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cashflowTrend = summary.netCashflow >= 0 ? 'positive' : 'negative';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Total Income"
        value={formatCurrency(summary.totalIncome)}
        icon={<ArrowDown className="h-4 w-4" />}
      />
      
      <SummaryCard
        title="Total Expenses"
        value={formatCurrency(summary.totalExpenses)}
        icon={<ArrowUp className="h-4 w-4" />}
      />
      
      <SummaryCard
        title="Net Cashflow"
        value={formatCurrency(Math.abs(summary.netCashflow))}
        icon={<DollarSign className="h-4 w-4" />}
        trend={cashflowTrend}
        trendValue={cashflowTrend === 'positive' ? 'Surplus' : 'Deficit'}
      />
      
      <SummaryCard
        title="Period"
        value={`${summary.periodStart} - ${summary.periodEnd}`}
        icon={<Calendar className="h-4 w-4" />}
      />
    </div>
  );
};

export default TransactionSummary;
