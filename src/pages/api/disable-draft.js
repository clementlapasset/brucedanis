export default function handle(_req, res) {
  // Exit the current user from "Draft Mode".
  res.setDraftMode({ enable: false });

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: "/" });
  res.end();
}
