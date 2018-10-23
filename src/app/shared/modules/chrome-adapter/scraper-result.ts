export interface ScraperResult {
  name?: string;
  price?: number;
  images?: {
    dataUrl: string;
    height: number;
    width: number;
  }[];
}
