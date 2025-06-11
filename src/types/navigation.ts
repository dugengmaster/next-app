export interface RoutesData {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: RoutesData[];
}