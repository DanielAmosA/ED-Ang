
// The interface responsible for the structure declaration of the generic results API
export interface ApiActionResponse<TApiData> {
  data: TApiData[];
  total: number;
  page: number;
  pageSize: number;
}
