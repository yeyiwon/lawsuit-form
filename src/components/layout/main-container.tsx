export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-16 flex flex-col items-center">
      {children}
    </main>
  );
}