import { RoutesData } from '@/types/navigation';

export const hasMatchingChildRoute = (item: RoutesData, pathname: string): boolean => {
  return item.children?.some(child => pathname.startsWith(child.href)) || false;
};

export const isCurrentRoute = (item: RoutesData, pathname: string): boolean => {
  return pathname === item.href || hasMatchingChildRoute(item, pathname);
};