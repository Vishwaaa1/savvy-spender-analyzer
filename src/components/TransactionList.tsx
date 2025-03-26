
import React from 'react';
import { TransactionListProps, Transaction } from '@/types/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Calendar, FileText } from 'lucide-react';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isCredit = transaction.credit !== undefined;
  
  return (
    <div className="py-3 px-4 border-b border-border last:border-0 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-muted/20 transition-colors">
      <div className="flex items-start gap-3">
        <div className="icon-container mt-1">
          {isCredit ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        
        <div className="flex-1">
          <div className="font-medium text-sm">{transaction.details}</div>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{transaction.date}</span>
            </div>
            {transaction.refNo && (
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Ref: {transaction.refNo}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 self-end md:self-auto">
        {transaction.category && (
          <Badge variant="outline" className="px-2 py-0 text-xs">
            {transaction.category}
          </Badge>
        )}
        
        <div className="text-right">
          <div className={`font-medium ${isCredit ? 'text-finance-income' : 'text-finance-expense'}`}>
            {isCredit ? '+ ' : '- '}
            {formatCurrency(isCredit ? transaction.credit! : transaction.debit!)}
          </div>
          <div className="text-xs text-muted-foreground">
            Balance: {formatCurrency(transaction.balance)}
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="shadow-subtle animate-pulse">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-muted/50 rounded-md animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-subtle card-transition overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No transactions to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
