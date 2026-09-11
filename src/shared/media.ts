export interface MediaEntry { path: string; name: string; kind: 'file' | 'folder'; size: number; mime: string | null; publicUrl: string | null; modified: string }
export interface MediaListing { path: string; entries: MediaEntry[]; truncated: boolean }
