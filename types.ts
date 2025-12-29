
export interface Malfunction {
  id: string;
  timestamp: string;
  reporterName: string;
  busNumber: string;
  description: string;
  aiAnalysis?: {
    category: string;
    severity: 'Laag' | 'Gemiddeld' | 'Hoog' | 'Kritiek';
    suggestion: string;
  };
}

export interface StatsData {
  name: string;
  count: number;
}
