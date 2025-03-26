
import React, { useState, useRef } from 'react';
import { FileUploadProps } from '@/types/types';
import { analyzeStatement } from '@/utils/analyzeStatement';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { File, Upload, ArrowRight } from 'lucide-react';

const FileUpload: React.FC<FileUploadProps> = ({ onFileAnalyzed, isAnalyzing, setIsAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['text/csv', 'application/pdf'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (allowedTypes.includes(file.type) || fileExtension === 'csv' || fileExtension === 'pdf') {
      setSelectedFile(file);
      toast.success(`File selected: ${file.name}`);
    } else {
      toast.error('Please upload a valid CSV or PDF file');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeStatement(selectedFile);
      onFileAnalyzed(result);
      toast.success('Bank statement analyzed successfully!');
    } catch (error) {
      console.error('Error analyzing file:', error);
      toast.error('Failed to analyze bank statement');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full animate-in-up">
      <div 
        className={`file-drop-zone ${dragActive ? 'active' : ''} ${selectedFile ? 'bg-primary/10 border-primary/40' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,.pdf"
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {selectedFile ? (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-subtle">
                <File className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{selectedFile.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Drag & Drop your bank statement</h3>
                <p className="text-sm text-muted-foreground">
                  Upload CSV or PDF files
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button 
          onClick={handleAnalyze} 
          disabled={!selectedFile || isAnalyzing}
          className="px-8 py-6 rounded-full font-medium text-base transition-all shadow-subtle"
        >
          {isAnalyzing ? (
            <>
              <div className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              Analyze Statement
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
