interface ApiMovie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface ApiMovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  credits: ApiCredits;
  genres: ApiGenre[];
  homepage: string;
  id: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ApiProductionCompany[];
  production_countries: ApiProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  recommendations: { results: ApiMovie[] };
  spoken_languages: ApiSpokenLanguage[];
  status: ApiMovieStatus;
  tagline: string | null;
  title: string;
  video: boolean;
  videos: { results: ApiVideo[] };
  vote_average: number;
  vote_count: number;
}

interface ApiCredits {
  id?: number;
  cast?: ApiCast[];
  crew?: ApiCrew[];
}

interface ApiCast {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

interface ApiCrew {
  adult?: boolean;
  gender?: integer | null;
  id?: integer;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
  department?: string;
  job?: string;
}

interface ApiGenre {
  id: number;
  name: string;
}
interface ApiProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ApiProductionCountry {
  iso_3166_1: string;
  name: string;
}

type ApiMovieStatus =
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Released"
  | "Canceled";

interface ApiVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: 1080;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
