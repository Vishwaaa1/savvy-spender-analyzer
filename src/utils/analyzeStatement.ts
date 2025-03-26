
import { AnalysisResult, Transaction } from '@/types/types';
import { mockAnalysisResult } from './mockData';
import { toast } from 'sonner';

// The Gemini API key
const GEMINI_API_KEY = 'AIzaSyDZlY5oMpCxjNAqEhGwvk63m4biENDW1BY';

// Helper to parse CSV data
const parseCSV = (csvText: string): Transaction[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  // Map indices to our expected fields
  const dateIndex = headers.findIndex(h => h.toLowerCase().includes('date'));
  const detailsIndex = headers.findIndex(h => h.toLowerCase().includes('detail') || h.toLowerCase().includes('desc'));
  const refNoIndex = headers.findIndex(h => h.toLowerCase().includes('ref') || h.toLowerCase().includes('cheque'));
  const debitIndex = headers.findIndex(h => h.toLowerCase().includes('debit') || h.toLowerCase().includes('withdraw'));
  const creditIndex = headers.findIndex(h => h.toLowerCase().includes('credit') || h.toLowerCase().includes('deposit'));
  const balanceIndex = headers.findIndex(h => h.toLowerCase().includes('balance'));
  
  const transactions: Transaction[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    
    const transaction: Transaction = {
      id: `${i}`,
      date: values[dateIndex]?.trim() || '',
      details: values[detailsIndex]?.trim() || '',
      refNo: values[refNoIndex]?.trim() || undefined,
      debit: values[debitIndex] ? parseFloat(values[debitIndex].trim()) : undefined,
      credit: values[creditIndex] ? parseFloat(values[creditIndex].trim()) : undefined,
      balance: values[balanceIndex] ? parseFloat(values[balanceIndex].trim()) : 0
    };
    
    transactions.push(transaction);
  }
  
  return transactions;
};

// Helper to read uploaded file
const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // For PDF files, we would need to extract text
      // Since PDF parsing is complex, for demo purposes we'll use mock data
      reject(new Error('PDF parsing is not implemented in this demo. Try using a CSV file.'));
    } else {
      reject(new Error('Unsupported file format. Please upload a CSV or PDF file.'));
    }
  });
};

// Main function to analyze bank statement
export const analyzeStatement = async (file: File): Promise<AnalysisResult> => {
  try {
    // For demo purposes, return mock data for now
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      toast.info('PDF processing is simulated in this demo version');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      return mockAnalysisResult;
    }
    
    // Read the file content
    const content = await readFileContent(file);
    
    // Parse the CSV (if it's a CSV file)
    let transactions: Transaction[] = [];
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      transactions = parseCSV(content);
    }
    
    // For a real implementation, we would send the transactions to Gemini API
    // For now, we'll use our mock data with a delay to simulate API call
    
    // This would be the Gemini API call in a real implementation:
    /*
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze these bank transactions and categorize them. Provide insights and recommendations:
            ${JSON.stringify(transactions)}`
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });
    
    const data = await response.json();
    
    // Process the Gemini response to create our AnalysisResult
    const analysis = processGeminiResponse(data, transactions);
    return analysis;
    */
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock data for the demo
    return {
      ...mockAnalysisResult,
      transactions: transactions.length > 0 ? transactions : mockAnalysisResult.transactions
    };
    
  } catch (error) {
    console.error('Error analyzing statement:', error);
    toast.error('Failed to analyze bank statement');
    throw error;
  }
};

// Helper to process Gemini API response (would be implemented in a real version)
const processGeminiResponse = (response: any, transactions: Transaction[]): AnalysisResult => {
  // In a real implementation, we would extract the categorized transactions,
  // insights, and recommendations from the Gemini API response
  
  // For now, return mock data
  return mockAnalysisResult;
};
