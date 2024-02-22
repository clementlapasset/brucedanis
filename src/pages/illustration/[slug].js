import { getClient } from "../../../sanity/lib/client";
import IllustrationsGrid from "@/components/IllustrationsGrid";
import HomeFooter from "@/components/HomeFooter";
import IllustrationModal from "../../components/IllustrationModal";
import {
  ILLUSTRATION_QUERY,
  ILLUSTRATIONS_SLUG_QUERY,
  ILLUSTRATIONS_QUERY,
  EVENTS_QUERY,
  VACATION_QUERY,
} from "../../../sanity/lib/queries";

export default function IllustrationPage({
  illustration,
  illustrations,
  events,
  vacation,
}) {
  return (
    <>
      <IllustrationsGrid illustrations={illustrations} />
      <HomeFooter events={events} isPageLoaded={true} />
      <IllustrationModal
        illustration={illustration}
        illustrations={illustrations}
        vacation={vacation}
      />
    </>
  );
}

export const getStaticProps = async ({ params = {} }) => {
  const illustrations = await getClient().fetch(ILLUSTRATIONS_QUERY);
  const illustration = await getClient().fetch(ILLUSTRATION_QUERY, params);
  const events = await getClient().fetch(EVENTS_QUERY);
  const vacation = await getClient().fetch(VACATION_QUERY);

  return {
    props: {
      illustration,
      illustrations,
      events,
      vacation,
    },
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths = async () => {
  const paths = await getClient().fetch(ILLUSTRATIONS_SLUG_QUERY);

  return { paths, fallback: true };
};
