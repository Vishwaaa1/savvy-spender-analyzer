
import { AnalysisResult, Transaction, Category, FinancialSummary } from '@/types/types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '26 Mar 2025',
    details: 'TRANSFER TO 4897693162093 - UPI/DR/508572433575/SURESH A/IOBA/sures2331@/UPI',
    refNo: '',
    debit: 350.00,
    credit: undefined,
    balance: 1788.64,
    category: 'Transfer',
    subcategory: 'Personal Transfer'
  },
  {
    id: '2',
    date: '25 Mar 2025',
    details: 'CREDIT INTEREST',
    refNo: '',
    debit: undefined,
    credit: 137.00,
    balance: 2138.64,
    category: 'Income',
    subcategory: 'Interest'
  },
  {
    id: '3',
    date: '25 Mar 2025',
    details: 'TRANSFER TO 4897692162094 - UPI/DR/5084299045177/Mrs SARA/CBIN/venkymanpo/UPI',
    refNo: '',
    debit: 80.00,
    credit: undefined,
    balance: 2001.64,
    category: 'Transfer',
    subcategory: 'Personal Transfer'
  },
  {
    id: '4',
    date: '24 Mar 2025',
    details: 'TRANSFER TO 4897691162095 - UPI/DR/5083188188339/GOGULA P/ICIC/prudhsg@ok/UPI',
    refNo: '',
    debit: 49949.00,
    credit: undefined,
    balance: 2081.64,
    category: 'Transfer',
    subcategory: 'Large Transfer'
  },
  {
    id: '5',
    date: '23 Mar 2025',
    details: 'SWIGGY STORES UPI/DR/578321933274/SwiggyStores/YESB/swiggyupipay@yespay/UPI',
    refNo: '',
    debit: 452.75,
    credit: undefined,
    balance: 52030.64,
    category: 'Food',
    subcategory: 'Grocery Delivery'
  },
  {
    id: '6',
    date: '22 Mar 2025',
    details: 'APOLLO PHARMACY UPI/DR/555778922104/ApolloPharm/HDFC/apollopayme@hdfc/UPI',
    refNo: '',
    debit: 384.20,
    credit: undefined,
    balance: 52483.39,
    category: 'Health',
    subcategory: 'Pharmacy'
  },
  {
    id: '7',
    date: '21 Mar 2025',
    details: 'SALARY CREDIT - MARCH 2025',
    refNo: 'SALARY/MAR/2025',
    debit: undefined,
    credit: 52000.00,
    balance: 52867.59,
    category: 'Income',
    subcategory: 'Salary'
  },
  {
    id: '8',
    date: '20 Mar 2025',
    details: 'MOBIKWIK UPI/DR/548271042035/MobiKwikPr/UTIB/mobikwik@axisb/UPI',
    refNo: '',
    debit: 1200.00,
    credit: undefined,
    balance: 867.59,
    category: 'Utilities',
    subcategory: 'Mobile Recharge'
  }
];

export const mockCategories: Category[] = [
  { name: 'Transfer', total: 50379.00, percentage: 96.1, color: 'hsl(var(--finance-neutral))' },
  { name: 'Food', total: 452.75, percentage: 0.9, color: 'hsl(var(--finance-food))' },
  { name: 'Health', total: 384.20, percentage: 0.7, color: 'hsl(var(--finance-others))' },
  { name: 'Utilities', total: 1200.00, percentage: 2.3, color: 'hsl(var(--finance-utilities))' }
];

export const mockSummary: FinancialSummary = {
  totalIncome: 52137.00,
  totalExpenses: 52415.95,
  netCashflow: -278.95,
  averageExpensePerDay: 7487.99,
  topExpenseCategories: [
    { name: 'Transfer', total: 50379.00, percentage: 96.1, color: 'hsl(var(--finance-neutral))' },
    { name: 'Utilities', total: 1200.00, percentage: 2.3, color: 'hsl(var(--finance-utilities))' },
    { name: 'Food', total: 452.75, percentage: 0.9, color: 'hsl(var(--finance-food))' }
  ],
  startingBalance: 867.59,
  endingBalance: 1788.64,
  periodStart: '20 Mar 2025',
  periodEnd: '26 Mar 2025'
};

export const mockInsights: string[] = [
  'Large transfer of ₹49,949.00 on March 24th significantly affected your balance',
  'Your salary of ₹52,000.00 was credited on March 21st',
  'You spent ₹452.75 on food delivery via Swiggy',
  'You spent ₹384.20 at Apollo Pharmacy for healthcare needs',
  'Mobile recharge or bill payment of ₹1,200.00 was made on March 20th'
];

export const mockRecommendations: string[] = [
  'Consider breaking down large transfers into smaller amounts for better tracking',
  'Set aside around ₹1,500 per month for healthcare expenses based on your spending',
  'Your mobile/utility expenses seem high. Compare plans to potentially save money',
  'Create a dedicated emergency fund separate from your main account',
  'Consider automating savings by setting up a recurring transfer to a savings account'
];

export const mockAnalysisResult: AnalysisResult = {
  transactions: mockTransactions,
  summary: mockSummary,
  categories: mockCategories,
  insights: mockInsights,
  recommendations: mockRecommendations,
  financialHealthScore: 72
};
