export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-muted flex justify-between items-center font-mono">
        <span>
          <span className="text-accent">#</span> &copy; {new Date().getFullYear()} Akhilesh Ranjan Singh
        </span>
        <a href="/admin" className="hover:text-accent transition-colors">
          ./admin
        </a>
      </div>
    </footer>
  );
}
