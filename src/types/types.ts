
export interface Transaction {
  id: string;
  date: string;
  details: string;
  refNo?: string;
  debit?: number;
  credit?: number;
  balance: number;
  category?: string;
  subcategory?: string;
}

export interface Category {
  name: string;
  total: number;
  percentage: number;
  color: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netCashflow: number;
  averageExpensePerDay: number;
  topExpenseCategories: Category[];
  startingBalance?: number;
  endingBalance?: number;
  periodStart?: string;
  periodEnd?: string;
}

export interface AnalysisResult {
  transactions: Transaction[];
  summary: FinancialSummary;
  categories: Category[];
  insights: string[];
  recommendations: string[];
  financialHealthScore?: number;
}

export interface FileUploadProps {
  onFileAnalyzed: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

export interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export interface TransactionSummaryProps {
  summary: FinancialSummary;
  isLoading?: boolean;
}

export interface CategoryChartProps {
  categories: Category[];
  isLoading?: boolean;
}

export interface InsightsProps {
  insights: string[];
  recommendations: string[];
  isLoading?: boolean;
}
