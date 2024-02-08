import { useLiveQuery } from "next-sanity/preview";

import Illustrations from "../IllustrationsGrid";
import { ILLUSTRATIONS_QUERY } from "../../../sanity/lib/queries";

export default function IllustrationsPreview({ illustrations = [] }) {
  const [data] = useLiveQuery(illustrations, ILLUSTRATIONS_QUERY);

  return <Illustrations illustrations={data} />;
}
