import axios, { type AxiosInstance } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const client: AxiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

/** POST /predict */
export interface PredictResponse {
  pgv: number;
  tier: string;
  color: string;
  description: string;
  building_tips: string[];
}

export async function predict(
  magnitude: number,
  epicenter_lat: number,
  epicenter_lon: number
): Promise<PredictResponse> {
  const { data } = await client.post<PredictResponse>("/predict", {
    magnitude,
    epicenter_lat,
    epicenter_lon,
  });
  return data;
}

/** POST /heatmap — intensity samples for map visualization */
export interface HeatmapPoint {
  lat: number;
  lon: number;
  value: number;
}

export interface HeatmapResponse {
  points: HeatmapPoint[];
  /** Optional bounds in WGS84 */
  bounds?: {
    min_lat: number;
    max_lat: number;
    min_lon: number;
    max_lon: number;
  };
}

export async function getHeatmap(
  magnitude: number,
  epicenter_lat: number,
  epicenter_lon: number
): Promise<HeatmapResponse> {
  const { data } = await client.post<HeatmapResponse>("/heatmap", {
    magnitude,
    epicenter_lat,
    epicenter_lon,
  });
  return data;
}

/** POST /insurance */
export interface InsuranceResponse {
  risk_tier: string;
  premium_estimate_usd: number;
  coverage_notes: string;
  factors: string[];
}

export async function getInsurance(
  magnitude: number,
  epicenter_lat: number,
  epicenter_lon: number
): Promise<InsuranceResponse> {
  const { data } = await client.post<InsuranceResponse>("/insurance", {
    magnitude,
    epicenter_lat,
    epicenter_lon,
  });
  return data;
}

/** GET /demo — canned demo scenario (e.g. M6.5 Salton Sea) */
export interface DemoResponse {
  magnitude: number;
  epicenter_lat: number;
  epicenter_lon: number;
  building_name: string;
  building_address: string;
  label: string;
}

export async function getDemo(): Promise<DemoResponse> {
  const { data } = await client.get<DemoResponse>("/demo");
  return data;
}

/** GET /scenarios — available earthquake scenarios */
export interface ScenarioSummary {
  id: string;
  name: string;
  magnitude: number;
  epicenter_lat: number;
  epicenter_lon: number;
}

export interface ScenariosResponse {
  scenarios: ScenarioSummary[];
}

export async function getScenarios(): Promise<ScenariosResponse> {
  const { data } = await client.get<ScenariosResponse>("/scenarios");
  return data;
}
