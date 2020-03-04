import { useLocation } from 'react-router-dom';

export default function useQuery() {
  return Object.fromEntries((new URLSearchParams(useLocation().search)).entries());
}
