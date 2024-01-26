import { useLiveQuery } from "next-sanity/preview";

import Illustrations from "./Illustrations";
import { ILLUSTRATIONS_QUERY } from "../../sanity/lib/queries";

export default function PostsPreview({ illustrations = [] }) {
  const [data] = useLiveQuery(illustrations, ILLUSTRATIONS_QUERY);

  return <Illustrations illustrations={data} />;
}
