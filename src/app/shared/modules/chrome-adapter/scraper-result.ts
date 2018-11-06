export interface ScraperResult {
  name?: string;
  price?: number;
  images?: {
    dataUrl: string;
    height: number;
    url: string;
    width: number;
  }[];
}
