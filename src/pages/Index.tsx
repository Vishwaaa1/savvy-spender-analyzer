
import React, { useState } from 'react';
import { AnalysisResult } from '@/types/types';
import FileUpload from '@/components/FileUpload';
import TransactionList from '@/components/TransactionList';
import TransactionSummary from '@/components/TransactionSummary';
import CategoryChart from '@/components/CategoryChart';
import Insights from '@/components/Insights';
import { mockAnalysisResult } from '@/utils/mockData';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const handleFileAnalyzed = (result: AnalysisResult) => {
    setAnalysisResult(result);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 animate-in-down">
            <div className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              Financial Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Bank Statement Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload your bank statement to get personalized insights and recommendations for your financial well-being.
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 pb-24">
        <section className="max-w-2xl mx-auto my-12">
          <FileUpload 
            onFileAnalyzed={handleFileAnalyzed} 
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        </section>
        
        {(analysisResult || isAnalyzing) && (
          <section id="results-section" className="max-w-7xl mx-auto space-y-12 mt-16">
            <div className="animate-in-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-semibold mb-6">Financial Summary</h2>
              <TransactionSummary 
                summary={analysisResult?.summary || mockAnalysisResult.summary} 
                isLoading={isAnalyzing}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in-up" style={{ animationDelay: '200ms' }}>
              <div>
                <h2 className="text-2xl font-semibold mb-6">Spending Breakdown</h2>
                <CategoryChart 
                  categories={analysisResult?.categories || []} 
                  isLoading={isAnalyzing}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Financial Insights</h2>
                <Insights 
                  insights={analysisResult?.insights || []} 
                  recommendations={analysisResult?.recommendations || []}
                  isLoading={isAnalyzing}
                />
              </div>
            </div>
            
            <div className="animate-in-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
              <TransactionList 
                transactions={analysisResult?.transactions || []} 
                isLoading={isAnalyzing}
              />
            </div>
          </section>
        )}
      </main>
      
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>Bank Statement Analyzer — Made for the Hackathon</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
