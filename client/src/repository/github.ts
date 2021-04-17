import axios, { AxiosResponse } from 'axios';

export class GithubRepository {
  static async onRenderMarkdown(content: string): Promise<AxiosResponse> {
    const url = 'https://api.github.com/markdown';
    return await axios.post(url, { text: content });
  }
}
