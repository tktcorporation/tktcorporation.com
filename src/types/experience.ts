export interface Position {
  id: number;
  job_position_name: string;
}

export interface Experience {
  id: number;
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  positions: Position[];
  position_name: string;
  start_year: number;
  start_month: number;
  end_year: number | null;
  end_month: number | null;
  description: string;
  updated_at: string;
}

export interface ExperienceData {
  experience_list: Experience[];
}
