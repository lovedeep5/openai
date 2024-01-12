interface GPTMessageType {
  role: string;
  content: string;
}

export interface GPTRequestType {
  model: string;
  messages: GPTMessageType[];
}

export interface GPTImageRequestType {
  model: string;
  prompt: string;
  n: number;
  size: string;
}

export interface leafletInitialTypes {
  coordinates: [number, number] | [];
  title: string;
  image: string;
  loading: boolean;
  error: string | undefined | unknown;
}
