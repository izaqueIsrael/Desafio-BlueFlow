import axios from "axios";
import { env } from "../config/env";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  thumbnailUrl: string;
}

interface YouTubeAPIResponse {
  nextPageToken?: string;
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      channelTitle: string;
      thumbnails: { default: { url: string } };
    };
  }>;
}

interface YouTubeVideosByIdsResponse {
  items: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      channelTitle: string;
      thumbnails: { default: { url: string } };
    };
  }>;
}

export class YouTubeAPI {
  private apiKey: string;
  private baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor() {
    this.apiKey = env.YOUTUBE_API_KEY;
  }

  public async searchVideos(
    query: string,
    maxResults = 5,
    pageToken?: string
  ): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> {
    try {
      const params: Record<string, any> = {
        part: "snippet",
        type: "video",
        q: query,
        maxResults,
        key: this.apiKey,
      };
      if (pageToken) params.pageToken = pageToken;

      const { data } = await axios.get<YouTubeAPIResponse>(`${this.baseUrl}/search`, { params });

      const videos = data.items.map((item: YouTubeAPIResponse["items"][number]) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.default.url,
      }));

      return { videos, nextPageToken: data.nextPageToken };
    } catch (err: any) {
      console.error("Erro ao buscar vídeos:", err.message || err);
      return { videos: [] };
    }
  }

  public async searchVideosByIds(
  videoIds: string
): Promise<{ videos: YouTubeVideo[] }> {
  try {
    const params: Record<string, any> = {
      part: "snippet",
      id: videoIds, // Vídeos separados por vírgula
      key: this.apiKey,
    };

    const { data } = await axios.get<YouTubeVideosByIdsResponse>(`${this.baseUrl}/videos`, { params });

    const videos: YouTubeVideo[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.default.url,
    }));

    return { videos };
  } catch (err: any) {
    console.error("Erro ao buscar vídeos por ID:", err.message || err);
    return { videos: [] };
  }
}
}
