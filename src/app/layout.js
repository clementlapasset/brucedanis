export const metadata = {
  title: "Bruce d'Anis",
  description: "Bruce d'Anis description",
  author: ["Adrien Lapasset", "Clément Lapasset"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
