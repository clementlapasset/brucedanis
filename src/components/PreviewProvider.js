import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";

import { getClient } from "../../sanity/lib/client";

export default function PreviewProvider({ children, token }) {
  const client = useMemo(() => getClient(token), [token]);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
