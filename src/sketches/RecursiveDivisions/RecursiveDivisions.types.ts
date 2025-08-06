export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  filled: boolean;
  pattern?: 'lines' | 'dots' | 'noise' | 'grid';
}
