export interface ScraperResult {
  name?: string;
  price?: number;
  images?: {
    url: string;
    height: number;
    width: number;
  }[];
}
